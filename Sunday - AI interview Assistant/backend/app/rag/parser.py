import hashlib
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


def extract_text_from_pdf(file_path: str) -> str:
    try:
        from pypdf import PdfReader
        reader = PdfReader(file_path)
        text_parts = []
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text_parts.append(page_text)
        return "\n\n".join(text_parts)
    except Exception as e:
        logger.error(f"PDF extraction failed: {e}")
        raise ValueError(f"Failed to extract text from PDF: {e}")


def extract_text_from_docx(file_path: str) -> str:
    try:
        from docx import Document
        doc = Document(file_path)
        paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
        return "\n\n".join(paragraphs)
    except Exception as e:
        logger.error(f"DOCX extraction failed: {e}")
        raise ValueError(f"Failed to extract text from DOCX: {e}")


def extract_text_from_txt(file_path: str) -> str:
    try:
        path = Path(file_path)
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        try:
            return Path(file_path).read_text(encoding="latin-1")
        except Exception as e:
            logger.error(f"TXT extraction failed: {e}")
            raise ValueError(f"Failed to read text file: {e}")


def extract_text(file_path: str) -> str:
    ext = Path(file_path).suffix.lower()
    if ext == ".pdf":
        return extract_text_from_pdf(file_path)
    elif ext == ".docx":
        return extract_text_from_docx(file_path)
    elif ext == ".txt":
        return extract_text_from_txt(file_path)
    else:
        raise ValueError(f"Unsupported file type: {ext}")


def clean_text(text: str) -> str:
    import re
    text = re.sub(r'\r\n', '\n', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r' {2,}', ' ', text)
    return text.strip()


def compute_hash(content: bytes) -> str:
    return hashlib.sha256(content).hexdigest()[:16]


def detect_sections(text: str) -> list[dict]:
    import re
    section_patterns = [
        r'^(summary|objective|profile|about)',
        r'^(experience|employment|work history)',
        r'^(education|academic)',
        r'^(skills|technologies|competencies)',
        r'^(projects)',
        r'^(certifications|licenses)',
        r'^(achievements|awards)',
        r'^(responsibilities|requirements|qualifications)',
    ]
    sections = []
    lines = text.split('\n')
    current_section = {"title": "general", "text": ""}

    for line in lines:
        is_header = False
        for pattern in section_patterns:
            if re.match(pattern, line.strip(), re.IGNORECASE):
                if current_section["text"].strip():
                    sections.append(current_section)
                current_section = {"title": line.strip(), "text": ""}
                is_header = True
                break
        if not is_header:
            current_section["text"] += line + "\n"

    if current_section["text"].strip():
        sections.append(current_section)

    return sections if sections else [{"title": "general", "text": text}]
