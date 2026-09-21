from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel

from app.services.document_service import DocumentService
from app.database.repositories import DocumentRepository
from app.schemas.document import DocumentUploadResponse

router = APIRouter()


@router.post("/documents/upload", response_model=DocumentUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    doc_type: str = Form("resume"),
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")

    from pathlib import Path
    ext = Path(file.filename).suffix.lower()
    if ext not in {".pdf", ".docx", ".txt"}:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {ext}")

    import uuid
    upload_dir = Path("data/uploads")
    upload_dir.mkdir(parents=True, exist_ok=True)

    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max 10MB.")

    doc_id = f"doc_{uuid.uuid4().hex[:8]}"
    save_path = upload_dir / f"{doc_id}_{file.filename}"
    save_path.write_bytes(content)

    try:
        result = await DocumentService.ingest(str(save_path), file.filename, doc_type)
        return DocumentUploadResponse(
            document_id=result["document_id"],
            status=result["status"],
            filename=file.filename,
            message=f"Document processed: {result.get('chunks', 0)} chunks created",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/documents")
async def list_documents(doc_type: str | None = None):
    docs = await DocumentService.list_documents(doc_type)
    return {"documents": docs}


@router.delete("/documents/{doc_id}")
async def delete_document(doc_id: str):
    deleted = await DocumentService.delete_document(doc_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"status": "deleted", "document_id": doc_id}
