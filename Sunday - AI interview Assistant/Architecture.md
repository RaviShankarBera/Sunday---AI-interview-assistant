# Architecture — Sunday
## An Interview AI Assistant

**Document Status:** Draft  
**Version:** 1.0  
**Product:** Sunday — An Interview AI Assistant  
**Primary Platform:** Windows 10/11  
**Architecture Style:** Local-first desktop application with modular AI services  
**Primary Runtime:** Electron + React + TypeScript + Python/FastAPI

---

# 1. Architecture Summary

Sunday is a Windows-first desktop AI application composed of:

1. **Electron Desktop Shell**
2. **React + TypeScript User Interface**
3. **Secure Electron Main/Preload Layer**
4. **Python FastAPI AI Backend**
5. **Speech-to-Text Pipeline**
6. **RAG / Knowledge Retrieval Pipeline**
7. **AI Model Provider Layer**
8. **OCR / Screen Intelligence Pipeline**
9. **SQLite Local Database**
10. **Local Document and Vector Storage**
11. **Optional Cloud AI Providers**

The core architecture is:

```text
┌─────────────────────────────────────────────────────────────┐
│                         SUNDAY DESKTOP                      │
│                                                             │
│  React UI                                                   │
│     │                                                       │
│     ▼                                                       │
│  Preload / Context Bridge                                   │
│     │                                                       │
│     ▼                                                       │
│  Electron Main Process                                      │
│     │                                                       │
│     ├────────────── Desktop Capture                         │
│     ├────────────── Screen Capture                          │
│     ├────────────── Global Shortcuts                        │
│     └────────────── Window Management                        │
│                                                             │
└─────────────────────────────┬───────────────────────────────┘
                              │
                    HTTP + WebSocket
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       SUNDAY BACKEND                        │
│                       Python + FastAPI                      │
│                                                             │
│ ┌────────────┐ ┌─────────────┐ ┌─────────────┐             │
│ │ Document   │ │ Interview   │ │ Screen/OCR  │             │
│ │ Service    │ │ Service     │ │ Service     │             │
│ └─────┬──────┘ └──────┬──────┘ └──────┬──────┘             │
│       │                │                │                    │
│       ▼                ▼                ▼                    │
│ ┌────────────┐ ┌─────────────┐ ┌─────────────┐             │
│ │ RAG        │ │ ASR/VAD     │ │ OCR         │             │
│ │ Services   │ │ Services     │ │ Services    │             │
│ └─────┬──────┘ └──────┬──────┘ └──────┬──────┘             │
│       │                │                │                    │
│       └────────────────┼────────────────┘                    │
│                        ▼                                     │
│                  Context Engine                             │
│                        │                                     │
│                        ▼                                     │
│                  Model Router                                │
└────────────────────────┬────────────────────────────────────┘
                         │
            ┌────────────┼────────────┐
            │            │            │
            ▼            ▼            ▼
        Ollama       OpenAI      Anthropic
        / Local      / Cloud      / Cloud
        Models       Models       Models

          ┌─────────────────────────────┐
          │      Local Data Layer       │
          │                             │
          │ SQLite + Files + FAISS      │
          └─────────────────────────────┘
```

---

# 2. Architecture Goals

The architecture must optimize for:

- Local-first operation
- Low latency
- Strong privacy defaults
- Modular AI providers
- Testability
- Maintainability
- Clear separation of desktop and AI concerns
- Secure Electron boundaries
- Streaming communication
- Graceful degradation
- Easy Windows packaging
- Future provider/model expansion

---

# 3. Architecture Principles

## 3.1 Local First

The baseline system should be capable of running with:

```text
Electron
React
FastAPI
faster-whisper
Ollama
Local model
FAISS
SQLite
PaddleOCR
```

without requiring cloud AI.

---

## 3.2 Separate UI From AI Logic

The React renderer must not directly contain:

- Whisper implementation
- RAG implementation
- Ollama implementation
- SQLite implementation
- OCR implementation

Instead:

```text
React
  ↓
Frontend Service
  ↓
FastAPI
  ↓
Backend Service
```

---

## 3.3 Provider Independence

Business logic must not depend directly on:

```text
Ollama
OpenAI
Anthropic
```

Instead:

```text
InterviewService
       ↓
ModelProvider
       ↓
Concrete Provider
```

---

## 3.4 Streaming First

Real-time functionality must use streaming wherever practical.

Streaming should be used for:

- Audio
- Transcript
- AI tokens
- Progress events

---

## 3.5 Explicit User Actions for Capture

Audio and screen analysis should be clearly controlled.

Recommended states:

```text
IDLE
STARTING
CAPTURING
PROCESSING
STOPPING
ERROR
```

---

## 3.6 Secure by Default

Electron must use:

```text
contextIsolation: true
nodeIntegration: false
```

Renderer access to native features must go through a restricted preload bridge.

---

# 4. High-Level Component Architecture

## 4.1 Desktop Layer

```text
desktop/
└── Electron
    ├── Main Process
    ├── Preload
    └── Renderer
```

Responsibilities:

### Main Process

Owns:

