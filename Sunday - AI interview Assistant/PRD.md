# PRD — Sunday
## An Interview AI Assistant

**Document Status:** Draft  
**Version:** 1.0  
**Product Name:** Sunday  
**Product Tagline:** Your AI Interview Assistant  
**Target Platform:** Windows 10/11  
**Primary Product Type:** Desktop AI application  
**Primary Development Stack:** Electron + React + TypeScript + Python + FastAPI + Ollama

---

## 1. Product Overview

Sunday is a Windows-first desktop AI interview assistant designed to help users prepare for and navigate technical, behavioral, and coding interviews.

Sunday combines:

- Interview preparation
- Resume understanding
- Job-description understanding
- Retrieval-Augmented Generation (RAG)
- Live speech-to-text
- Interview question detection
- AI-generated suggested responses
- Coding/screen analysis
- Local AI models
- Optional cloud AI providers
- Session history
- Privacy-focused local processing

The product should be designed as a **local-first application**. The default experience should use local storage and local AI wherever practical.

Sunday should provide useful answers quickly while preserving the user's control over what is captured, stored, displayed, and sent to cloud providers.

### Product principle

> Sunday should reduce the work required to prepare for an interview and provide relevant, grounded response suggestions using the user's own resume, job description, and interview context.

Sunday must not implement process hiding, operating-system monitoring evasion, detection bypasses, or similar stealth functionality.

Users should use live interview assistance only where the relevant interview, employer, institution, platform, and local rules permit it.

---

# 2. Problem Statement

Interview candidates often have to manage multiple information sources at once:

- Their resume
- The job description
- Technical concepts
- Previous answers
- Interview questions
- Coding problems
- Notes and preparation material

During preparation, this creates unnecessary manual work.

During interviews, users may also struggle to quickly retrieve relevant details from their own experience, especially when questions are broad, technical, or require examples.

Sunday addresses this by creating a unified workflow:

```text
Resume + Job Description + Interview Context
                    ↓
               Sunday AI
                    ↓
       Relevant Response Suggestions
```

For technical interviews:

```text
Screen / Code + Question
          ↓
       Sunday AI
          ↓
     Analysis / Guidance
```

---

# 3. Goals

## 3.1 Primary Goals

### G1 — Interview Preparation

Allow users to upload a resume and job description and receive:

- Likely interview questions
- Resume-based questions
- Technical questions
- Behavioral questions
- Job-specific questions
- Suggested answer structures
- Preparation topics
- Potential follow-up questions

### G2 — Resume-Aware AI

Sunday must ground AI responses in the user's uploaded resume.

The system should prefer known user information over generic assumptions.

### G3 — Job-Aware AI

Sunday must understand the job description and use it to make responses relevant to the target role.

### G4 — Real-Time Transcription

Provide low-latency speech-to-text for supported desktop audio sources.

### G5 — Question Detection

Identify likely interview questions from live transcript data and avoid triggering AI generation for irrelevant speech.

### G6 — Suggested Responses

Generate concise, context-aware response suggestions using:

- Resume
- Job description
- Current question
- Recent interview context
- Optional screen/code context

### G7 — Coding/Screenshot Assistance

Allow the user to explicitly analyze a selected screen or screenshot and receive:

- Code extraction
- Language identification
- Approach
- Complexity
- Potential issues
- Suggested improvements
- Explanation

### G8 — Local-First AI

Provide a fully local baseline using:

- Ollama
- Qwen3 and/or another locally available supported model
- faster-whisper
- local vector search
- local SQLite storage

### G9 — Provider Flexibility

Create a model-provider abstraction so Sunday can support:

- Ollama
- OpenAI
- Anthropic
- Future providers

without changing core application logic.

### G10 — Desktop Product Quality

Sunday should feel like a polished desktop application rather than an administrative web panel.

---

# 4. Non-Goals

The following are explicitly out of scope for the initial product:

