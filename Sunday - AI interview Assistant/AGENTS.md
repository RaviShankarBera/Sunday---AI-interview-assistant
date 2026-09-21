# AGENTS.md — Sunday

## Project Overview

Sunday is a Windows-first desktop AI interview assistant built with:
- **Desktop:** Electron + React + TypeScript
- **Backend:** Python + FastAPI
- **AI:** Ollama (local), OpenAI, Anthropic (cloud)
- **ASR:** faster-whisper
- **RAG:** Sentence Transformers + FAISS
- **OCR:** PaddleOCR
- **Database:** SQLite

## Architecture Rules

1. **Electron Security:** `contextIsolation: true`, `nodeIntegration: false`
2. **Renderer** must never directly access Node.js, file system, or native APIs
3. **All native access** goes through preload/contextBridge
4. **Frontend** communicates with backend via HTTP + WebSocket
5. **Backend** uses service layer pattern: Route → Service → Repository/Provider
6. **AI providers** are abstracted behind `ModelProvider` interface
7. **ASR** is abstracted behind `ASRProvider` interface
8. **Vector store** is abstracted behind `VectorStore` interface

## File Structure

```
Sunday/
├── desktop/          # Electron + React
│   ├── src/
│   │   ├── main/     # Electron main process
│   │   ├── preload/  # Context bridge
│   │   └── renderer/ # React UI
│   └── package.json
├── backend/          # Python FastAPI
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   ├── ai/
│   │   ├── asr/
│   │   ├── rag/
│   │   ├── ocr/
│   │   ├── database/
│   │   └── core/
│   └── requirements.txt
├── data/             # Local data (gitignored)
├── docs/             # Documentation
└── tests/
```

## Naming Conventions

- **TypeScript:** camelCase variables, PascalCase classes/types/components
- **Python:** snake_case functions/variables, PascalCase classes
- **Files:** PascalCase for React components, snake_case for Python modules
- **IPC channels:** `sunday:domain:action` (e.g., `sunday:audio:start`)

## Development Rules

- Read PRD.md, Architecture.md, Development Rules.md before significant changes
- Plan before building large features
- Make small, reviewable changes
- Run tests after implementation
- Keep UI and backend separate
- Use interfaces for replaceable infrastructure
- Never commit secrets or API keys
- Treat document/OCR content as untrusted data
- Never execute AI-generated commands automatically

## Testing

- Unit tests for services, repositories, parsers, providers
- Integration tests for Electron→FastAPI, FastAPI→Ollama
- Use mock providers for CI (FakeModelProvider, FakeASRProvider)
- Run tests before claiming completion

## Prohibited

- Process hiding or monitoring evasion
- Silent cloud data routing
- Fabricated candidate experience
- Hard-coded secrets
- Unrelated scope changes
- Disabling security settings