- App lifecycle
- Windows
- Overlay
- Global shortcuts
- Desktop capture
- Screen capture
- Native integrations
- IPC coordination

### Preload

Owns:

- Safe native API exposure
- Context bridge
- Typed IPC facade

### Renderer

Owns:

- UI
- User interactions
- Application state
- API clients
- WebSocket clients
- Presentation logic

---

# 5. Backend Component Architecture

```text
backend/
└── app/
    ├── api/
    ├── services/
    ├── ai/
    ├── asr/
    ├── rag/
    ├── ocr/
    ├── database/
    ├── models/
    ├── schemas/
    └── core/
```

Recommended responsibilities:

```text
api/
    API routes

services/
    Business workflows

ai/
    Model abstraction and prompts

asr/
    Audio processing and speech recognition

rag/
    Document ingestion and retrieval

ocr/
    Screen/image analysis

database/
    SQLite persistence

models/
    Domain objects

schemas/
    Pydantic API schemas

core/
    Configuration, logging, errors
```

---

# 6. End-to-End Data Flow

## 6.1 Preparation Flow

```text
User
 ↓
Sunday UI
 ↓
Upload Resume
 ↓
Electron
 ↓
FastAPI /documents/upload
 ↓
Document Parser
 ↓
Text Extraction
 ↓
Cleaning
 ↓
Section Detection
 ↓
Chunking
 ↓
Embedding Model
 ↓
FAISS
 ↓
SQLite Metadata
 ↓
Ready
```

Job description follows the same flow.

---

# 7. Interview Question Flow

```text
Interview Audio
      ↓
Electron Capture
      ↓
Audio Chunks
      ↓
WebSocket
      ↓
Backend Audio Buffer
      ↓
VAD
      ↓
faster-whisper
      ↓
Partial Transcript
      ↓
Sentence Stabilization
      ↓
Question Detector
      ↓
Question Event
      ↓
RAG Retrieval
      ↓
Context Builder
      ↓
Prompt Builder
      ↓
Model Provider
      ↓
Streaming Response
      ↓
WebSocket / HTTP Stream
      ↓
Sunday Overlay
```

---

# 8. Coding Mode Flow

```text
User
 ↓
Analyze Screen
 ↓
Electron Capture
 ↓
Image
 ↓
Backend
 ↓
Image Preprocessing
 ↓
PaddleOCR
 ↓
Text / Code Extraction
 ↓
Code Detection
 ↓
Programming Language Detection
 ↓
Context Builder
 ↓
Model Provider
 ↓
Coding Analysis
 ↓
Sunday Coding UI
```

---

# 9. Preparation Mode Architecture

Preparation mode should not depend on live audio.

```text
Resume
   +
Job Description
   ↓
Candidate/Role Profile
   ↓
Question Generator
   ↓
Preparation Engine
   ├── Technical Questions
   ├── Behavioral Questions
   ├── Resume Questions
   ├── Role Questions
   └── Follow-ups
   ↓
AI
   ↓
Preparation Dashboard
```

---

# 10. Electron Architecture

## 10.1 Main Process

Recommended modules:

```text
main/
├── index.ts
├── windows.ts
├── ipc.ts
├── audio.ts
├── screen.ts
├── shortcuts.ts
├── tray.ts
└── lifecycle.ts
```

### index.ts

Application entry point.

Responsibilities:

- Initialize Electron
- Load configuration
- Initialize services
- Create windows
- Register shortcuts
- Handle lifecycle

### windows.ts

Responsible for:

- Main window
- Overlay window
- Coding analysis window
- Optional settings window

### audio.ts

Responsible for:

- Desktop capture lifecycle
- Capture source selection
- Audio stream handling
- Audio status events

### screen.ts

Responsible for:

- Screen/window capture
- Screenshot lifecycle
- Image transfer

### shortcuts.ts

Responsible for:

- Global shortcut registration
- Shortcut state
- Shortcut cleanup

---

# 11. Preload Architecture

The preload layer should expose a minimal typed API.

Example conceptual interface:

```typescript
window.sunday = {
  app: {
    getVersion(): Promise<string>
  },

  audio: {
    start(): Promise<void>
    stop(): Promise<void>
    getSources(): Promise<AudioSource[]>
  },

  screen: {
    getSources(): Promise<ScreenSource[]>
    capture(sourceId: string): Promise<CapturedImage>
  },

  overlay: {
    show(): Promise<void>
    hide(): Promise<void>
    toggle(): Promise<void>
  },

  shortcuts: {
    register(): Promise<void>
  }
}
```

The renderer must never receive unrestricted Electron or Node APIs.

---

# 12. Frontend Architecture

Recommended structure:

```text
renderer/
├── App.tsx
├── routes/
├── pages/
├── components/
├── features/
├── hooks/
├── services/
├── store/
├── types/
└── styles/
```

## Pages

```text
Dashboard
Interview
Preparation
Resume
JobDescription
Coding
History
Settings
```

## Feature modules

```text
features/
├── interview/
├── preparation/
├── resume/
├── jobDescription/
├── coding/
├── overlay/
└── settings/
```

---

