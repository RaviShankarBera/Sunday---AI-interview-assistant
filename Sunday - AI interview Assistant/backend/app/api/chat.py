from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    provider: str = "ollama"
    model: str = "qwen3:8b"


class ChatResponse(BaseModel):
    answer: str
    key_points: list[str] = []
    follow_up: str | None = None


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    last_message = request.messages[-1].content if request.messages else ""
    return ChatResponse(
        answer=f"Backend received your question: '{last_message}'. Connect Ollama for real AI responses.",
        key_points=["Backend connected", "Ollama not yet configured"],
        follow_up=None,
    )
