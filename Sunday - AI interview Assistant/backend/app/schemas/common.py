from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str


class ErrorResponse(BaseModel):
    error: ErrorDetail


class ErrorDetail(BaseModel):
    code: str
    message: str
    retryable: bool = False