- Mobile applications
- Browser extensions
- Multi-user enterprise administration
- Billing/subscription management
- Kubernetes/cloud deployment
- Distributed backend infrastructure
- Voice cloning
- Facial analysis
- Emotion detection
- Permanent recording by default
- Process hiding
- Activity-monitor evasion
- Monitoring bypass
- Detection bypass
- Circumventing platform security or controls
- Automatic participation in an interview
- Automatically sending messages or answers to interview platforms

---

# 5. Target Users

## 5.1 Primary User

A job candidate preparing for:

- Software engineering interviews
- QA/testing interviews
- Automation interviews
- SAP interviews
- Data/analytics interviews
- Product/technical roles
- Behavioral interviews
- Coding interviews

## 5.2 Secondary Users

Users who want:

- Resume-based mock interviews
- Job-specific preparation
- Personal interview practice
- Coding explanation
- Technical concept preparation

---

# 6. User Personas

## Persona A — Interview Candidate

Needs:

- Fast access to resume facts
- Role-specific preparation
- Concise answer suggestions
- Easy desktop workflow

Pain points:

- Searching resume manually
- Remembering project details
- Understanding what the job description emphasizes
- Structuring responses under pressure

## Persona B — Technical Interview Candidate

Needs:

- Coding explanation
- Screen analysis
- Complexity analysis
- Technical concept suggestions

## Persona C — Interview Preparation User

Needs:

- Mock interviews
- Question banks
- Follow-up questions
- Targeted preparation plan

---

# 7. Product Modes

Sunday will have three primary product modes.

## 7.1 Preparation Mode

Purpose:

Prepare for an upcoming interview.

Inputs:

- Resume
- Job description
- Optional company information
- Optional notes

Outputs:

- Likely questions
- Suggested answers
- Technical topics
- Behavioral topics
- Resume-specific questions
- Follow-up questions
- Preparation checklist

---

## 7.2 Interview Mode

Purpose:

Provide real-time transcription and response suggestions where use is permitted.

Flow:

```text
Audio
  ↓
Speech-to-Text
  ↓
Question Detection
  ↓
Resume/JD Retrieval
  ↓
Prompt Construction
  ↓
AI Provider
  ↓
Suggested Response
```

---

## 7.3 Coding Mode

Purpose:

Analyze an explicitly selected screen, screenshot, or coding problem.

Flow:

```text
Screen/Screenshot
      ↓
OCR / Text Extraction
      ↓
Code Detection
      ↓
AI Analysis
      ↓
Coding Guidance
```

---

# 8. User Journey

## 8.1 First Run

User launches Sunday.

They see:

```text
Sunday

Your AI Interview Assistant

[Prepare for Interview]
[Start Interview]
```

They may optionally configure:

- AI model
- Local-only mode
- Resume
- Default preferences

---

## 8.2 Prepare for Interview

1. User selects Preparation Mode.
2. User uploads resume.
3. Sunday extracts and indexes resume.
4. User uploads job description.
5. Sunday extracts and indexes job description.
6. Sunday creates a structured candidate/job profile.
7. User requests preparation.
8. Sunday generates questions and preparation material.

---

## 8.3 Start Interview Session

1. User chooses Interview Mode.
2. User selects resume/profile.
3. User selects job description/profile.
4. User selects AI model.
5. User starts audio capture.
6. Sunday displays live transcript.
7. Sunday identifies likely questions.
8. Sunday retrieves relevant context.
9. Sunday generates suggested response.
10. Response streams into the UI.

---

## 8.4 Coding Session

1. User enters Coding Mode.
2. User selects a screen/window or screenshot.
3. Sunday captures or receives the image.
4. OCR extracts visible text/code.
5. Sunday analyzes the extracted content.
6. Sunday displays coding guidance.

---

# 9. Functional Requirements

## FR-001 — Application Startup

Sunday must:

- Start successfully on supported Windows systems.
- Load configuration.
- Verify backend availability.
- Verify configured local AI provider where applicable.
- Display clear startup errors.

### Acceptance Criteria

- Application launches without a terminal.
- User receives a clear error when required services are unavailable.
- The main dashboard loads.

---

## FR-002 — Dashboard

The dashboard must provide:

