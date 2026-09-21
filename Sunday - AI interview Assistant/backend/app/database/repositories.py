import uuid
import json
from datetime import datetime
from app.database.connection import get_db


class SessionRepository:
    @staticmethod
    async def create(title: str, session_type: str = "interview", resume_id: str | None = None, jd_id: str | None = None, model: str = "qwen3:8b") -> dict:
        db = await get_db()
        try:
            sid = f"sess_{uuid.uuid4().hex[:8]}"
            now = datetime.utcnow().isoformat()
            await db.execute(
                "INSERT INTO sessions (id, title, type, resume_id, job_description_id, model, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (sid, title, session_type, resume_id, jd_id, model, now, now),
            )
            await db.commit()
            return {"id": sid, "title": title, "type": session_type, "model": model, "created_at": now, "updated_at": now}
        finally:
            await db.close()

    @staticmethod
    async def get(session_id: str) -> dict | None:
        db = await get_db()
        try:
            cursor = await db.execute("SELECT * FROM sessions WHERE id = ?", (session_id,))
            row = await cursor.fetchone()
            return dict(row) if row else None
        finally:
            await db.close()

    @staticmethod
    async def list_all(limit: int = 50) -> list[dict]:
        db = await get_db()
        try:
            cursor = await db.execute("SELECT * FROM sessions ORDER BY created_at DESC LIMIT ?", (limit,))
            rows = await cursor.fetchall()
            return [dict(r) for r in rows]
        finally:
            await db.close()

    @staticmethod
    async def delete(session_id: str) -> bool:
        db = await get_db()
        try:
            cursor = await db.execute("DELETE FROM sessions WHERE id = ?", (session_id,))
            await db.commit()
            return cursor.rowcount > 0
        finally:
            await db.close()


class DocumentRepository:
    @staticmethod
    async def create(doc_id: str, doc_type: str, filename: str, path: str, file_hash: str | None = None) -> dict:
        db = await get_db()
        try:
            now = datetime.utcnow().isoformat()
            await db.execute(
                "INSERT INTO documents (id, type, filename, path, hash, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
                (doc_id, doc_type, filename, path, file_hash, "indexed", now),
            )
            await db.commit()
            return {"id": doc_id, "type": doc_type, "filename": filename, "status": "indexed", "created_at": now}
        finally:
            await db.close()

    @staticmethod
    async def get(doc_id: str) -> dict | None:
        db = await get_db()
        try:
            cursor = await db.execute("SELECT * FROM documents WHERE id = ?", (doc_id,))
            row = await cursor.fetchone()
            return dict(row) if row else None
        finally:
            await db.close()

    @staticmethod
    async def list_by_type(doc_type: str) -> list[dict]:
        db = await get_db()
        try:
            cursor = await db.execute("SELECT * FROM documents WHERE type = ? ORDER BY created_at DESC", (doc_type,))
            rows = await cursor.fetchall()
            return [dict(r) for r in rows]
        finally:
            await db.close()

    @staticmethod
    async def delete(doc_id: str) -> bool:
        db = await get_db()
        try:
            cursor = await db.execute("DELETE FROM documents WHERE id = ?", (doc_id,))
            await db.commit()
            return cursor.rowcount > 0
        finally:
            await db.close()


class QuestionRepository:
    @staticmethod
    async def create(session_id: str, question: str, confidence: float = 0.0, source: str = "transcript") -> dict:
        db = await get_db()
        try:
            qid = f"q_{uuid.uuid4().hex[:8]}"
            now = datetime.utcnow().isoformat()
            await db.execute(
                "INSERT INTO questions (id, session_id, question, confidence, source, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
                (qid, session_id, question, confidence, source, now),
            )
            await db.commit()
            return {"id": qid, "session_id": session_id, "question": question, "confidence": confidence, "timestamp": now}
        finally:
            await db.close()

    @staticmethod
    async def list_by_session(session_id: str) -> list[dict]:
        db = await get_db()
        try:
            cursor = await db.execute("SELECT * FROM questions WHERE session_id = ? ORDER BY timestamp", (session_id,))
            rows = await cursor.fetchall()
            return [dict(r) for r in rows]
        finally:
            await db.close()


class AnswerRepository:
    @staticmethod
    async def create(question_id: str, answer: str, key_points: list[str] | None = None, model: str | None = None, latency_ms: int | None = None) -> dict:
        db = await get_db()
        try:
            aid = f"ans_{uuid.uuid4().hex[:8]}"
            now = datetime.utcnow().isoformat()
            kp_json = json.dumps(key_points) if key_points else None
            await db.execute(
                "INSERT INTO answers (id, question_id, answer, key_points, model, latency_ms, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)",
                (aid, question_id, answer, kp_json, model, latency_ms, now),
            )
            await db.commit()
            return {"id": aid, "question_id": question_id, "answer": answer, "key_points": key_points, "timestamp": now}
        finally:
            await db.close()

    @staticmethod
    async def list_by_question(question_id: str) -> list[dict]:
        db = await get_db()
        try:
            cursor = await db.execute("SELECT * FROM answers WHERE question_id = ? ORDER BY timestamp", (question_id,))
            rows = await cursor.fetchall()
            return [dict(r) for r in rows]
        finally:
            await db.close()


class SettingsRepository:
    @staticmethod
    async def get(key: str) -> str | None:
        db = await get_db()
        try:
            cursor = await db.execute("SELECT value FROM settings WHERE key = ?", (key,))
            row = await cursor.fetchone()
            return row["value"] if row else None
        finally:
            await db.close()

    @staticmethod
    async def set(key: str, value: str) -> None:
        db = await get_db()
        try:
            now = datetime.utcnow().isoformat()
            await db.execute(
                "INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = ?",
                (key, value, now, value, now),
            )
            await db.commit()
        finally:
            await db.close()

    @staticmethod
    async def get_all() -> dict:
        db = await get_db()
        try:
            cursor = await db.execute("SELECT key, value FROM settings")
            rows = await cursor.fetchall()
            return {r["key"]: r["value"] for r in rows}
        finally:
            await db.close()

    @staticmethod
    async def delete(key: str) -> bool:
        db = await get_db()
        try:
            cursor = await db.execute("DELETE FROM settings WHERE key = ?", (key,))
            await db.commit()
            return cursor.rowcount > 0
        finally:
            await db.close()