# 13. Frontend State Management

Recommended state domains:

```text
appState
sessionState
interviewState
transcriptState
answerState
documentState
settingsState
modelState
captureState
```

Example interview state:

```typescript
interface InterviewState {
  status: "idle" | "listening" | "processing" | "error";
  currentQuestion?: string;
  transcript: TranscriptSegment[];
  suggestedAnswer?: string;
  keyPoints: string[];
  latencyMs?: number;
}
```

---

# 14. Backend API Architecture

Base path:

```text
/api/v1
```

Routes:

```text
GET    /health
POST   /chat
POST   /documents/upload
GET    /documents
DELETE /documents/{id}
POST   /preparation/generate
POST   /sessions
GET    /sessions
GET    /sessions/{id}
POST   /screen/analyze
```

WebSocket endpoints:

```text
/ws/transcribe
/ws/answers
```

---

# 15. API Layer Responsibilities

API routes should be thin.

Bad:

```text
Route
 ├── parse PDF
 ├── build embeddings
 ├── call FAISS
 ├── build prompt
 ├── call Ollama
 └── save database
```

Preferred:

```text
Route
 ↓
Service
 ↓
Repository / AI / RAG
```

Example:

```text
POST /documents/upload
       ↓
DocumentService.ingest()
       ↓
DocumentParser
       ↓
Chunker
       ↓
EmbeddingService
       ↓
VectorStore
       ↓
DocumentRepository
```

---

# 16. Service Layer

Recommended services:

```text
DocumentService
InterviewService
PreparationService
TranscriptionService
QuestionDetectionService
AnswerGenerationService
ScreenAnalysisService
SessionService
SettingsService
ModelService
```

---

# 17. AI Provider Architecture

Create an interface:

```python
class ModelProvider:
    async def chat(...):
        ...

    async def stream(...):
        ...

    async def health(...):
        ...

    async def model_info(...):
        ...
```

Concrete implementations:

```text
providers/
├── base.py
├── ollama.py
├── openai.py
└── anthropic.py
```

---

# 18. Model Router

The model router selects a provider and model based on settings.

```text
User Settings
      ↓
Provider = Ollama
Model = qwen3:8b
      ↓
ModelRouter
      ↓
OllamaProvider
```

A future configuration could be:

```text
Provider: Anthropic
Model: selected model
```

without changing InterviewService.

---

# 19. Prompt Architecture

Keep prompts separate from application code.

```text
ai/prompts/
├── interview.py
├── preparation.py
├── coding.py
├── system.py
└── common.py
```

Prompt construction should be explicit:

```text
System Instructions
       +
User Question
       +
Resume Context
       +
JD Context
       +
Recent Conversation
       +
Optional Screen Context
       ↓
Final Prompt
```

---

# 20. Context Builder

The Context Builder is a core Sunday component.

Inputs:

```text
Current Question
Resume Retrieval
JD Retrieval
Recent Transcript
Previous Question
Screen Context
User Settings
```

Output:

```python
InterviewContext
```

Conceptually:

```text
InterviewContext
├── question
├── resume_chunks
├── jd_chunks
├── recent_context
├── screen_context
├── role
└── response_preferences
```

---

# 21. RAG Architecture

## 21.1 Document Ingestion

```text
File
 ↓
Parser
 ↓
Raw Text
 ↓
Cleaner
 ↓
Section Detector
 ↓
Chunker
 ↓
Embedding Generator
 ↓
FAISS
```

## 21.2 Retrieval

```text
Question
 ↓
Query Embedding
 ↓
FAISS Search
 ↓
Top-K Chunks
 ↓
Metadata Filtering
 ↓
Context Builder
```

---

# 22. RAG Storage

Use:

```text
FAISS
```

for vector similarity search.

Use SQLite for metadata:

```text
document_id
chunk_id
source
section
text
vector_reference
```

Store vector indexes under:

```text
data/vector_store/
```

Example:

```text
data/vector_store/
├── resume/
│   ├── index.faiss
│   └── metadata.json
│
└── job_description/
    ├── index.faiss
    └── metadata.json
```

---

# 23. Document Storage

Store original files separately:

```text
data/
├── resumes/
├── job_descriptions/
├── screenshots/
├── sessions/
└── logs/
```

Never assume the displayed filename is unique.

Use generated IDs.

Example:

```text
resume_9c31f8.pdf
```

---

# 24. ASR Architecture

## Pipeline

```text
Desktop Audio
 ↓
Chunker
 ↓
Audio Buffer
 ↓
Voice Activity Detection
 ↓
Whisper
 ↓
Transcript Segment
 ↓
Transcript Aggregator
```

---

# 25. Transcript Aggregator

The Transcript Aggregator converts ASR fragments into stable segments.

Input:

```text
"Can you"
"Can you explain"
"Can you explain your"
"Can you explain your experience..."
```

Output:

```text
"Can you explain your experience with SAP SD?"
```

Responsibilities:

- Partial transcript handling
- Deduplication
- Sentence stabilization
- Timestamping
- Speaker-context metadata where available
- Finalization

---

# 26. Question Detection Architecture