- Start Interview
- Prepare for Interview
- Recent Sessions
- Settings
- Resume management
- Job description management

### Acceptance Criteria

All primary navigation paths are accessible within two clicks from the dashboard.

---

## FR-003 — Resume Upload

Supported formats:

- PDF
- DOCX
- TXT

Sunday must:

1. Accept the file.
2. Extract text.
3. Clean text.
4. Identify sections.
5. Chunk content.
6. Generate embeddings.
7. Store metadata.
8. Build/update vector index.

### Acceptance Criteria

A valid resume can be uploaded and becomes searchable.

---

## FR-004 — Job Description Upload

Supported formats:

- PDF
- DOCX
- TXT

Sunday must extract:

- Role
- Responsibilities
- Skills
- Technologies
- Experience requirements
- Preferred qualifications where detectable

### Acceptance Criteria

A valid job description becomes searchable and usable by the AI response pipeline.

---

## FR-005 — RAG Retrieval

Sunday must implement semantic retrieval.

Input:

```text
Question
```

Output:

```text
Relevant resume chunks
Relevant JD chunks
Metadata
Relevance scores
```

The complete resume should not be sent in every prompt.

---

## FR-006 — Local LLM Integration

Sunday must support a local model through Ollama.

Initial default:

```text
qwen3:8b
```

The exact model should remain configurable.

Capabilities:

- Chat
- Streaming
- Health check
- Model selection
- Error handling
- Timeout handling

---

## FR-007 — Model Provider Abstraction

Create:

```text
ModelProvider
```

with methods conceptually equivalent to:

```text
chat()
stream()
health()
model_info()
```

Initial providers:

```text
OllamaProvider
OpenAIProvider
AnthropicProvider
```

Cloud providers may remain optional.

---

## FR-008 — Live Audio Capture

Sunday must support desktop/system audio capture on supported Windows configurations.

The user must be able to:

- Start capture
- Stop capture
- See capture status
- Handle capture errors

Raw audio must not be persistently stored unless explicitly enabled by the user.

---

## FR-009 — Speech-to-Text

Initial technology:

```text
faster-whisper
```

The transcription system should support:

- Streaming/rolling audio buffers
- Voice activity detection
- Partial transcript
- Final transcript
- Timestamps
- Configurable model size
- CPU fallback
- GPU acceleration where available

---

## FR-010 — Question Detection

Sunday should identify likely questions using a combination of:

- Transcript completion
- Pause detection
- Question patterns
- Contextual classification where useful

Sunday should not trigger a new AI response for every partial transcript fragment.

The system must avoid duplicate triggers.

---

## FR-011 — Suggested Response Generation

When a likely question is detected:

1. Retrieve relevant resume content.
2. Retrieve relevant job-description content.
3. Include recent interview context.
4. Build grounded prompt.
5. Send to selected AI provider.
6. Stream response.
7. Display response in the UI.

Output should contain:

```text
Suggested Response
Key Points
Optional Follow-Up
```

---

## FR-012 — Response Grounding

Sunday must follow these response rules:

- Never invent experience.
- Never fabricate employers.
- Never fabricate certifications.
- Never fabricate project history.
- Prefer supplied resume data.
- Clearly indicate when information is unavailable.
- Keep answers concise by default.
- Match the requested role where supported by evidence.

---

## FR-013 — Screen Capture

Sunday must allow explicit screen/window capture for Coding Mode.

The user should be able to:

- Capture selected source
- Capture screenshot
- Start analysis
- Stop analysis

Continuous recording should not be enabled by default.

---

## FR-014 — OCR

Initial OCR technology:

```text
PaddleOCR
```

The system should attempt to identify:

- Human-readable text
- Code
- Programming language
- Visible problem statements

---

## FR-015 — Coding Analysis

The AI should provide, where appropriate:

- Problem interpretation
- Approach
- Complexity
- Potential issue
- Suggested improvement
- Explanation
- Example code only when requested or useful

---

## FR-016 — Overlay

The overlay must support:

