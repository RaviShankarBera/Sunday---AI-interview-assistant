import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.api.websocket import websocket_transcribe
from app.core.config import settings
from app.core.logging import setup_logging
from app.core.middleware import ErrorHandlerMiddleware
from app.database.connection import init_db

setup_logging()
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Sunday Backend starting...")
    await init_db()
    logger.info("Database initialized")
    yield
    logger.info("Sunday Backend shutting down")


app = FastAPI(
    title="Sunday Backend",
    description="Sunday — An Interview AI Assistant",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(ErrorHandlerMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.websocket("/ws/transcribe")
async def ws_transcribe(websocket):
    await websocket_transcribe(websocket)


@app.get("/")
async def root():
    provider_healthy = False
    try:
        from app.ai.provider import get_model_provider
        provider = get_model_provider()
        provider_healthy = await provider.health()
    except Exception:
        pass

    return {
        "name": "Sunday Backend",
        "version": "0.1.0",
        "status": "running",
        "ai_provider": "ollama",
        "ai_healthy": provider_healthy,
    }