```text
Transcript Segment
       ↓
Sentence Complete?
       ↓
Pause?
       ↓
Question Heuristic
       ↓
Optional Lightweight Classifier
       ↓
Question Event
```

Question Event:

```json
{
  "type": "interview_question",
  "text": "Explain your experience with SAP SD.",
  "confidence": 0.94,
  "timestamp": "..."
}
```

---

# 27. Duplicate Question Prevention

Maintain recent question fingerprints.

```text
Current Question
      ↓
Normalize
      ↓
Hash
      ↓
Compare Recent Questions
      ↓
New?
 ┌────┴────┐
Yes        No
 ↓          ↓
Process    Ignore
```

Maintain a time-based expiration.

---

# 28. Answer Generation Pipeline

```text
Question Event
      ↓
Retrieve Resume Context
      ↓
Retrieve JD Context
      ↓
Collect Recent Context
      ↓
Build InterviewContext
      ↓
Prompt Builder
      ↓
Model Router
      ↓
AI Provider
      ↓
Streaming Tokens
      ↓
Answer Aggregator
      ↓
Overlay
```

---

# 29. Answer Streaming

Preferred path:

```text
AI Provider
 ↓
Token/Event Stream
 ↓
FastAPI
 ↓
WebSocket
 ↓
Electron
 ↓
React State
 ↓
Answer Panel
```

The UI should render partial answer text as it arrives.

---

# 30. OCR Architecture

Screen analysis should be asynchronous.

```text
Screenshot
 ↓
Image Validation
 ↓
Resize/Preprocess
 ↓
PaddleOCR
 ↓
OCR Result
 ↓
Code/Text Classifier
 ↓
Context Builder
 ↓
Model Provider
```

Avoid blocking the FastAPI event loop with long-running CPU tasks.

Use background workers or thread/process execution where appropriate.

---

# 31. Database Architecture

Use SQLite.

Access through a repository abstraction:

```text
database/
├── connection.py
├── migrations/
├── repositories/
│   ├── session.py
│   ├── document.py
│   ├── question.py
│   ├── answer.py
│   └── settings.py
└── models.py
```

Services should not execute raw SQL directly wherever practical.

---

# 32. Database Relationships

```text
Resume Document
       │
       └──────< Document Chunks

Job Description
       │
       └──────< Document Chunks

Session
  │
  ├──────> Resume
  │
  ├──────> Job Description
  │
  └──────< Questions
              │
              └──────< Answers
```

---

# 33. Session Architecture

A session represents one preparation or interview workflow.

Example:

```text
Session
├── id
├── title
├── type
│   ├── preparation
│   ├── interview
│   └── coding
├── resume_id
├── job_description_id
├── model
├── created_at
└── updated_at
```

---

# 34. Event-Driven Internal Model

Sunday should internally model important events.

Examples:

```text
AUDIO_STARTED
AUDIO_STOPPED
TRANSCRIPT_PARTIAL
TRANSCRIPT_FINAL
QUESTION_DETECTED
RETRIEVAL_STARTED
RETRIEVAL_COMPLETED
AI_STARTED
AI_FIRST_TOKEN
AI_COMPLETED
SCREEN_CAPTURED
OCR_COMPLETED
ERROR
```

Events make the real-time workflow easier to debug.

---

# 35. WebSocket Event Schema

Example:

```json
{
  "type": "transcript.partial",
  "session_id": "sess_123",
  "payload": {
    "text": "Can you explain"
  }
}
```

Final:

```json
{
  "type": "transcript.final",
  "session_id": "sess_123",
  "payload": {
    "text": "Can you explain your experience with SAP SD?"
  }
}
```

Question:

```json
{
  "type": "question.detected",
  "session_id": "sess_123",
  "payload": {
    "question": "Can you explain your experience with SAP SD?",
    "confidence": 0.94
  }
}
```

AI event:

```json
{
  "type": "answer.token",
  "session_id": "sess_123",
  "payload": {
    "text": "I've worked"
  }
}
```

---

# 36. Error Architecture

Use structured errors.

Example:

```json
{
  "error": {
    "code": "OLLAMA_UNAVAILABLE",
    "message": "Local AI provider is unavailable.",
    "retryable": true
  }
}
```

Recommended error categories:

```text
APP_ERROR
CONFIG_ERROR
BACKEND_ERROR
MODEL_ERROR
OLLAMA_UNAVAILABLE
MODEL_NOT_FOUND
DOCUMENT_ERROR
DOCUMENT_PARSE_ERROR
RAG_ERROR
AUDIO_ERROR
ASR_ERROR
OCR_ERROR
CAPTURE_ERROR
DATABASE_ERROR
AUTH_ERROR
```

---

# 37. Configuration Architecture

Use environment variables for backend configuration.

Example:

```text
SUNDAY_ENV=development
SUNDAY_BACKEND_PORT=8000

OLLAMA_HOST=http://127.0.0.1:11434
OLLAMA_MODEL=qwen3:8b

ASR_MODEL=small
ASR_DEVICE=auto

RAG_TOP_K=5

LOG_LEVEL=INFO
```