- Always-on-top option
- Compact mode
- Dragging
- Resizing
- Show/hide
- Live question
- Live transcript
- Suggested response
- Key points
- AI model
- Latency

---

## FR-017 — Keyboard Shortcuts

Initial suggested shortcuts:

```text
Ctrl + Space
Show/Hide Sunday

Ctrl + Shift + A
Start/Stop Audio

Ctrl + Shift + S
Analyze Screen

Ctrl + Shift + R
Regenerate Response

Ctrl + Shift + M
Switch Model
```

Users should eventually be able to customize shortcuts.

---

## FR-018 — Session History

A session should store, depending on settings:

- Session name
- Date/time
- Questions
- Answers
- Model
- Latency
- Resume used
- Job description used

Transcript persistence must be controlled through a privacy setting.

---

## FR-019 — Preparation

Preparation mode must support:

- Resume-based questions
- JD-based questions
- Technical questions
- Behavioral questions
- Suggested answers
- Follow-up questions
- Preparation checklist

---

## FR-020 — Mock Interview

Sunday should support a preparation-only mock interview.

The mock interview should:

1. Ask questions.
2. Receive the user's response.
3. Analyze the response.
4. Identify missing points.
5. Provide improvement suggestions.
6. Ask a follow-up question.

---

## FR-021 — Settings

Settings should include at minimum:

### AI

- Model
- Response length
- Response style
- Provider

### Interview

- Auto question detection
- Transcript display
- Key points display

### Capture

- Audio capture
- Screen analysis

### Privacy

- Local-only mode
- Save transcript
- Save session history
- Clear stored data

### Appearance

- Theme
- Overlay enabled
- Overlay size

---

# 10. Non-Functional Requirements

## NFR-001 — Performance

Target perceived response experience:

```text
Audio → Transcript → Question → First AI Token
```

Target:

```text
Approximately 2–4 seconds under suitable hardware/network/model conditions.
```

The system should measure latency for each stage rather than treating 2–4 seconds as a guaranteed universal limit.

---

## NFR-002 — Responsiveness

The UI must remain responsive while:

- Transcription runs
- RAG runs
- AI generates
- OCR runs
- Screen processing occurs

Heavy workloads must not block the Electron renderer.

---

## NFR-003 — Reliability

The application should gracefully handle:

- AI provider unavailable
- Ollama not running
- Model missing
- Audio capture failure
- OCR failure
- Invalid documents
- Backend unavailable
- Network failure
- Corrupt files

---

## NFR-004 — Security

Electron requirements:

```text
contextIsolation = true
nodeIntegration = false
```

Other expectations:

- Secure preload bridge
- Minimal IPC exposure
- No secrets in source code
- Environment-based configuration
- Secure cloud API key storage
- Validate external input
- Avoid arbitrary shell execution from renderer

---

## NFR-005 — Privacy

Default behavior:

- Local-first
- No telemetry by default
- No raw audio retention by default
- Local document storage
- Local vector index
- Local SQLite database
- Explicit cloud-provider configuration

---

## NFR-006 — Maintainability

Requirements:

- Modular architecture
- Clear service boundaries
- Unit tests
- Integration tests
- Typed interfaces
- Documented APIs
- Centralized configuration

---

## NFR-007 — Portability

Initial target:

```text
Windows 10/11
```

Future:

```text
macOS
Linux
```

Portability should influence architecture but must not delay the Windows MVP.

---

# 11. Technical Architecture

## 11.1 Desktop Layer

```text
Electron
 ├── Main Process
 ├── Preload
 └── React Renderer
```

Responsibilities:

### Main Process

- Window management
- Capture
- Global shortcuts
- IPC
- Application lifecycle

### Preload

- Secure API bridge
- Limited renderer access

### Renderer

- UI
- State
- User interactions
- WebSocket/HTTP client services

---

## 11.2 Backend Layer

FastAPI responsibilities:

```text
/api/v1/health
/api/v1/chat
/api/v1/documents
/api/v1/screen
/api/v1/preparation
```

WebSocket:

```text
/ws/transcribe
```

Potential future WebSocket:

