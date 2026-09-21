import uuid
from pathlib import Path

from fastapi import APIRouter, UploadFile, File

from app.schemas.document import DocumentUploadResponse


router = APIRouter()

UPLOAD_DIR = Path("data/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


@router.post("/documents/upload", response_model=DocumentUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    doc_type: str = "resume",
):
    if not file.filename:
        return DocumentUploadResponse(
            document_id="",
            status="error",
            filename="",
            message="No filename provided",
        )

    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        return DocumentUploadResponse(
            document_id="",
            status="error",
            filename=file.filename,
            message=f"Unsupported file type: {ext}. Allowed: {', '.join(ALLOWED_EXTENSIONS)}",
        )

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        return DocumentUploadResponse(
            document_id="",
            status="error",
            filename=file.filename,
            message="File too large. Maximum size is 10MB.",
        )

    doc_id = str(uuid.uuid4())[:8]
    save_path = UPLOAD_DIR / f"{doc_id}_{file.filename}"
    save_path.write_bytes(content)

    return DocumentUploadResponse(
        document_id=doc_id,
        status="indexed",
        filename=file.filename,
        message="Document uploaded successfully.",
    )


@router.get("/documents")
async def list_documents():
    return {"documents": []}
