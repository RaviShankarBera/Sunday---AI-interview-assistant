import re
import logging
from collections import deque

logger = logging.getLogger(__name__)

QUESTION_PATTERNS = [
    r'^(can you|could you)',
    r'^(how did|how would|how do you)',
    r'^(why do you|why did|why would)',
    r'^(what is|what are|what was|what do you|what have)',
    r'^(when did|when was|when would)',
    r'^(tell me about|describe|explain|walk me through)',
    r'^(do you|did you|have you|are you)',
]


class QuestionDetector:
    def __init__(self):
        self.recent_fingerprints: deque = deque(maxlen=20)
        self.fingerprint_ttl = 300

    def detect(self, text: str, confidence_threshold: float = 0.5) -> dict | None:
        text = text.strip()
        if not text or len(text) < 10:
            return None

        fingerprint = self._fingerprint(text)
        if self._is_duplicate(fingerprint):
            logger.debug(f"Duplicate question ignored: {text[:50]}...")
            return None

        confidence = self._compute_confidence(text)
        if confidence < confidence_threshold:
            return None

        self.recent_fingerprints.append({"fingerprint": fingerprint, "text": text})

        return {
            "text": text,
            "confidence": confidence,
            "type": "interview_question",
        }

    def _fingerprint(self, text: str) -> str:
        normalized = re.sub(r'[^\w\s]', '', text.lower())
        normalized = re.sub(r'\s+', ' ', normalized).strip()
        return normalized

    def _is_duplicate(self, fingerprint: str) -> bool:
        for entry in self.recent_fingerprints:
            if entry["fingerprint"] == fingerprint:
                return True
            similarity = self._similarity(fingerprint, entry["fingerprint"])
            if similarity > 0.85:
                return True
        return False

    def _similarity(self, a: str, b: str) -> float:
        words_a = set(a.split())
        words_b = set(b.split())
        if not words_a or not words_b:
            return 0.0
        intersection = words_a & words_b
        union = words_a | words_b
        return len(intersection) / len(union) if union else 0.0

    def _compute_confidence(self, text: str) -> float:
        score = 0.3
        text_lower = text.lower()
        for pattern in QUESTION_PATTERNS:
            if re.match(pattern, text_lower):
                score += 0.3
                break
        if text.rstrip().endswith('?'):
            score += 0.3
        if len(text.split()) >= 5:
            score += 0.1
        return min(score, 1.0)


class TranscriptAggregator:
    def __init__(self):
        self.partial_buffer = ""
        self.stable_segments: list[dict] = []

    def add_partial(self, text: str) -> str:
        if text.startswith(self.partial_buffer):
            self.partial_buffer = text
        else:
            self.partial_buffer = text
        return self.partial_buffer

    def finalize(self, text: str) -> dict:
        self.stable_segments.append({
            "text": text,
            "is_final": True,
        })
        self.partial_buffer = ""
        return {"text": text, "is_final": True}

    def get_stable_text(self) -> str:
        return self.partial_buffer

    def clear(self):
        self.partial_buffer = ""
        self.stable_segments = []