```text
/ws/answer
```

---

## 11.3 AI Layer

```text
AI
├── providers
│   ├── base
│   ├── ollama
│   ├── openai
│   └── anthropic
│
├── prompts
│   ├── interview
│   ├── preparation
│   └── coding
│
└── router
```

---

## 11.4 RAG Layer

```text
Document
   ↓
Extraction
   ↓
Cleaning
   ↓
Chunking
   ↓
Embeddings
   ↓
FAISS
   ↓
Retrieval
```

---

## 11.5 ASR Layer

```text
Audio
 ↓
Buffer
 ↓
VAD
 ↓
faster-whisper
 ↓
Partial/Final Transcript
```

---

## 11.6 OCR Layer

```text
Screenshot
 ↓
Preprocessing
 ↓
PaddleOCR
 ↓
Text
 ↓
Code Detection
 ↓
AI
```

---

# 12. Data Model

Initial SQLite entities:

## sessions

```text
id
title
created_at
updated_at
resume_id
job_description_id
model
```

## documents

```text
id
type
filename
path
created_at
hash
```

## document_chunks

```text
id
document_id
chunk_index
text
metadata
vector_reference
```

## questions

```text
id
session_id
question
timestamp
source
```

## answers

```text
id
question_id
answer
model
latency_ms
timestamp
```

## settings

```text
key
value
updated_at
```

---

# 13. Core API Requirements

## GET /api/v1/health

Response:

```json
{
  "status": "ok"
}
```

---

## POST /api/v1/chat

Request:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Explain your experience with SAP SD."
    }
  ],
  "provider": "ollama",
  "model": "qwen3:8b"
}
```

Response:

Streaming or structured response.

---

## POST /api/v1/documents/upload

Accept:

- PDF
- DOCX
- TXT

Return:

```json
{
  "document_id": "...",
  "status": "indexed"
}
```

---

## WebSocket /ws/transcribe

Input:

```text
PCM audio chunks
```

Output:

```json
{
  "type": "partial",
  "text": "Can you explain..."
}
```

or:

```json
{
  "type": "final",
  "text": "Can you explain your experience with SAP SD?"
}
```

---

## POST /api/v1/screen/analyze

Input:

```text
image
```

Output:

```json
{
  "detected_text": "...",
  "code": "...",
  "language": "Python",
  "analysis": "..."
}
```

---

# 14. Prompt Architecture

Sunday should use structured prompts.

## Interview Prompt

Inputs:

```text
Question
Resume context
JD context
Recent context
Optional screen context
Response style
Response length
```

Output:

```json
{
  "answer": "...",
  "key_points": [
    "...",
    "..."
  ],
  "follow_up": "..."
}
```

---

## Preparation Prompt

Inputs:

```text
Resume
Job Description
Target role
Topic
```

Output:

```json
{
  "questions": [],
  "preparation_topics": [],
  "suggested_answers": []
}
```

---

## Coding Prompt

Inputs:

```text
Problem statement
Extracted code
Programming language
Screen context
```

Output:

```json
{
  "approach": "...",
  "complexity": "...",
  "issues": [],
  "improvements": [],
  "explanation": "..."
}
```

---

# 15. User Stories

## Preparation

### US-001

As a candidate, I want to upload my resume so Sunday can understand my experience.

### US-002

As a candidate, I want to upload a job description so Sunday can tailor preparation to the target role.

### US-003

As a candidate, I want Sunday to generate likely interview questions.

### US-004

As a candidate, I want to practice answers before the interview.

### US-005

As a candidate, I want follow-up questions so I can practice deeper answers.

---

## Interview

### US-006

As a user, I want to see a live transcript of supported audio.

### US-007

As a user, I want Sunday to detect likely interview questions.

### US-008

As a user, I want suggested responses based on my resume and the job description.

### US-009

As a user, I want to see key talking points rather than only a long answer.

### US-010

As a user, I want to see response latency.

---

## Coding

### US-011

As a technical candidate, I want to analyze a selected screen.

### US-012

As a technical candidate, I want Sunday to explain visible code.

### US-013

As a technical candidate, I want complexity analysis.

---

## Privacy

### US-014

As a user, I want local-only mode so my data stays on my computer wherever possible.

### US-015

As a user, I want to control transcript/session storage.

### US-016

As a user, I want to clear locally stored session data.

---

# 16. MVP Scope

The MVP is complete when the following capabilities work end-to-end:

```text
1. Sunday launches as a Windows desktop application.

