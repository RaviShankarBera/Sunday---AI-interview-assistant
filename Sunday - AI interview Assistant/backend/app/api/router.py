from fastapi import APIRouter

from app.api import health, chat, documents, screen

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(health.router, tags=["health"])
api_router.include_router(chat.router, tags=["chat"])
api_router.include_router(documents.router, tags=["documents"])
api_router.include_router(screen.router, tags=["screen"])
