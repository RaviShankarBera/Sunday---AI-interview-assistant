import logging
from app.ai.provider import get_model_provider
from app.ai.prompts import build_preparation_prompt
from app.services.document_service import DocumentService

logger = logging.getLogger(__name__)


class PreparationService:
    @staticmethod
    async def generate_questions(
        topic: str = "general",
        resume_chunks: list[str] | None = None,
        jd_chunks: list[str] | None = None,
    ) -> dict:
        messages = build_preparation_prompt(
            resume_chunks=resume_chunks,
            jd_chunks=jd_chunks,
            topic=topic,
        )

        provider = get_model_provider()
        response = await provider.chat(messages)

        questions = _parse_questions(response)

        return {
            "questions": questions,
            "topic": topic,
            "count": len(questions),
        }

    @staticmethod
    async def generate_answer_draft(question: str) -> dict:
        messages = [
            {"role": "system", "content": "Draft a concise, natural interview answer in first person. Keep it under 200 words."},
            {"role": "user", "content": f"Draft an answer for: {question}"},
        ]

        provider = get_model_provider()
        answer = await provider.chat(messages)

        return {
            "question": question,
            "draft": answer,
        }

    @staticmethod
    async def analyze_response(question: str, response: str) -> dict:
        messages = [
            {"role": "system", "content": "Analyze this interview response. Rate clarity, relevance, and specificity. Identify missing points."},
            {"role": "user", "content": f"Question: {question}\n\nResponse: {response}"},
        ]

        provider = get_model_provider()
        analysis = await provider.chat(messages)

        return {
            "question": question,
            "analysis": analysis,
        }


def _parse_questions(text: str) -> list[str]:
    import re
    questions = re.findall(r'(?:\d+[\.\)]\s*|\-\s*|Q\d*[\:\.]\s*)(.+?)(?:\n|$)', text)
    if not questions:
        questions = [q.strip() for q in text.split('\n') if q.strip().endswith('?')]
    return [q.strip() for q in questions if q.strip()]
