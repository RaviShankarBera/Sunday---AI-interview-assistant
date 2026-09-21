from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    environment: str = "development"
    host: str = "127.0.0.1"
    port: int = 8001
    cors_origins: list[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

    ollama_host: str = "http://127.0.0.1:11434"
    ollama_model: str = "qwen3:8b"

    asr_model: str = "small"
    asr_device: str = "auto"

    rag_top_k: int = 5

    log_level: str = "INFO"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
