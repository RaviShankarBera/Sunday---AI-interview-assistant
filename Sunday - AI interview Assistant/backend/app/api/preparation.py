from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.preparation_service import PreparationService
from app.services.document_service import DocumentService

router = APIRouter()


class PreparationRequest(BaseModel):
    topic: str = "general"
    resume_id: str | None = None
    jd_id: str | None = None


class AnswerDraftRequest(BaseModel):
    question: str


class ResponseAnalysisRequest(BaseModel):
    question: str
    response: str


@router.post("/preparation/generate")
async def generate_preparation(request: PreparationRequest):
    try:
        resume_chunks = []
        jd_chunks = []

        if request.resume_id:
            results = await DocumentService.retrieve("general", doc_type="resume", top_k=10)
            resume_chunks = [r["text"] for r in results]

        if request.jd_id:
            results = await DocumentService.retrieve("general", doc_type="job_description", top_k=10)
            jd_chunks = [r["text"] for r in results]

        result = await PreparationService.generate_questions(
            topic=request.topic,
            resume_chunks=resume_chunks,
            jd_chunks=jd_chunks,
        )
        return result
    except ConnectionError:
        raise HTTPException(status_code=503, detail="AI provider unavailable")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/preparation/answer-draft")
async def answer_draft(request: AnswerDraftRequest):
    try:
        result = await PreparationService.generate_answer_draft(request.question)
        return result
    except ConnectionError:
        raise HTTPException(status_code=503, detail="AI provider unavailable")


@router.post("/preparation/analyze")
async def analyze_response(request: ResponseAnalysisRequest):
    try:
        result = await PreparationService.analyze_response(request.question, request.response)
        return result
    except ConnectionError:
        raise HTTPException(status_code=503, detail="AI provider unavailable")
