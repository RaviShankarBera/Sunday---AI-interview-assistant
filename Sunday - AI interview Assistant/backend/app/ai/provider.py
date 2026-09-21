import json
import logging
from typing import AsyncGenerator

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

OLLAMA_TIMEOUT = 300.0


class ModelProvider:
    async def chat(self, messages: list[dict], model: str | None = None) -> str:
        raise NotImplementedError

    async def stream(self, messages: list[dict], model: str | None = None) -> AsyncGenerator[str, None]:
        raise NotImplementedError

    async def health(self) -> bool:
        raise NotImplementedError

    async def model_info(self, model: str | None = None) -> dict:
        raise NotImplementedError

    async def list_models(self) -> list[dict]:
        raise NotImplementedError


class OllamaProvider(ModelProvider):
    def __init__(self):
        self.base_url = settings.ollama_host
        self.default_model = settings.ollama_model

    async def chat(self, messages: list[dict], model: str | None = None) -> str:
        model = model or self.default_model
        try:
            async with httpx.AsyncClient(timeout=OLLAMA_TIMEOUT) as client:
                response = await client.post(
                    f"{self.base_url}/api/chat",
                    json={"model": model, "messages": messages, "stream": False},
                )
                response.raise_for_status()
                data = response.json()
                return data.get("message", {}).get("content", "")
        except httpx.ConnectError:
            raise ConnectionError("Cannot connect to Ollama. Is it running?")
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                raise ValueError(f"Model '{model}' not found. Pull it with: ollama pull {model}")
            raise

    async def stream(self, messages: list[dict], model: str | None = None) -> AsyncGenerator[str, None]:
        model = model or self.default_model
        try:
            async with httpx.AsyncClient(timeout=OLLAMA_TIMEOUT) as client:
                async with client.stream(
                    "POST",
                    f"{self.base_url}/api/chat",
                    json={"model": model, "messages": messages, "stream": True},
                ) as response:
                    response.raise_for_status()
                    async for line in response.aiter_lines():
                        if line:
                            try:
                                data = json.loads(line)
                                content = data.get("message", {}).get("content", "")
                                if content:
                                    yield content
                                if data.get("done"):
                                    break
                            except json.JSONDecodeError:
                                continue
        except httpx.ConnectError:
            raise ConnectionError("Cannot connect to Ollama. Is it running?")

    async def health(self) -> bool:
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get(f"{self.base_url}/api/tags")
                return response.status_code == 200
        except Exception:
            return False

    async def list_models(self) -> list[dict]:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(f"{self.base_url}/api/tags")
                if response.status_code == 200:
                    data = response.json()
                    return data.get("models", [])
                return []
        except Exception:
            return []

    async def model_info(self, model: str | None = None) -> dict:
        model = model or self.default_model
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    f"{self.base_url}/api/show",
                    json={"name": model},
                )
                if response.status_code == 200:
                    return response.json()
                return {"name": model, "status": "not_found"}
        except Exception:
            return {"name": model, "status": "unavailable"}


_provider: ModelProvider | None = None


def get_model_provider() -> ModelProvider:
    global _provider
    if _provider is None:
        _provider = OllamaProvider()
    return _provider
