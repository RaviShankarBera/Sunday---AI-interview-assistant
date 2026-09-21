import uuid
import logging

logger = logging.getLogger(__name__)

DEFAULT_CHUNK_SIZE = 500
DEFAULT_CHUNK_OVERLAP = 100


def chunk_text(
    text: str,
    chunk_size: int = DEFAULT_CHUNK_SIZE,
    chunk_overlap: int = DEFAULT_CHUNK_OVERLAP,
    section: str = "general",
    document_id: str = "",
) -> list[dict]:
    words = text.split()
    chunks = []

    if len(words) <= chunk_size:
        return [{
            "id": f"chunk_{uuid.uuid4().hex[:8]}",
            "document_id": document_id,
            "chunk_index": 0,
            "text": text.strip(),
            "section": section,
        }]

    for i in range(0, len(words), chunk_size - chunk_overlap):
        chunk_words = words[i:i + chunk_size]
        chunk_text_str = " ".join(chunk_words).strip()
        if chunk_text_str:
            chunks.append({
                "id": f"chunk_{uuid.uuid4().hex[:8]}",
                "document_id": document_id,
                "chunk_index": len(chunks),
                "text": chunk_text_str,
                "section": section,
            })
        if i + chunk_size >= len(words):
            break

    return chunks


def chunk_document(text: str, document_id: str = "") -> list[dict]:
    import re
    paragraphs = re.split(r'\n\s*\n', text)
    all_chunks = []

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
        words = para.split()
        if len(words) <= DEFAULT_CHUNK_SIZE:
            all_chunks.append({
                "id": f"chunk_{uuid.uuid4().hex[:8]}",
                "document_id": document_id,
                "chunk_index": len(all_chunks),
                "text": para,
                "section": "general",
            })
        else:
            sub_chunks = chunk_text(para, document_id=document_id)
            all_chunks.extend(sub_chunks)

    for i, chunk in enumerate(all_chunks):
        chunk["chunk_index"] = i

    return all_chunks