2. User can upload a resume.

3. User can upload a job description.

4. Sunday indexes both documents.

5. User can ask a question.

6. Sunday retrieves relevant context.

7. Sunday generates a grounded response using local AI.

8. User can start supported live audio capture.

9. Sunday can transcribe audio.

10. Sunday can identify likely questions.

11. Sunday can generate suggested responses.

12. User can explicitly analyze a screen.

13. Sunday can perform OCR.

14. Sunday can provide coding analysis.

15. Overlay can display transcript and response.

16. User can configure model/settings.

17. Basic session history works.

18. Windows production build can be created.
```

---

# 17. Release Plan

## Sunday 0.1 — Desktop Foundation

Includes:

- Electron
- React
- TypeScript
- Dashboard
- Navigation
- Settings
- Overlay

---

## Sunday 0.2 — Local AI

Includes:

- FastAPI
- Ollama
- Local model
- Chat endpoint
- Streaming response

---

## Sunday 0.3 — Resume Intelligence

Includes:

- Resume upload
- PDF/DOCX parsing
- Embeddings
- FAISS
- Resume-aware chat

---

## Sunday 0.4 — Job Intelligence

Includes:

- JD upload
- Requirement extraction
- Resume/JD comparison
- Role-aware answers

---

## Sunday 0.5 — RAG

Includes:

- Semantic retrieval
- Context builder
- Grounded response generation
- Relevance scoring

---

## Sunday 0.6 — Live Transcription

Includes:

- Desktop/system audio
- VAD
- faster-whisper
- WebSocket
- Live transcript

---

## Sunday 0.7 — Interview Intelligence

Includes:

- Question detection
- Response generation
- Streaming answers
- Key points
- Session context

---

## Sunday 0.8 — Coding Mode

Includes:

- Screen capture
- OCR
- Code extraction
- Coding analysis

---

## Sunday 0.9 — Multi-Model

Includes:

- Provider abstraction
- Ollama
- OpenAI
- Anthropic

---

## Sunday 1.0 — Production

Includes:

- Installer
- First-run setup
- Automated tests
- Error handling
- Performance metrics
- Documentation
- Privacy controls
- Production build

---

# 18. Performance Targets

Initial target metrics:

| Metric | Target |
|---|---:|
| Desktop startup | < 5 seconds on typical system |
| UI interaction | < 100 ms perceived response |
| Document indexing | < 30 seconds for a typical resume/JD |
| RAG retrieval | < 100 ms target |
| ASR processing | As low as practical on supported hardware |
| First AI token | < 1.5 seconds target on suitable local/cloud configuration |
| Question-to-first-response experience | Approximately 2–4 seconds target |
| Memory | Avoid unnecessary unbounded growth |
| CPU/GPU | Background workloads must not freeze UI |

Targets are engineering goals, not guarantees across all hardware.

---

# 19. Error Handling

Sunday should present useful messages.

## Ollama unavailable

```text
Sunday can't reach the local AI model.

Please start Ollama or select another AI provider.
```

## Model missing

```text
The selected model isn't installed.

Install the model or select another model.
```

## Audio capture unavailable

```text
Sunday couldn't access the selected audio source.

Check Windows permissions and the selected capture source.
```

## Invalid document

```text
Sunday couldn't read this file.

Try another PDF, DOCX, or TXT file.
```

## Backend unavailable

```text
Sunday AI services are not available.