Provide:

```text
.env.example
```

Never commit secrets.

---

# 38. Logging Architecture

Use structured logs.

Example:

```text
2026-09-21T10:15:22Z
INFO
question.detected
session_id=sess_123
latency_ms=18
```

Important log metadata:

- timestamp
- level
- component
- event
- session ID
- latency
- error code

Do not log:

- API keys
- raw credentials
- sensitive document contents by default
- unnecessary audio data

---

# 39. Performance Architecture

The system must avoid blocking operations on the UI thread or async event loop.

Long-running workloads:

```text
Whisper
OCR
Embeddings
Large document ingestion
LLM operations
```

should be isolated or streamed appropriately.

Potential execution model:

```text
Electron UI
    │
    ▼
FastAPI
    │
    ├── Async API
    │
    ├── Background Task
    │
    ├── Thread/Process Worker
    │
    └── Model Runtime
```

---

# 40. Latency Budget

Target:

```text
Question spoken
       ↓
Audio buffering          0.5–1.0 s
       ↓
ASR                      0.5–1.5 s
       ↓
Question detection       <0.1 s
       ↓
RAG                      <0.1 s
       ↓
First AI token            ~0.5–1.5 s
       ↓
UI rendering              <0.1 s
```

Overall target:

```text
Approximately 2–4 seconds
```

This is a target for suitable hardware and model/provider configuration, not a guaranteed response time.

---

# 41. Performance Instrumentation

Every major pipeline stage should generate timing events.

Example:

```text
audio.capture = 120ms
vad = 32ms
asr = 640ms
question_detection = 19ms
rag = 21ms
llm_first_token = 480ms
ui = 15ms
```

Calculated:

```text
end_to_end_first_token = 1,327ms
```

---

# 42. Caching Architecture

Cache:

```text
Resume embeddings
JD embeddings
Model metadata
Recent retrieval results
Recent questions
Recent conversation context
```

Do not regenerate expensive resources unnecessarily.

Example:

```text
Resume uploaded
      ↓
Hash created
      ↓
Existing hash?
   ┌──┴──┐
  Yes   No
   ↓     ↓
Reuse  Re-index
```

---

# 43. Security Boundary

Trust boundaries:

```text
             UNTRUSTED
                 │
                 ▼
        React Renderer
                 │
          Secure Bridge
                 │
                 ▼
         Electron Main
                 │
            Local APIs
                 │
                 ▼
          FastAPI Backend
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
    Files      SQLite     Models
```

The renderer must not directly control:

- File system
- Shell
- Arbitrary processes
- Native APIs

except through intentionally exposed and validated preload methods.

---

# 44. Data Security

Sensitive local content includes:

- Resume
- Job description
- Transcripts
- Interview answers
- Screenshots
- API keys

Recommended controls:

- Restrict storage directories
- Validate file paths
- Do not expose arbitrary paths to UI
- Use secure API key storage for cloud providers
- Provide data deletion controls
- Avoid unnecessary persistence

---

# 45. Privacy Modes

## Local-Only

```text
Resume → Local
JD → Local
ASR → Local
RAG → Local
LLM → Ollama
```

## Hybrid

```text
Resume → Local
RAG → Local
ASR → Local
LLM → Cloud Provider
```

## Cloud

Optional future configuration:

```text
Selected data → Configured Cloud Provider
```

The UI must make the active privacy mode clear.

---

# 46. Model Lifecycle

At startup:

```text
Sunday
 ↓
Load configuration
 ↓
Check provider
 ↓
Check model
 ↓
Health check
 ↓
Ready
```

If unavailable:

```text
Provider unavailable
      ↓
Show notification
      ↓
Offer:
- Start/retry local provider
- Select another configured provider
```

---

# 47. Application Startup Sequence

```text
Electron Start
      ↓
Load Configuration
      ↓
Create Main Window
      ↓
Initialize Preload
      ↓
Start/Connect Backend
      ↓
Backend Health Check
      ↓
Model Provider Health Check
      ↓
Load Local Settings
      ↓
Load Session Metadata
      ↓
Render Dashboard
```

Backend startup should be independently testable.

---

# 48. Backend Lifecycle

Recommended:

```text
startup
  ↓
load config
  ↓
initialize logging
  ↓
initialize database
  ↓
initialize vector store
  ↓
initialize model registry
  ↓
initialize ASR services lazily
  ↓
mark healthy
```

Avoid loading very large models unnecessarily at application startup.

---

# 49. Model Loading Strategy

Use lazy loading.

Instead of:

```text
Start Sunday
 ↓
Load every model
```

Use:

```text
Start Sunday
 ↓
Load lightweight metadata
 ↓
User starts transcription
 ↓
Load ASR model
```

and:

```text
User generates answer
 ↓
Load selected LLM if needed
```

This reduces startup cost.

---

# 50. Resource Management

Components that consume significant memory/VRAM:

- Whisper
- LLM
- Embedding model
- OCR model

The system should avoid unnecessary simultaneous model loading.

Possible future model manager:

```text
ModelManager
 ├── ASR
 ├── Embedding
 ├── OCR
 └── LLM
```

