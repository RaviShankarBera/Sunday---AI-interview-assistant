from fastapi import APIRouter
from pydantic import BaseModel

from app.database.repositories import SettingsRepository

router = APIRouter()


class SettingUpdate(BaseModel):
    key: str
    value: str


DEFAULT_SETTINGS = {
    "provider": "ollama",
    "model": "qwen3:8b",
    "local_only_mode": "true",
    "save_transcript": "false",
    "theme": "system",
    "overlay_enabled": "true",
    "response_style": "concise",
    "response_length": "medium",
    "auto_question_detection": "true",
    "show_key_points": "true",
}


@router.get("/settings")
async def get_settings():
    settings = await SettingsRepository.get_all()
    merged = {**DEFAULT_SETTINGS, **settings}
    return {"settings": merged}


@router.put("/settings")
async def update_settings(updates: list[SettingUpdate]):
    for update in updates:
        await SettingsRepository.set(update.key, update.value)
    return {"status": "updated"}


@router.get("/settings/{key}")
async def get_setting(key: str):
    value = await SettingsRepository.get(key)
    if value is None:
        value = DEFAULT_SETTINGS.get(key)
    return {"key": key, "value": value}