Please restart Sunday or check the local backend.
```

---

# 20. Security Requirements

## Electron

Must use:

```text
contextIsolation: true
nodeIntegration: false
```

Use a restricted preload/contextBridge.

Avoid:

- Arbitrary shell execution from renderer
- Exposing Node APIs to the renderer
- Loading untrusted remote pages
- Hard-coded secrets

---

## Cloud API Keys

Never store keys in:

```text
Git
source code
frontend bundle
plain configuration committed to repository
```

Use OS-appropriate secure storage where feasible.

---

# 21. Privacy Requirements

Default settings:

```text
Local-only mode: ON
Save transcript: OFF
Raw audio recording: OFF
Telemetry: OFF
```

The product must clearly show when data is:

- captured
- stored
- sent to a cloud provider

Cloud provider usage must be explicit in settings.

---

# 22. Observability

Developer diagnostics should track:

```text
Audio capture latency
ASR latency
Question detection latency
RAG latency
LLM time-to-first-token
LLM total generation time
UI rendering latency
Errors
Provider availability
```

A developer diagnostics screen can show:

```text
Sunday Diagnostics

Backend:        OK
Ollama:         OK
Model:          qwen3:8b
ASR:            Ready
OCR:            Ready
FAISS:          Ready

Last question latency:
1,238 ms
```

---

# 23. Testing Strategy

## Unit Tests

Test:

- Document parsing
- Chunking
- Embeddings
- Retrieval
- Prompt creation
- Question detection
- Provider abstraction
- Configuration
- Database services

## Integration Tests

Test:

```text
Electron → FastAPI
FastAPI → Ollama
Document → RAG
Audio → ASR
Question → RAG → AI
Screen → OCR → AI
```

## End-to-End Tests

Scenario:

```text
Launch Sunday
→ Upload resume
→ Upload JD
→ Start interview
→ Receive transcript
→ Detect question
→ Retrieve context
→ Generate answer
→ Display answer
```

---

# 24. Project Directory

```text
Sunday/
│
├── desktop/
│   ├── src/
│   │   ├── main/
│   │   ├── preload/
│   │   └── renderer/
│   ├── package.json
│   └── forge.config.ts
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── ai/
│   │   ├── asr/
│   │   ├── rag/
│   │   ├── ocr/
│   │   └── database/
│   ├── requirements.txt
│   └── .venv/
│
├── data/
│   ├── resumes/
│   ├── job_descriptions/
│   ├── sessions/
│   ├── vector_store/
│   └── logs/
│
├── tests/
├── AGENTS.md
├── PRD.md
├── README.md
└── LICENSE
```

---

# 25. Development Workflow

The development environment consists of:

## OpenCode

Primary AI engineering agent.

Use for:

- Architecture
- Coding
- Refactoring
- Tests
- Debugging
- Terminal operations

## Antigravity

Use for:

- UI work
- Visual debugging
- Browser testing where applicable
- Interaction testing

## VS Code

Use for:

- File inspection
- Manual edits
- Git
- Logs
- Configuration

---

# 26. AI Coding Rules

AI coding agents must follow these principles:

1. Plan before major implementation.
2. Make one milestone change at a time.
3. Run tests after changes.
4. Keep frontend/backend separation.
5. Avoid unnecessary dependencies.
6. Do not rewrite unrelated code.
7. Do not expose secrets.
8. Do not add telemetry unless explicitly requested.
9. Keep security settings enabled.
10. Add tests for core behavior.
11. Document architectural decisions.
12. Do not implement stealth or monitoring-evasion functionality.

---

# 27. Risks

## Risk 1 — Real-Time Latency

Cause:

- Slow ASR
- Slow local model
- CPU-only hardware
- Large prompts

Mitigation:

- Streaming
- VAD
- Smaller ASR model
- Smaller LLM
- Prompt compression
- Context limits
- Caching

---

## Risk 2 — Poor Grounding

Cause:

- Bad chunking
- Bad embeddings
- Incorrect retrieval

Mitigation:

- Metadata
- Better chunk boundaries
- Retrieval testing
- Top-k tuning
- Source tracking

---

## Risk 3 — Hallucinated Experience

Cause:

- LLM inventing information

Mitigation:

- Strong system prompt
- Structured context
- Retrieval
- Grounding rules
- Explicit "unknown" behavior

---

## Risk 4 — Hardware Variability

Cause:

- Different CPU/GPU/RAM configurations

Mitigation:

- CPU fallback
- Model-size selection
- Performance diagnostics
- User-selectable model

---

## Risk 5 — Desktop Capture Compatibility

Cause:

- Windows permissions
- Driver differences
- Meeting applications
- Audio routing

Mitigation:

- Explicit capture-source selection
- Diagnostics
- Clear error messages
- Test matrix

---

# 28. Success Metrics

Sunday should measure:

### Product Usage

- Preparation sessions
- Interview sessions
- Documents uploaded
- Questions processed
- Coding analyses

### Performance

- Average ASR latency
- Average RAG latency
- Average AI time-to-first-token
- End-to-end response latency

### Quality

- Retrieval relevance
- Answer grounding
- User correction rate
- User regeneration rate

### Reliability

- Session failure rate
- Provider failure rate
- Audio capture failure rate
- Application crashes

No metrics should be sent remotely by default.

---

# 29. Future Features

Potential post-1.0 features:

- Company research
- Interviewer/context notes
- More advanced mock interviews
- Interview answer scoring for preparation sessions
- Personalized preparation plans
- Knowledge-base ingestion
- More local ASR options
- Additional local models
- macOS support
- Linux support
- Optional team/enterprise deployment
- Advanced session analytics

---

# 30. Definition of Done

A Sunday feature is considered complete only when:

```text
□ Functional requirement implemented
□ UI implemented where required
□ Error handling implemented
□ Unit tests added
□ Integration tests added where applicable
□ Security reviewed
□ Privacy behavior reviewed
□ Documentation updated
□ Manual test completed
□ No unrelated files changed
```

---

# 31. Final Product Architecture

```text
                             SUNDAY
                   AI Interview Assistant
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
       Preparation         Interview          Coding
            │                 │                 │
            ▼                 ▼                 ▼
       Resume + JD          Audio            Screen
            │                 │                 │
            ▼                 ▼                 ▼
           RAG             VAD + ASR          OCR
            │                 │                 │
            └─────────────────┼─────────────────┘
                              │
                              ▼
                       Context Engine
                              │
                              ▼
                        Model Provider
                              │
                 ┌────────────┼────────────┐
                 │            │            │
                 ▼            ▼            ▼
              Ollama       OpenAI       Anthropic
                 │            │            │
                 └────────────┼────────────┘
                              │
                              ▼
                        Sunday Response
                              │
                              ▼
                       Sunday Desktop UI
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
          Dashboard        Overlay         History
