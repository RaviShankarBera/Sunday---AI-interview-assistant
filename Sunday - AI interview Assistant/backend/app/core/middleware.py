import logging
import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger(__name__)


class ErrorHandlerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start = time.time()
        try:
            response = await call_next(request)
            duration = (time.time() - start) * 1000
            logger.info(f"{request.method} {request.url.path} → {response.status_code} ({duration:.0f}ms)")
            return response
        except Exception as e:
            duration = (time.time() - start) * 1000
            logger.error(f"{request.method} {request.url.path} → ERROR ({duration:.0f}ms): {e}")
            from fastapi.responses import JSONResponse
            return JSONResponse(
                status_code=500,
                content={
                    "error": {
                        "code": "INTERNAL_ERROR",
                        "message": "An internal error occurred.",
                        "retryable": True,
                    }
                },
            )