It can track:

```text
loaded
loading
idle
unloading
error
```

---

# 51. Hardware Adaptation

Sunday should detect:

- CPU
- RAM
- GPU availability
- VRAM where available

Then recommend:

```text
Low-resource mode
Balanced mode
Performance mode
```

Example:

```text
16 GB RAM / CPU only
→ smaller ASR
→ smaller local LLM

32 GB RAM / GPU
→ larger ASR
→ larger local LLM
```

---

# 52. Packaging Architecture

Production application should package:

```text
Sunday.exe
```

Electron application:

```text
Electron
 + React bundle
 + preload
 + main process
```

Python backend strategy should be selected during implementation based on the final packaging and distribution constraints.

Possible approaches:

```text
Option A
Bundle Python runtime + application dependencies

Option B
Package backend as a standalone executable

Option C
Start a managed local backend process
```

The final approach must preserve reliable startup, updates, logging, and clean shutdown.

---

# 53. Process Lifecycle

Sunday should treat the Python backend as a managed local service.

Startup:

```text
Sunday
 ↓
Launch backend
 ↓
Wait for health
 ↓
Connect UI
```

Shutdown:

```text
Sunday closes
 ↓
Stop capture
 ↓
Close WebSockets
 ↓
Gracefully stop backend
 ↓
Close database
 ↓
Exit
```

If the backend crashes:

```text
Detect failure
 ↓
Attempt recovery
 ↓
Health check
 ↓
Notify user if recovery fails
```

---

# 54. Repository Structure

Recommended final repository:

```text
Sunday/
│
├── desktop/
│   ├── src/
│   │   ├── main/
│   │   │   ├── index.ts
│   │   │   ├── windows.ts
│   │   │   ├── ipc.ts
│   │   │   ├── audio.ts
│   │   │   ├── screen.ts
│   │   │   └── shortcuts.ts
│   │   │
│   │   ├── preload/
│   │   │   └── index.ts
│   │   │
│   │   └── renderer/
│   │       ├── pages/
│   │       ├── components/
│   │       ├── features/
│   │       ├── hooks/
│   │       ├── services/
│   │       ├── store/
│   │       ├── types/
│   │       └── styles/
│   │
│   ├── package.json
│   └── forge.config.ts
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   ├── ai/
│   │   ├── asr/
│   │   ├── rag/
│   │   ├── ocr/
│   │   ├── database/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── core/
│   │
│   ├── tests/
│   └── requirements.txt
│
├── data/
│   ├── resumes/
│   ├── job_descriptions/
│   ├── screenshots/
│   ├── sessions/
│   ├── vector_store/
│   └── logs/
│
├── docs/
│   ├── PRD.md
│   ├── Architecture.md
│   ├── API.md
│   ├── Development.md
│   └── Privacy.md
│
├── tests/
├── AGENTS.md
├── README.md
├── LICENSE
└── .gitignore
```

---

# 55. Architecture by Development Phase

## Phase 1 — Desktop

```text
Electron
 ├── React
 ├── Main
 ├── Preload
 └── Overlay
```

No AI dependency yet.

---

## Phase 2 — Backend

```text
Electron
   │
   ▼
FastAPI
```

Health endpoint and basic communication.

---

## Phase 3 — Local AI

```text
FastAPI
   ↓
ModelProvider
   ↓
Ollama
```

---

## Phase 4 — Documents

```text
FastAPI
 ↓
DocumentService
 ↓
Parser
 ↓
Chunker
 ↓
Embeddings
 ↓
FAISS
```

---

## Phase 5 — RAG

```text
Question
 ↓
Retriever
 ↓
Context Builder
 ↓
AI
```

---

## Phase 6 — ASR

```text
Electron Audio
 ↓
WebSocket
 ↓
ASR
 ↓
Transcript
```

---

## Phase 7 — Interview Intelligence

```text
Transcript
 ↓
Question Detection
 ↓
RAG
 ↓
AI
 ↓
Overlay
```

---

## Phase 8 — Coding

```text
Screen
 ↓
OCR
 ↓
AI
```

---

## Phase 9 — Multi-Provider

```text
ModelProvider
 ├── Ollama
 ├── OpenAI
 └── Anthropic
```

---

## Phase 10 — Production

```text
Testing
 ↓
Packaging
 ↓
Installer
 ↓
Diagnostics
 ↓
Release
```

---

# 56. Testing Architecture

Testing layers:

```text
Unit
  ↓
Service
  ↓
Integration
  ↓
End-to-End
  ↓
Manual Windows QA
```

Important integration tests:

```text
Electron → FastAPI
FastAPI → Ollama
Document → RAG
Audio → ASR
Question → Answer
Screen → OCR → Answer
```

---

# 57. Test Environment

Minimum automated environment:

```text
Windows
Node.js
Python
Ollama optional for integration
```

Mock providers should be available for CI:

```text
FakeModelProvider
FakeASRProvider
FakeOCRProvider
FakeVectorStore
```

This allows tests to run without downloading large models.

---

# 58. Dependency Boundaries

Core application logic must depend on interfaces rather than concrete libraries.