```

---

# 32. Immediate Implementation Order

The recommended first implementation sequence is:

```text
Step 1
Create Sunday repository

Step 2
Create Electron application

Step 3
Create Sunday dashboard

Step 4
Create Interview page

Step 5
Create Preparation page

Step 6
Create Resume page

Step 7
Create Settings page

Step 8
Create Overlay

Step 9
Create FastAPI backend

Step 10
Connect Electron → FastAPI

Step 11
Install Ollama

Step 12
Connect Sunday → Ollama

Step 13
Implement Resume ingestion

Step 14
Implement JD ingestion

Step 15
Implement FAISS/RAG

Step 16
Implement live transcription

Step 17
Implement question detection

Step 18
Implement suggested responses

Step 19
Implement Coding Mode

Step 20
Implement multi-model providers

Step 21
Test

Step 22
Package Sunday for Windows
```

---

# 33. Product North Star

Sunday should ultimately make this workflow feel simple:

```text
Prepare
   ↓
Upload Resume
   ↓
Upload Job Description
   ↓
Understand the Role
   ↓
Practice
   ↓
Start Session
   ↓
Listen / Analyze
   ↓
Retrieve Relevant Experience
   ↓
Generate Grounded Suggestions
   ↓
Help the User Respond
```

The complexity should remain inside Sunday. The user experience should remain simple.

**Sunday = one desktop application for interview preparation, contextual AI assistance, and technical interview support.**
