from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.provider import get_model_provider

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    provider: str = "ollama"
    model: str = "qwen3:8b"
    stream: bool = False


class ChatResponse(BaseModel):
    answer: str
    key_points: list[str] = []
    follow_up: str | None = None
    model: str = ""


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    provider = get_model_provider()
    messages = [{"role": m.role, "content": m.content} for m in request.messages]

    try:
        answer = await provider.chat(messages, model=request.model)
    except ConnectionError as e:
        return ChatResponse(
            answer=f"Ollama is not running. Please start Ollama and pull the model: ollama pull {request.model}",
            model=request.model,
        )
    except ValueError as e:
        return ChatResponse(answer=str(e), model=request.model)

    return ChatResponse(answer=answer, model=request.model)


@router.get("/models")
async def list_models():
    provider = get_model_provider()
    try:
        models = await provider.list_models()
        return {"models": models}
    except Exception:
        return {"models": []}