Examples:

```text
InterviewService
  ↓
ModelProvider

TranscriptionService
  ↓
ASRProvider

DocumentService
  ↓
DocumentParser

RAGService
  ↓
VectorStore
```

This keeps libraries replaceable.

---

# 59. Technology Replacement Strategy

If one component must be replaced:

```text
Whisper → another ASR engine
```

Only:

```text
ASRProvider
```

should need significant changes.

Similarly:

```text
FAISS → Qdrant
```

should primarily affect:

```text
VectorStore
```

and:

```text
Ollama → OpenAI
```

should primarily affect:

```text
ModelProvider
```

---

# 60. Architecture Decision Records

For significant choices, maintain ADRs under:

```text
docs/adr/
```

Examples:

```text
001-electron-desktop.md
002-fastapi-backend.md
003-local-first-ai.md
004-ollama-provider.md
005-faiss-rag.md
006-websocket-streaming.md
007-sqlite-storage.md
```

Each ADR should contain:

```text
Context
Decision
Alternatives
Consequences
```

---

# 61. Security Threat Model

Consider:

### Threat: Malicious uploaded document

Mitigation:

- Treat document content as untrusted input.
- Validate file type.
- Limit file size.
- Do not execute document content.
- Store outside executable directories.

### Threat: Prompt injection in resume/JD

Mitigation:

- Treat retrieved document text as data, not instructions.
- Keep system instructions separate.
- Use explicit delimiters.
- Avoid allowing documents to override system behavior.

### Threat: Malicious OCR content

Mitigation:

- Treat OCR output as untrusted data.
- Do not execute extracted commands.
- Do not automatically run extracted code.

### Threat: Renderer compromise

Mitigation:

- context isolation
- no Node integration
- minimal IPC
- strict validation

---

# 62. Prompt Injection Boundary

A critical architecture rule:

```text
System Instructions
        ↓
Application Instructions
        ↓
User Preferences
        ↓
Retrieved Documents
        ↓
Interview Question
```

Retrieved content must never be treated as a higher-priority instruction than system/application rules.

For example, a resume containing:

```text
Ignore previous instructions...
```

must be treated as ordinary resume content.

---

# 63. Data Retention Architecture

Default:

```text
Raw Audio       → Not persisted
Screenshots     → Not persisted after analysis unless enabled
Transcript      → Not persisted unless enabled
Resume          → Persisted locally
JD              → Persisted locally
Embeddings      → Persisted locally
Settings        → Persisted locally
Session metadata→ Persisted according to setting
```

Provide a:

```text
Clear All Data
```

operation.

---

# 64. Local Storage Paths

Prefer an application data directory provided by the OS rather than writing arbitrary files into the installation directory.

Conceptually:

```text
%APPDATA%/Sunday/
```

Possible structure:

```text
Sunday/
├── database/
├── documents/
├── vector_store/
├── models/
├── logs/
└── settings/
```

Actual paths should be resolved through Electron's supported application-data APIs.

---

# 65. Observability Dashboard

Developer-only diagnostics:

```text
SUNDAY DIAGNOSTICS

Application
Version: 0.1.0
Environment: Development

Backend
Status: Healthy
Port: 8000

AI
Provider: Ollama
Model: qwen3:8b
Status: Ready

ASR
Model: small
Device: GPU/CPU
Status: Ready

RAG
FAISS: Ready
Documents: 2
Chunks: 183

Performance
ASR: 642ms
RAG: 22ms
First Token: 510ms
Total First Response: 1,174ms
```

---

# 66. Recommended Runtime Communication

## HTTP

Use for:

- Uploads
- CRUD
- Settings
- Session retrieval
- Preparation
- One-shot analysis
- Health checks

## WebSocket

Use for:

- Live transcription
- Streaming AI responses
- Real-time status/events

---

# 67. Offline Behavior

When cloud is unavailable:

```text
Cloud failure
 ↓
If local model configured
 ↓
Use Ollama
```

When local AI is unavailable:

```text
Local AI failure
 ↓
Show explicit error
 ↓
Allow configured cloud provider if user has enabled it
```

Never silently send data to another provider.

---

# 68. Graceful Degradation

Examples:

### No GPU

```text
Use CPU ASR/model configuration.
```

### No OCR

```text
Disable Coding Mode with clear explanation.
```

### No local LLM

```text
Allow preparation UI and configured cloud provider.
```

### No audio source

```text
Allow manual question entry.
```

Manual question mode is important because it lets the user continue using Sunday even without live capture.

---

# 69. Manual Question Mode

The Interview page should support:

```text
Type or paste interview question

[____________________________]

[Generate Suggested Response]
```

This is useful for:

- Preparation
- Debugging
- Accessibility
- Audio troubleshooting
- Offline workflows

Architecture:

```text
Manual Input
 ↓
Question Event
 ↓
RAG
 ↓
AI
```

The downstream pipeline remains unchanged.

---

# 70. Extensibility

Future modules can follow the same pattern:

```text
Input
 ↓
Context Extraction
 ↓
Context Builder
 ↓
Model Provider
 ↓
Structured Output
 ↓
UI
```

