from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter()


class ScreenAnalysisResponse(BaseModel):
    detected_text: str = ""
    code: str = ""
    language: str | None = None
    analysis: str = ""


@router.post("/screen/analyze", response_model=ScreenAnalysisResponse)
async def analyze_screen():
    return ScreenAnalysisResponse(
        detected_text="",
        code="",
        language=None,
        analysis="Screen analysis requires OCR and AI pipeline. Connect backend services.",
    )
