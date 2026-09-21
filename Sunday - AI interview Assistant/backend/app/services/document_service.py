import uuid
import logging
from pathlib import Path

from app.rag.parser import extract_text, clean_text, compute_hash
from app.rag.chunker import chunk_document
from app.rag.embeddings import generate_embeddings
from app.rag.vector_store import get_vector_store
from app.database.repositories import DocumentRepository

logger = logging.getLogger(__name__)

UPLOAD_DIR = Path("data/uploads")


class DocumentService:
    @staticmethod
    async def ingest(file_path: str, filename: str, doc_type: str) -> dict:
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

        file_bytes = Path(file_path).read_bytes()
        file_hash = compute_hash(file_bytes)

        existing_docs = await DocumentRepository.list_by_type(doc_type)
        for doc in existing_docs:
            if doc.get("hash") == file_hash:
                logger.info(f"Document already indexed: {filename}")
                return {"document_id": doc["id"], "status": "already_indexed", "filename": filename}

        text = extract_text(file_path)
        text = clean_text(text)

        if not text.strip():
            raise ValueError("No text could be extracted from the document")

        doc_id = f"doc_{uuid.uuid4().hex[:8]}"
        chunks = chunk_document(text, document_id=doc_id)

        if not chunks:
            raise ValueError("No chunks created from document")

        chunk_texts = [c["text"] for c in chunks]
        embeddings = generate_embeddings(chunk_texts)

        vector_store = await get_vector_store()
        metadata_list = [
            {
                "document_id": doc_id,
                "chunk_id": c["id"],
                "chunk_index": c["chunk_index"],
                "section": c["section"],
                "text": c["text"],
                "source": doc_type,
            }
            for c in chunks
        ]
        await vector_store.add(embeddings, metadata_list)

        doc = await DocumentRepository.create(
            doc_id=doc_id,
            doc_type=doc_type,
            filename=filename,
            path=file_path,
            file_hash=file_hash,
        )

        await vector_store.save(f"{doc_type}_index")
        logger.info(f"Document ingested: {filename} ({len(chunks)} chunks)")

        return {"document_id": doc_id, "status": "indexed", "filename": filename, "chunks": len(chunks)}

    @staticmethod
    async def retrieve(query: str, doc_type: str | None = None, top_k: int = 5) -> list[dict]:
        from app.rag.embeddings import generate_query_embedding
        query_embedding = generate_query_embedding(query)
        vector_store = await get_vector_store()
        results = await vector_store.search(query_embedding, top_k=top_k)
        if doc_type:
            results = [r for r in results if r.get("source") == doc_type]
        return results

    @staticmethod
    async def list_documents(doc_type: str | None = None) -> list[dict]:
        if doc_type:
            return await DocumentRepository.list_by_type(doc_type)
        docs_resume = await DocumentRepository.list_by_type("resume")
        docs_jd = await DocumentRepository.list_by_type("job_description")
        return docs_resume + docs_jd

    @staticmethod
    async def delete_document(doc_id: str) -> bool:
        doc = await DocumentRepository.get(doc_id)
        if not doc:
            return False
        vector_store = await get_vector_store()
        await vector_store.delete_by_document(doc_id)
        await vector_store.save(f"{doc['type']}_index")
        return await DocumentRepository.delete(doc_id)