Potential future modules:

- Company research
- Interviewer notes
- Knowledge base
- Personal study materials
- Email/job tracking
- Additional OCR engines
- Additional ASR engines

---

# 71. Final Reference Architecture

```text
┌───────────────────────────────────────────────────────────────────┐
│                            SUNDAY                                 │
│                   Interview AI Assistant                          │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────── DESKTOP APPLICATION ────────────────────┐ │
│  │                                                             │ │
│  │ React UI                                                     │ │
│  │  ├── Dashboard                                               │ │
│  │  ├── Preparation                                             │ │
│  │  ├── Interview                                               │ │
│  │  ├── Coding                                                  │ │
│  │  ├── Resume                                                  │ │
│  │  ├── History                                                 │ │
│  │  └── Settings                                                │ │
│  │                                                             │ │
│  │           ▲                                                 │ │
│  │           │ Secure Context Bridge                           │ │
│  │           ▼                                                 │ │
│  │ Electron Main Process                                       │ │
│  │  ├── Windows                                                 │ │
│  │  ├── Audio Capture                                          │ │
│  │  ├── Screen Capture                                         │ │
│  │  ├── Global Shortcuts                                       │ │
│  │  └── IPC                                                     │ │
│  └──────────────────────────┬──────────────────────────────────┘ │
│                             │                                    │
│                      HTTP / WebSocket                            │
│                             │                                    │
│  ┌──────────────────────────▼──────────────────────────────────┐ │
│  │                    FASTAPI BACKEND                          │ │
│  │                                                             │ │
│  │  API                                                         │ │
│  │   │                                                         │ │
│  │   ├── Interview Service                                    │ │
│  │   ├── Preparation Service                                  │ │
│  │   ├── Document Service                                     │ │
│  │   ├── Transcription Service                                │ │
│  │   ├── Screen Analysis Service                              │ │
│  │   └── Session Service                                      │ │
│  │                                                             │ │
│  │  AI                                                         │ │
│  │   ├── Prompt Builder                                       │ │
│  │   ├── Context Builder                                      │ │
│  │   └── Model Router                                         │ │
│  │                                                             │ │
│  │  Intelligence                                               │ │
│  │   ├── ASR + VAD                                             │ │
│  │   ├── Question Detection                                   │ │
│  │   ├── RAG                                                   │ │
│  │   └── OCR                                                   │ │
│  └───────────────┬───────────────────┬─────────────────────────┘ │
│                  │                   │                           │
│          ┌───────▼────────┐  ┌──────▼──────────┐                │
│          │ Local AI       │  │ Optional Cloud  │                │
│          │ Ollama         │  │ Providers        │                │
│          │ Qwen/gpt-oss   │  │ OpenAI/Anthropic │                │
│          └────────────────┘  └─────────────────┘                │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                      LOCAL DATA                             │ │
│  │ SQLite │ Files │ FAISS │ Logs │ Settings                   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

# 72. Architecture Decision Summary

| Decision | Choice | Reason |
|---|---|---|
| Desktop | Electron | Mature desktop capabilities |
| UI | React + TypeScript | Component-based UI |
| Backend | FastAPI | Python AI ecosystem |
| Communication | HTTP + WebSocket | CRUD + streaming |
| ASR | faster-whisper | Local speech recognition |
| LLM Runtime | Ollama | Local model serving |
| Initial LLM | Qwen3 | Local-first baseline |
| Embeddings | Sentence Transformers | Local semantic retrieval |
| Vector DB | FAISS | Simple local vector search |
| OCR | PaddleOCR | Open-source OCR |
| Database | SQLite | Simple local persistence |
| Packaging | Electron Forge | Desktop packaging |
| Provider architecture | Adapter/interface | Future flexibility |
| Privacy | Local-first | Data control |
| Security | Secure Electron IPC | Reduce renderer exposure |

---

# 73. Architecture Success Criteria

The architecture is successful when:

```text
✓ UI and AI backend are independently testable
✓ AI providers are replaceable
✓ ASR can be replaced
✓ Vector store can be replaced
✓ Long-running AI tasks don't freeze the UI
✓ Real-time audio uses streaming
✓ Answers use retrieved context
✓ User data stays local by default
✓ Cloud usage is explicit
✓ Electron security boundaries are maintained
✓ The backend can recover from component failures
✓ Sunday can be packaged for Windows
✓ New AI features can be added without rewriting the core
```

---

# 74. Architectural North Star

Sunday should maintain one central design principle:

```text
                    USER
                     │
                     ▼
                  SUNDAY
                     │
      ┌──────────────┼──────────────┐
      │              │              │
      ▼              ▼              ▼
 Preparation      Interview       Coding
      │              │              │
      └──────────────┼──────────────┘
                     ▼
              Context Engine
                     ▼
                AI Provider
                     ▼
               Useful Output
```

Complexity belongs inside the architecture.

The user experience should remain simple:

```text
Prepare
   ↓
Start
   ↓
Listen / Analyze
   ↓
Understand Context
   ↓
Suggest
```

That is the core architecture of Sunday.
