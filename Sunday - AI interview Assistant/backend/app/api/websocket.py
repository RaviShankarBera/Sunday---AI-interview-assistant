import json
import time
import logging
import asyncio
from typing import Any

from fastapi import WebSocket, WebSocketDisconnect

from app.services.interview_service import get_interview_service
from app.services.question_detection import QuestionDetector, TranscriptAggregator
from app.database.repositories import SessionRepository

logger = logging.getLogger(__name__)


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket
        logger.info(f"WebSocket connected: {client_id}")

    def disconnect(self, client_id: str):
        self.active_connections.pop(client_id, None)
        logger.info(f"WebSocket disconnected: {client_id}")

    async def send_event(self, client_id: str, event: dict):
        ws = self.active_connections.get(client_id)
        if ws:
            try:
                await ws.send_json(event)
            except Exception:
                self.disconnect(client_id)


manager = ConnectionManager()
detector = QuestionDetector()
aggregator = TranscriptAggregator()


async def websocket_transcribe(websocket: WebSocket, client_id: str = "default"):
    await manager.connect(websocket, client_id)
    session_id = None

    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            event_type = message.get("type", "")

            if event_type == "audio.chunk":
                await _handle_audio_chunk(client_id, message)

            elif event_type == "transcript.partial":
                text = message.get("text", "")
                stable = aggregator.add_partial(text)
                await manager.send_event(client_id, {
                    "type": "transcript.partial",
                    "session_id": session_id,
                    "payload": {"text": stable},
                })

            elif event_type == "transcript.final":
                text = message.get("text", "")
                segment = aggregator.finalize(text)
                await manager.send_event(client_id, {
                    "type": "transcript.final",
                    "session_id": session_id,
                    "payload": {"text": text},
                })
                await _process_transcript(client_id, text, session_id)

            elif event_type == "session.start":
                session_id = message.get("session_id")
                if not session_id:
                    title = message.get("title", "Live Interview")
                    session = await SessionRepository.create(title, "interview")
                    session_id = session["id"]
                await manager.send_event(client_id, {
                    "type": "session.started",
                    "session_id": session_id,
                })

            elif event_type == "session.stop":
                await manager.send_event(client_id, {
                    "type": "session.stopped",
                    "session_id": session_id,
                })
                session_id = None

            elif event_type == "ping":
                await manager.send_event(client_id, {"type": "pong"})

    except WebSocketDisconnect:
        manager.disconnect(client_id)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(client_id)


async def _handle_audio_chunk(client_id: str, message: dict):
    await manager.send_event(client_id, {
        "type": "audio.received",
        "payload": {"status": "ok"},
    })


async def _process_transcript(client_id: str, text: str, session_id: str | None):
    detection = detector.detect(text)
    if detection:
        await manager.send_event(client_id, {
            "type": "question.detected",
            "session_id": session_id,
            "payload": {
                "question": detection["text"],
                "confidence": detection["confidence"],
            },
        })

        service = get_interview_service()
        try:
            await manager.send_event(client_id, {
                "type": "answer.started",
                "session_id": session_id,
            })

            full_answer = ""
            async for token in service.generate_answer_stream(
                detection["text"],
                session_id=session_id,
            ):
                full_answer += token
                await manager.send_event(client_id, {
                    "type": "answer.token",
                    "session_id": session_id,
                    "payload": {"text": token},
                })

            key_points = service._extract_key_points(full_answer)
            await manager.send_event(client_id, {
                "type": "answer.completed",
                "session_id": session_id,
                "payload": {
                    "answer": full_answer,
                    "key_points": key_points,
                },
            })
        except Exception as e:
            logger.error(f"Answer generation failed: {e}")
            await manager.send_event(client_id, {
                "type": "error",
                "payload": {"message": str(e), "code": "ANSWER_GENERATION_FAILED"},
            })
