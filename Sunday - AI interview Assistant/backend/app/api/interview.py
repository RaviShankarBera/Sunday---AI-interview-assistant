import uuid
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.interview_service import get_interview_service
from app.database.repositories import SessionRepository

router = APIRouter()


class InterviewRequest(BaseModel):
    question: str
    session_id: str | None = None
    response_style: str = "concise"


class InterviewResponse(BaseModel):
    answer: str
    key_points: list[str] = []
    follow_up: str | None = None
    latency_ms: int = 0
    context_used: dict = {}


@router.post("/interview/ask", response_model=InterviewResponse)
async def ask_question(request: InterviewRequest):
    service = get_interview_service()
    try:
        result = await service.generate_answer(
            question=request.question,
            session_id=request.session_id,
            response_style=request.response_style,
        )
        return InterviewResponse(**result)
    except ConnectionError:
        raise HTTPException(status_code=503, detail="AI provider unavailable")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/interview/clear-context")
async def clear_context():
    service = get_interview_service()
    service.clear_context()
    return {"status": "context cleared"}


@router.post("/sessions")
async def create_session(title: str = "Untitled Session", session_type: str = "interview"):
    session = await SessionRepository.create(title, session_type)
    return session


@router.get("/sessions")
async def list_sessions():
    sessions = await SessionRepository.list_all()
    return {"sessions": sessions}


@router.get("/sessions/{session_id}")
async def get_session(session_id: str):
    session = await SessionRepository.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.delete("/sessions/{session_id}")
async def delete_session(session_id: str):
    deleted = await SessionRepository.delete(session_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"status": "deleted"}
