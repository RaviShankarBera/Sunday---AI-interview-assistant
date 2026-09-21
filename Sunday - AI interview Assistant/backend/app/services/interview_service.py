import time
import logging
from typing import AsyncGenerator

from app.ai.provider import get_model_provider
from app.ai.prompts import build_interview_prompt
from app.services.document_service import DocumentService
from app.database.repositories import SessionRepository, QuestionRepository, AnswerRepository

logger = logging.getLogger(__name__)


class InterviewService:
    def __init__(self):
        self.recent_context: list[dict] = []
        self.max_context = 10

    async def generate_answer(
        self,
        question: str,
        session_id: str | None = None,
        response_style: str = "concise",
    ) -> dict:
        start_time = time.time()

        resume_chunks = []
        jd_chunks = []

        resume_results = await DocumentService.retrieve(question, doc_type="resume", top_k=3)
        resume_chunks = [r["text"] for r in resume_results]

        jd_results = await DocumentService.retrieve(question, doc_type="job_description", top_k=3)
        jd_chunks = [r["text"] for r in jd_results]

        messages = build_interview_prompt(
            question=question,
            resume_chunks=resume_chunks,
            jd_chunks=jd_chunks,
            recent_context=self.recent_context,
            response_style=response_style,
        )

        provider = get_model_provider()
        answer_text = await provider.chat(messages)

        key_points = self._extract_key_points(answer_text)
        follow_up = self._extract_follow_up(answer_text)

        latency_ms = int((time.time() - start_time) * 1000)

        self.recent_context.append({"role": "question", "content": question})
        self.recent_context.append({"role": "answer", "content": answer_text})
        if len(self.recent_context) > self.max_context:
            self.recent_context = self.recent_context[-self.max_context:]

        if session_id:
            q_record = await QuestionRepository.create(session_id, question)
            await AnswerRepository.create(
                q_record["id"], answer_text,
                key_points=key_points,
                model="ollama",
                latency_ms=latency_ms,
            )

        return {
            "answer": answer_text,
            "key_points": key_points,
            "follow_up": follow_up,
            "latency_ms": latency_ms,
            "context_used": {
                "resume_chunks": len(resume_chunks),
                "jd_chunks": len(jd_chunks),
            },
        }

    async def generate_answer_stream(
        self,
        question: str,
        session_id: str | None = None,
        response_style: str = "concise",
    ) -> AsyncGenerator[str, None]:
        resume_results = await DocumentService.retrieve(question, doc_type="resume", top_k=3)
        resume_chunks = [r["text"] for r in resume_results]

        jd_results = await DocumentService.retrieve(question, doc_type="job_description", top_k=3)
        jd_chunks = [r["text"] for r in jd_results]

        messages = build_interview_prompt(
            question=question,
            resume_chunks=resume_chunks,
            jd_chunks=jd_chunks,
            recent_context=self.recent_context,
            response_style=response_style,
        )

        provider = get_model_provider()
        async for token in provider.stream(messages):
            yield token

        self.recent_context.append({"role": "question", "content": question})
        if len(self.recent_context) > self.max_context:
            self.recent_context = self.recent_context[-self.max_context:]

    def clear_context(self):
        self.recent_context = []

    def _extract_key_points(self, text: str) -> list[str]:
        import re
        points = re.findall(r'[-•]\s*(.+)', text)
        if not points:
            sentences = text.split('.')
            points = [s.strip() for s in sentences[:5] if s.strip()]
        return points[:5]

    def _extract_follow_up(self, text: str) -> str | None:
        import re
        match = re.search(r'follow[- ]?up[:\s]+(.+)', text, re.IGNORECASE)
        return match.group(1).strip() if match else None


_interview_service: InterviewService | None = None


def get_interview_service() -> InterviewService:
    global _interview_service
    if _interview_service is None:
        _interview_service = InterviewService()
    return _interview_service
