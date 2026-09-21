import logging

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are Sunday, an AI interview assistant. You help candidates prepare for and navigate interviews.

RULES:
1. Be concise and professional.
2. Ground responses in the user's resume and job description when provided.
3. Never fabricate experience, employers, projects, or certifications.
4. Use first-person when drafting the candidate's answer.
5. Keep responses focused and easy to speak aloud.
6. When information is unavailable, say so clearly.
7. Provide key talking points alongside detailed answers.
8. For coding questions, explain approach, complexity, and potential issues.

Response format: Provide a suggested response, key points, and optionally a follow-up question."""


def build_interview_prompt(
    question: str,
    resume_chunks: list[str] | None = None,
    jd_chunks: list[str] | None = None,
    recent_context: list[dict] | None = None,
    response_style: str = "concise",
) -> list[dict]:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    context_parts = []
    if resume_chunks:
        context_parts.append("RESUME CONTEXT:\n" + "\n---\n".join(resume_chunks))
    if jd_chunks:
        context_parts.append("JOB DESCRIPTION CONTEXT:\n" + "\n---\n".join(jd_chunks))

    if context_parts:
        messages.append({
            "role": "system",
            "content": "Use the following context to ground your response:\n\n" + "\n\n".join(context_parts),
        })

    if recent_context:
        recent_text = "\n".join([
            f"{'Q' if m.get('role') == 'question' else 'A'}: {m.get('content', '')}"
            for m in recent_context[-6:]
        ])
        messages.append({
            "role": "system",
            "content": f"Recent conversation:\n{recent_text}",
        })

    style_instruction = {
        "concise": "Keep your response concise (2-3 paragraphs).",
        "detailed": "Provide a detailed response with specific examples.",
        "professional": "Use a professional tone with structured points.",
        "technical": "Focus on technical depth and specific technologies.",
    }.get(response_style, "Keep your response concise.")

    messages.append({"role": "system", "content": style_instruction})
    messages.append({"role": "user", "content": question})

    return messages


def build_preparation_prompt(
    resume_chunks: list[str] | None = None,
    jd_chunks: list[str] | None = None,
    topic: str = "general",
) -> list[dict]:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    context_parts = []
    if resume_chunks:
        context_parts.append("CANDIDATE RESUME:\n" + "\n---\n".join(resume_chunks))
    if jd_chunks:
        context_parts.append("TARGET JOB:\n" + "\n---\n".join(jd_chunks))

    if context_parts:
        messages.append({
            "role": "system",
            "content": "Use this context:\n\n" + "\n\n".join(context_parts),
        })

    topic_instruction = {
        "technical": "Generate 5 technical interview questions based on the candidate's resume and the job requirements.",
        "behavioral": "Generate 5 behavioral interview questions using the STAR method.",
        "resume": "Generate 5 questions about the candidate's specific experience listed in their resume.",
        "jd": "Generate 5 questions about how the candidate's experience matches the job requirements.",
        "general": "Generate a mix of technical and behavioral interview questions.",
    }.get(topic, "Generate a mix of technical and behavioral interview questions.")

    messages.append({"role": "system", "content": topic_instruction})
    messages.append({"role": "user", "content": f"Generate preparation questions for topic: {topic}"})

    return messages


def build_coding_prompt(
    extracted_text: str,
    language: str | None = None,
) -> list[dict]:
    messages = [
        {"role": "system", "content": "You are a coding interview assistant. Analyze the provided code or problem and give clear explanations."},
        {"role": "user", "content": f"""Analyze this code/problem:

{extracted_text}

Provide:
1. Problem understanding
2. Approach
3. Time and space complexity
4. Potential issues
5. Suggested improvements
6. Clear explanation"""},
    ]
    return messages
