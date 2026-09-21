# Tasks — Sunday
## An Interview AI Assistant

**Document Status:** Active Development Backlog  
**Version:** 1.0  
**Project:** Sunday  
**Primary Platform:** Windows 10/11  
**Task Format:** Epic → Task → Sub-task  
**Task Status:** `[ ]` Not Started · `[~]` In Progress · `[x]` Done · `[-]` Blocked

---

# 1. How to Use This File

This document is the implementation backlog for Sunday.

It is designed to be used by:

- Human developers
- OpenCode
- Antigravity
- AI coding agents
- QA contributors

Rules:

1. Work in dependency order.
2. Complete one task group before beginning dependent groups.
3. Do not mark a task complete without verifying its acceptance criteria.
4. Every code change must follow `Development Rules.md`.
5. Every architecture-changing decision must be recorded in `Architecture.md` or an ADR.
6. Keep tasks small enough to implement and test independently.
7. Never mix unrelated feature work into the same task.
8. Update this file as implementation progresses.

---

# 2. Product Delivery Strategy

Sunday will be built in these releases:

```text
Sunday 0.1
Desktop Foundation

        ↓

Sunday 0.2
Local AI Foundation

        ↓

Sunday 0.3
Resume Intelligence

        ↓

Sunday 0.4
Job Intelligence

        ↓

Sunday 0.5
RAG / Context Engine

        ↓

Sunday 0.6
Live Transcription

        ↓

Sunday 0.7
Interview Intelligence

        ↓

Sunday 0.8
Sunday Coding

        ↓

Sunday 0.9
Multi-Model Providers

        ↓

Sunday 1.0
Production Release
```

---

# 3. Priority Model

| Priority | Meaning |
|---|---|
| P0 | Blocking / essential for the release |
| P1 | Required for core product functionality |
| P2 | Important but can follow MVP |
| P3 | Future enhancement |

---

# 4. Epic 00 — Project Foundation

## T00-001 — Create Git Repository
**Priority:** P0

- [ ] Create `Sunday` Git repository.
- [ ] Set default branch.
- [ ] Add `.gitignore`.
- [ ] Add initial README.
- [ ] Add `PRD.md`.
- [ ] Add `Architecture.md`.
- [ ] Add `Development Rules.md`.
- [ ] Add `Design.md`.
- [ ] Add `Tasks.md`.

**Acceptance Criteria**

- Repository initializes successfully.
- No secrets are committed.
- Documentation files are visible at repository root.

---

## T00-002 — Establish Repository Structure
**Priority:** P0

Create:

```text
Sunday/
├── desktop/
├── backend/
├── data/
├── docs/
├── tests/
├── PRD.md
├── Architecture.md
├── Design.md
├── Development Rules.md
├── Tasks.md
├── AGENTS.md
├── README.md
└── LICENSE
```

**Acceptance Criteria**

- Directory structure matches architecture documentation.
- Empty directories are only created when required by tooling or implementation.

---

## T00-003 — Create AGENTS.md
**Priority:** P0

- [ ] Add Sunday architecture summary.
- [ ] Add naming rules.
- [ ] Add coding rules.
- [ ] Add testing rules.
- [ ] Add security rules.
- [ ] Add privacy rules.
- [ ] Add prohibited implementation categories.

**Acceptance Criteria**

- OpenCode can use `AGENTS.md` as repository guidance.
- Instructions do not conflict with `Development Rules.md`.

---

## T00-004 — Configure Git Hooks
**Priority:** P2

- [ ] Add formatting check.
- [ ] Add lint/type check where practical.
- [ ] Add secret detection if tooling is selected.
- [ ] Keep hooks fast enough for normal development.

---

## T00-005 — Baseline Documentation
**Priority:** P1

- [ ] Create README setup section.
- [ ] Document Node.js requirement.
- [ ] Document Python requirement.
- [ ] Document Ollama requirement.
- [ ] Document initial local model.
- [ ] Document development commands.

---

# 5. Epic 01 — Development Environment

## T01-001 — Verify Node.js
**Priority:** P0

- [ ] Install supported Node.js LTS.
- [ ] Verify `node --version`.
- [ ] Verify `npm --version`.

---

## T01-002 — Verify Python
**Priority:** P0

- [ ] Install supported Python version.
- [ ] Verify `python --version`.
- [ ] Verify virtual environment creation.
- [ ] Verify pip installation.

---

## T01-003 — Verify Git
**Priority:** P0

- [ ] Verify Git.
- [ ] Configure user name/email.
- [ ] Verify repository operations.

---

## T01-004 — Verify OpenCode
**Priority:** P0

- [ ] Start OpenCode.
- [ ] Run project initialization.
- [ ] Confirm `AGENTS.md` is recognized.
- [ ] Test Plan mode.
- [ ] Test Build mode.

---

## T01-005 — Verify Antigravity
**Priority:** P1

- [ ] Open Sunday repository.
- [ ] Verify terminal access.
- [ ] Verify editor access.
- [ ] Verify visual/browser workflows as applicable.

---

## T01-006 — Establish Development Commands
**Priority:** P0

Document commands for:

```text
desktop development
backend development
tests
lint
type check
build
package
```

**Acceptance Criteria**

A new developer can start Sunday using README instructions without undocumented manual steps.

---

# 6. Epic 02 — Sunday 0.1 Desktop Foundation

## T02-001 — Generate Electron Application
**Priority:** P0

- [ ] Create Electron project.
- [ ] Use TypeScript.
- [ ] Configure development scripts.
- [ ] Launch desktop shell.

**Acceptance Criteria**

Sunday opens as a desktop application.

---

## T02-002 — Configure Electron Security
**Priority:** P0

- [ ] Enable `contextIsolation`.
- [ ] Disable `nodeIntegration`.
- [ ] Configure secure preload.
- [ ] Minimize IPC surface.
- [ ] Prevent unnecessary remote content loading.

**Acceptance Criteria**

Security configuration passes manual review.

---

## T02-003 — Create Preload API
**Priority:** P0

Create typed APIs for:

```text
app
audio
screen
overlay
shortcuts
```

**Acceptance Criteria**

Renderer accesses only intentionally exposed APIs.

---

## T02-004 — Create Main Window
**Priority:** P0

- [ ] Configure window size.
- [ ] Configure application icon placeholder.
- [ ] Configure dev/prod loading.
- [ ] Handle close lifecycle.

---

## T02-005 — Create Sunday Branding
**Priority:** P1

- [ ] Product name: Sunday.
- [ ] Product descriptor: An Interview AI Assistant.
- [ ] Use approved visual design from `Design.md`.
- [ ] Establish reusable branding component.

---

## T02-006 — Create Application Shell
**Priority:** P0

Pages:

```text
Dashboard
Preparation
Interview
Coding
Resume
Job Description
History
Settings
```

**Acceptance Criteria**

- Navigation works.
- Active page is visually obvious.
- No page causes console errors.

---

## T02-007 — Create Dashboard
**Priority:** P0

Include:

```text
Sunday
Your AI Interview Assistant

[Start Interview]
[Prepare for Interview]

Recent Sessions
```

---

## T02-008 — Create Preparation Page
**Priority:** P1

Include placeholders for:

- Resume
- Job description
- Preparation topics
- Likely questions
- Mock interview

---

## T02-009 — Create Interview Page
**Priority:** P0

Include:

- Session header
- Listening state
- Live transcript placeholder
- Question card
- Suggested Response placeholder
- Key Points placeholder
- Model status
- Latency status

---

## T02-010 — Create Resume Page
**Priority:** P1

Include:

- Upload area
- File status
- Processing status
- Indexed status
- Document details

---

## T02-011 — Create Job Description Page
**Priority:** P1

Include:

- Upload area
- Processing status
- Detected requirements
- Job summary

---

## T02-012 — Create Coding Page
**Priority:** P1

Include:

- Capture screen action
- Analyze screenshot action
- Analysis output placeholder

---

## T02-013 — Create History Page
**Priority:** P2

Include:

- Session list
- Session date
- Session type
- Resume/job association

---

## T02-014 — Create Settings Page
**Priority:** P1

Sections:

```text
AI
Interview
Capture
Privacy
Appearance
Shortcuts
```

---

## T02-015 — Create Sunday Overlay Window
**Priority:** P1

- [ ] Create separate Electron window.
- [ ] Make movable.
- [ ] Make resizable.
- [ ] Support always-on-top setting.
- [ ] Support show/hide.
- [ ] Implement compact layout.

---

## T02-016 — Implement Global Shortcuts
**Priority:** P1

Initial shortcuts:

```text
Ctrl + Space
Ctrl + Shift + A
Ctrl + Shift + S
Ctrl + Shift + R
Ctrl + Shift + M
```

---

## T02-017 — Desktop Foundation QA
**Priority:** P0

Verify:

- [ ] Application starts.
- [ ] All pages open.
- [ ] Overlay opens.
- [ ] Overlay closes.
- [ ] Keyboard shortcuts work.
- [ ] No renderer crashes.
- [ ] Build succeeds.

**Release Gate:** Sunday 0.1 ready.

---

# 7. Epic 03 — Sunday Backend Foundation

## T03-001 — Create Python Backend
**Priority:** P0

- [ ] Create backend virtual environment.
- [ ] Create FastAPI application.
- [ ] Create dependency file.
- [ ] Create configuration module.

---

## T03-002 — Backend Package Structure
**Priority:** P0

Create:

```text
app/
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

---

## T03-003 — Configuration Management
**Priority:** P0

Support:

```text
environment
host
port
Ollama host
Ollama model
ASR model
RAG settings
logging level
```

---

## T03-004 — Logging
**Priority:** P1

- [ ] Structured logging.
- [ ] Log levels.
- [ ] Component names.
- [ ] Event names.
- [ ] No secret logging.
- [ ] No raw document/audio logging by default.

---

## T03-005 — Health Endpoint
**Priority:** P0

Implement:

```text
GET /api/v1/health
```

Response:

```json
{
  "status": "ok"
}
```

---

## T03-006 — Global Error Handling
**Priority:** P1

- [ ] Standardize API errors.
- [ ] Add error codes.
- [ ] Mark retryable errors.
- [ ] Avoid exposing internal stack traces to users.

---

## T03-007 — Backend Test Foundation
**Priority:** P0

- [ ] Configure test runner.
- [ ] Add health test.
- [ ] Add configuration tests.
- [ ] Add error response tests.

---

## T03-008 — Electron ↔ Backend Connectivity
**Priority:** P0

- [ ] Add backend client service.
- [ ] Add health check.
- [ ] Display backend status in development diagnostics.

**Acceptance Criteria**

Sunday desktop can detect whether the backend is healthy.

---

# 8. Epic 04 — Sunday 0.2 Local AI Foundation

## T04-001 — Ollama Installation Check
**Priority:** P0

- [ ] Verify Ollama endpoint.
- [ ] Verify availability.
- [ ] Display readable error when unavailable.

---

## T04-002 — Model Registry
**Priority:** P1

Store:

```text
provider
model
display name
local/cloud
capabilities
status
```

---

## T04-003 — ModelProvider Interface
**Priority:** P0

Create:

```text
chat()
stream()
health()
model_info()
```

---

## T04-004 — OllamaProvider
**Priority:** P0

- [ ] Connect to local Ollama.
- [ ] Send chat requests.
- [ ] Support streaming.
- [ ] Handle timeout.
- [ ] Handle missing model.
- [ ] Handle provider unavailable.
- [ ] Add tests.

---

## T04-005 — Chat API
**Priority:** P0

Implement:

```text
POST /api/v1/chat
```

---

## T04-006 — Streaming Chat
**Priority:** P0

- [ ] Stream model output.
- [ ] Preserve ordering.
- [ ] Detect completion.
- [ ] Handle interruption.

---

## T04-007 — Frontend AI Client
**Priority:** P0

- [ ] Send question.
- [ ] Receive stream.
- [ ] Render answer incrementally.
- [ ] Display error states.

---

## T04-008 — Sunday AI Status
**Priority:** P1

Display:

```text
Provider
Model
Status
```

---

## T04-009 — Local AI QA
**Priority:** P0

Test:

```text
Question
 ↓
Sunday
 ↓
FastAPI
 ↓
Ollama
 ↓
Sunday response
```

**Release Gate:** Sunday 0.2 ready.

---

# 9. Epic 05 — Document Infrastructure

## T05-001 — File Validation
**Priority:** P0

Support:

```text
PDF
DOCX
TXT
```

Validate:

- extension
- MIME/type where available
- file size
- readable content

---

## T05-002 — PDF Parser
**Priority:** P0

- [ ] Extract text.
- [ ] Detect extraction failures.
- [ ] Test normal PDFs.
- [ ] Test scanned/unextractable PDFs.

---

## T05-003 — DOCX Parser
**Priority:** P1

- [ ] Extract paragraphs.
- [ ] Preserve useful section boundaries.
- [ ] Handle empty documents.

---

## T05-004 — TXT Parser
**Priority:** P1

- [ ] Load UTF-8.
- [ ] Handle encoding errors clearly.

---

## T05-005 — Document Cleaner
**Priority:** P0

- [ ] Remove excessive whitespace.
- [ ] Normalize line breaks.
- [ ] Preserve meaningful structure.
- [ ] Preserve section information.

---

## T05-006 — Section Detector
**Priority:** P1

Detect common sections:

```text
Summary
Experience
Skills
Projects
Education
Certifications
Achievements
Responsibilities
Requirements
Qualifications
```

---

## T05-007 — Chunker
**Priority:** P0

- [ ] Chunk by semantic boundaries.
- [ ] Configure chunk size.
- [ ] Configure overlap.
- [ ] Attach metadata.

---

## T05-008 — Document Hashing
**Priority:** P1

- [ ] Generate file/content hash.
- [ ] Reuse previously indexed documents when hash matches.

---

# 10. Epic 06 — Sunday 0.3 Resume Intelligence

## T06-001 — Resume Upload API
**Priority:** P0

Implement:

```text
POST /api/v1/documents/upload
```

with document type support.

---

## T06-002 — Resume Document Model
**Priority:** P0

Store:

```text
id
filename
hash
path
type
created_at
status
```

---

## T06-003 — Resume Ingestion Pipeline
**Priority:** P0

Pipeline:

```text
Upload
→ Parse
→ Clean
→ Sections
→ Chunk
→ Embed
→ Index
```

---

## T06-004 — Resume UI Upload
**Priority:** P0

- [ ] Drag/drop.
- [ ] File picker.
- [ ] Progress.
- [ ] Success/error.
- [ ] Replace resume.

---

## T06-005 — Resume Status
**Priority:** P1

Display:

```text
Uploaded
Processing
Indexed
Error
```

---

## T06-006 — Resume Search
**Priority:** P1

Allow internal semantic search over resume content.

---

## T06-007 — Resume QA
**Priority:** P0

Verify:

- [ ] PDF
- [ ] DOCX
- [ ] TXT
- [ ] duplicate file handling
- [ ] malformed file handling
- [ ] index persistence

**Release Gate:** Sunday 0.3 ready.

---

# 11. Epic 07 — Sunday 0.4 Job Intelligence

## T07-001 — Job Description Upload API
**Priority:** P0

---

## T07-002 — Job Description Model
**Priority:** P0

Store document metadata and job profile.

---

## T07-003 — JD Ingestion Pipeline
**Priority:** P0

Pipeline:

```text
Upload
→ Parse
→ Clean
→ Section
→ Chunk
→ Embed
→ Index
```

---

## T07-004 — Requirement Extraction
**Priority:** P1

Extract where detectable:

```text
Role
Skills
Technologies
Responsibilities
Experience
Qualifications
```

---

## T07-005 — JD UI
**Priority:** P0

Display:

```text
Upload
Processing
Indexed
Detected Requirements
```

---

## T07-006 — Candidate/Role Profile
**Priority:** P1

Combine:

```text
Resume
+
JD
```

into structured profile data.

---

## T07-007 — Resume/JD Relationship View
**Priority:** P2

Display:

```text
Relevant Skills
Resume Evidence
Job Requirements
Potential Preparation Topics
```

Do not fabricate missing candidate experience.

---

## T07-008 — Job Intelligence QA
**Priority:** P0

**Release Gate:** Sunday 0.4 ready.

---

# 12. Epic 08 — Sunday 0.5 RAG / Context Engine

## T08-001 — Embedding Service
**Priority:** P0

- [ ] Select embedding model.
- [ ] Create embedding interface.
- [ ] Support batch generation.
- [ ] Add tests.

---

## T08-002 — VectorStore Interface
**Priority:** P0

Conceptually:

```text
add()
search()
delete()
save()
load()
```

---

## T08-003 — FAISS Implementation
**Priority:** P0

- [ ] Create index.
- [ ] Save index.
- [ ] Load index.
- [ ] Search top-k.
- [ ] Handle empty index.

---

## T08-004 — Metadata Store
**Priority:** P0

Associate vector results with:

```text
document_id
chunk_id
section
text
source
```

---

## T08-005 — Retrieval Service
**Priority:** P0

Implement:

```text
retrieve_context(query, top_k)
```

---

## T08-006 — Source Filtering
**Priority:** P1

Support:

```text
resume only
JD only
both
```

---

## T08-007 — Context Builder
**Priority:** P0

Build:

```text
InterviewContext
```

with:

- current question
- resume chunks
- JD chunks
- recent context
- screen context
- role
- response preferences

---

## T08-008 — Prompt Builder
**Priority:** P0

Separate:

```text
system instructions
application instructions
retrieved content
user question
```

---

## T08-009 — Prompt Injection Protection
**Priority:** P0

- [ ] Retrieved documents treated as data.
- [ ] Use explicit delimiters.
- [ ] Prevent document instructions from overriding system rules.
- [ ] Add prompt-injection tests.

---

## T08-010 — Grounding Rules
**Priority:** P0

Enforce:

- no fabricated employers
- no fabricated projects
- no fabricated certifications
- no unsupported experience
- disclose missing information

---

## T08-011 — RAG Evaluation Set
**Priority:** P1

Create test questions covering:

```text
Skills
Experience
Projects
Leadership
Technical knowledge
Irrelevant questions
```

---

## T08-012 — Retrieval Evaluation
**Priority:** P1

Record:

```text
query
expected source
retrieved source
relevance
```

---

## T08-013 — RAG QA
**Priority:** P0

Verify:

```text
Question
→ retrieval
→ context
→ answer
```

**Release Gate:** Sunday 0.5 ready.

---

# 13. Epic 09 — Sunday Preparation Engine

## T09-001 — Question Generator
**Priority:** P1

Generate:

```text
Technical
Behavioral
Resume-Based
Job-Specific
Follow-Up
```

---

## T09-002 — Preparation Topics
**Priority:** P1

Generate relevant preparation topics from Resume + JD.

---

## T09-003 — Suggested Answers
**Priority:** P1

Generate grounded answer drafts.

---

## T09-004 — Preparation Dashboard
**Priority:** P1

Show:

```text
Questions
Topics
Suggested Answers
Progress
```

---

## T09-005 — Mock Interview Engine
**Priority:** P2

Implement:

```text
Ask
→ User answers
→ Analyze
→ Feedback
→ Follow-up
```

---

## T09-006 — Preparation QA
**Priority:** P1

Verify no fabricated experience is introduced.

---

# 14. Epic 10 — Sunday 0.6 Audio Capture

## T10-001 — Capture Source Discovery
**Priority:** P0

- [ ] Discover supported desktop capture sources.
- [ ] Display source names.
- [ ] Handle unavailable sources.

---

## T10-002 — Audio Capture State Machine
**Priority:** P0

States:

```text
IDLE
STARTING
CAPTURING
STOPPING
ERROR
```

---

## T10-003 — Audio Chunking
**Priority:** P0

- [ ] Produce short chunks.
- [ ] Normalize expected format.
- [ ] Validate chunk size.

---

## T10-004 — Audio WebSocket
**Priority:** P0

Implement:

```text
/ws/transcribe
```

---

## T10-005 — Raw Audio Retention
**Priority:** P0

Default:

```text
No permanent raw audio storage
```

Add explicit opt-in if recording is later supported.

---

## T10-006 — Capture UI
**Priority:** P0

Show:

```text
Listening
Starting
Stopped
Error
```

---

## T10-007 — Audio Diagnostics
**Priority:** P1

Display:

```text
source
sample rate
channels
buffer status
connection status
```

---

## T10-008 — Audio Capture QA
**Priority:** P0

Test supported Windows configurations.

---

# 15. Epic 11 — Sunday Speech-to-Text

## T11-001 — ASR Provider Interface
**Priority:** P0

Create replaceable ASR interface.

---

## T11-002 — faster-whisper Integration
**Priority:** P0

- [ ] Model configuration.
- [ ] CPU mode.
- [ ] GPU mode where available.
- [ ] Error handling.
- [ ] Model loading.

---

## T11-003 — Voice Activity Detection
**Priority:** P0

- [ ] Detect speech.
- [ ] Ignore sustained silence.
- [ ] Configure thresholds.
- [ ] Test short speech.

---

## T11-004 — Audio Buffer Manager
**Priority:** P0

- [ ] Rolling buffer.
- [ ] Stable windows.
- [ ] Prevent runaway memory growth.

---

## T11-005 — Partial Transcript
**Priority:** P0

Return:

```json
{
  "type": "partial",
  "text": "..."
}
```

---

## T11-006 — Final Transcript
**Priority:** P0

Return:

```json
{
  "type": "final",
  "text": "..."
}
```

---

## T11-007 — Transcript Aggregator
**Priority:** P0

- [ ] Deduplicate partial fragments.
- [ ] Stabilize sentence output.
- [ ] Track timestamps.

---

## T11-008 — Transcript UI
**Priority:** P0

Display live transcript.

---

## T11-009 — ASR Performance Benchmarks
**Priority:** P1

Measure:

```text
model load time
processing time
real-time factor
memory
CPU/GPU usage
```

---

## T11-010 — ASR QA
**Priority:** P0

Test:

- [ ] short questions
- [ ] long questions
- [ ] pauses
- [ ] noisy audio
- [ ] silence
- [ ] repeated words

**Release Gate:** Sunday 0.6 ready.

---

# 16. Epic 12 — Sunday 0.7 Interview Intelligence

## T12-001 — Sentence Stabilization
**Priority:** P0

Only trigger downstream processing when text is stable.

---

## T12-002 — Question Heuristics
**Priority:** P0

Support patterns such as:

```text
Can you...
Could you...
How did...
How would...
Why...
What...
When...
Tell me about...
Explain...
Describe...
Walk me through...
```

---

## T12-003 — Question Classification
**Priority:** P1

Add a lightweight classifier if heuristics alone are insufficient.

---

## T12-004 — Pause Detection
**Priority:** P1

Use transcript/audio pause information to estimate question completion.

---

## T12-005 — Question Event
**Priority:** P0

Produce:

```json
{
  "type": "interview_question",
  "text": "...",
  "confidence": 0.0
}
```

---

## T12-006 — Duplicate Question Prevention
**Priority:** P0

- [ ] Normalize question.
- [ ] Generate fingerprint.
- [ ] Compare recent questions.
- [ ] Expire fingerprints.

---

## T12-007 — Recent Context Manager
**Priority:** P0

Keep:

```text
current question
recent transcript
previous questions
recent answers
```

with bounded memory.

---

## T12-008 — Interview Service
**Priority:** P0

Coordinate:

```text
question
→ retrieval
→ context
→ AI
→ response
```

---

## T12-009 — Suggested Response
**Priority:** P0

Return:

```json
{
  "answer": "...",
  "key_points": [],
  "follow_up": "..."
}
```

---

## T12-010 — Streaming Suggested Response
**Priority:** P0

- [ ] Stream first tokens immediately.
- [ ] Show partial answer.
- [ ] Handle cancellation.

---

## T12-011 — Answer Regeneration
**Priority:** P1

Support:

```text
Regenerate
```

without duplicating the session question unnecessarily.

---

## T12-012 — Response Styles
**Priority:** P1

Examples:

```text
Concise
Professional
Detailed
Technical
Conversational
```

---

## T12-013 — Answer Length Controls
**Priority:** P1

Support configurable answer length.

---

## T12-014 — Key Points Extraction
**Priority:** P1

Show short scannable talking points.

---

## T12-015 — Follow-Up Prediction
**Priority:** P2

Generate a possible follow-up question for preparation and optional live use.

---

## T12-016 — Interview Pipeline Diagnostics
**Priority:** P1

Track:

```text
audio timestamp
ASR completion
question detected
RAG completion
first AI token
final response
```

---

## T12-017 — Interview UI Integration
**Priority:** P0

Connect:

```text
Live Transcript
Question
Suggested Response
Key Points
Model
Latency
```

---

## T12-018 — Interview End-to-End QA
**Priority:** P0

Test:

```text
Audio
→ Transcript
→ Question
→ Retrieval
→ AI
→ UI
```

**Release Gate:** Sunday 0.7 ready.

---

# 17. Epic 13 — Sunday 0.8 Coding Mode

## T13-001 — Screen Source Discovery
**Priority:** P1

- [ ] Discover screens/windows.
- [ ] Display selectable sources.

---

## T13-002 — Explicit Screen Capture
**Priority:** P1

- [ ] Capture selected source.
- [ ] Show capture status.
- [ ] Handle cancel/error.

---

## T13-003 — Image Validation
**Priority:** P1

- [ ] Validate image type.
- [ ] Limit image dimensions/size.
- [ ] Normalize format.

---

## T13-004 — OCR Provider Interface
**Priority:** P1

Create replaceable OCR abstraction.

---

## T13-005 — PaddleOCR Integration
**Priority:** P1

- [ ] Initialize model lazily.
- [ ] Process image.
- [ ] Return detected text.
- [ ] Return bounding information where useful.

---

## T13-006 — Code Detection
**Priority:** P1

Detect likely code regions.

---

## T13-007 — Language Detection
**Priority:** P2

Estimate language such as:

```text
Python
Java
JavaScript
TypeScript
C#
C++
Go
SQL
```

---

## T13-008 — Coding Context Builder
**Priority:** P1

Build:

```text
problem
code
language
screen text
```

---

## T13-009 — Coding Prompt
**Priority:** P1

Output:

```text
Approach
Complexity
Potential Issues
Suggested Improvements
Explanation
```

---

## T13-010 — Coding UI
**Priority:** P1

Show:

```text
Captured Screen
Detected Text
Code
Language
Analysis
```

---

## T13-011 — Coding QA
**Priority:** P1

Test:

- [ ] code-heavy screen
- [ ] text-heavy screen
- [ ] poor image quality
- [ ] no code
- [ ] mixed text/code

**Release Gate:** Sunday 0.8 ready.

---

# 18. Epic 14 — Sunday Overlay

## T14-001 — Overlay Window
**Priority:** P1

- [ ] Always-on-top option.
- [ ] Dragging.
- [ ] Resizing.
- [ ] Show/hide.
- [ ] Focus behavior.

---

## T14-002 — Overlay State
**Priority:** P1

States:

```text
IDLE
LISTENING
PROCESSING
ANSWERING
ERROR
```

---

## T14-003 — Question Card
**Priority:** P1

Display detected question.

---

## T14-004 — Transcript Card
**Priority:** P1

Display current transcript context.

---

## T14-005 — Suggested Response Card
**Priority:** P1

Display streaming response.

---

## T14-006 — Key Points
**Priority:** P1

Display concise talking points.

---

## T14-007 — Model and Latency
**Priority:** P2

Display:

```text
Model
Response latency
```

---

## T14-008 — Overlay Keyboard Control
**Priority:** P1

Connect global shortcut to overlay visibility.

---

## T14-009 — Overlay Accessibility
**Priority:** P1

Verify:

- [ ] readable font size
- [ ] keyboard support
- [ ] sufficient contrast
- [ ] scalable layout

---

## T14-010 — Overlay Visual QA
**Priority:** P1

Verify against `Design.md`.

---

# 19. Epic 15 — Sunday 0.9 Multi-Model Providers

## T15-001 — Provider Configuration
**Priority:** P1

Allow selection of:

```text
Ollama
OpenAI
Anthropic
```

only where configured.

---

## T15-002 — OpenAI Provider
**Priority:** P2

- [ ] Implement provider adapter.
- [ ] Streaming.
- [ ] Errors.
- [ ] Secure key handling.
- [ ] Tests.

---

## T15-003 — Anthropic Provider
**Priority:** P2

- [ ] Implement provider adapter.
- [ ] Streaming.
- [ ] Errors.
- [ ] Secure key handling.
- [ ] Tests.

---

## T15-004 — Provider Health
**Priority:** P1

Display:

```text
Available
Unavailable
Authentication required
Model unavailable
```

---

## T15-005 — Provider Fallback Rules
**Priority:** P2

Fallback must be explicit.

Do not silently redirect user data to another provider.

---

## T15-006 — Model Selection UI
**Priority:** P1

Display:

```text
Sunday Local — selected local model
Configured cloud models
```

---

## T15-007 — Provider Contract Tests
**Priority:** P1

Every provider must satisfy the same test contract.

**Release Gate:** Sunday 0.9 ready.

---

# 20. Epic 16 — Database and Session History

## T16-001 — SQLite Initialization
**Priority:** P1

Create database automatically.

---

## T16-002 — Session Repository
**Priority:** P1

Implement:

```text
create
get
list
update
delete
```

---

## T16-003 — Document Repository
**Priority:** P1

Implement:

```text
create
get
list
delete
```

---

## T16-004 — Question Repository
**Priority:** P1

---

## T16-005 — Answer Repository
**Priority:** P1

---

## T16-006 — Settings Repository
**Priority:** P1

---

## T16-007 — Migration Strategy
**Priority:** P1

Document schema migration approach.

---

## T16-008 — Session History UI
**Priority:** P2

Display:

```text
Session
Date
Type
Role
Model
```

---

# 21. Epic 17 — Privacy and Data Controls

## T17-001 — Local-Only Mode
**Priority:** P0

Default:

```text
ON
```

Behavior:

```text
ASR → Local
RAG → Local
LLM → Local
Storage → Local
```

---

## T17-002 — Transcript Persistence Setting
**Priority:** P0

Default:

```text
OFF
```

---

## T17-003 — Raw Audio Policy
**Priority:** P0

Default:

```text
OFF
```

---

## T17-004 — Screenshot Retention Policy
**Priority:** P1

Default:

```text
Do not persist after analysis
```

unless user explicitly enables retention.

---

## T17-005 — Clear Data
**Priority:** P0

Implement:

```text
Clear Session
Clear Transcripts
Clear Documents
Clear All Sunday Data
```

---

## T17-006 — Cloud Usage Indicator
**Priority:** P0

Clearly show:

```text
Local
or
Cloud
```

for the active model path.

---

## T17-007 — Privacy Review
**Priority:** P0

Verify:

- [ ] no unexpected network calls
- [ ] no telemetry by default
- [ ] no secret logging
- [ ] no raw audio persistence
- [ ] no hidden cloud fallback

---

# 22. Epic 18 — Security Hardening

## T18-001 — Electron Security Review
**Priority:** P0

Check:

```text
contextIsolation = true
nodeIntegration = false
```

---

## T18-002 — IPC Validation
**Priority:** P0

Validate:

- command arguments
- paths
- IDs
- image data
- source IDs

---

## T18-003 — File Path Security
**Priority:** P0

Prevent:

- arbitrary path traversal
- writing outside intended data directories
- unexpected execution

---

## T18-004 — Uploaded File Security
**Priority:** P0

- [ ] Size limits.
- [ ] Type validation.
- [ ] Safe storage.
- [ ] No executable content handling.

---

## T18-005 — Prompt Injection Tests
**Priority:** P0

Test resume/JD content containing malicious instructions.

Expected:

Retrieved content remains data.

---

## T18-006 — Secret Management
**Priority:** P0

- [ ] Do not store keys in source.
- [ ] Do not expose keys to renderer unnecessarily.
- [ ] Use secure storage for configured cloud keys where practical.

---

## T18-007 — Network Boundary Review
**Priority:** P1

Document every external network destination.

---

## T18-008 — Security Regression Checklist
**Priority:** P1

Run before each release.

---

# 23. Epic 19 — Error Recovery

## T19-001 — Ollama Recovery
**Priority:** P1

Handle:

```text
not running
model missing
request timeout
generation failure
```

---

## T19-002 — Backend Recovery
**Priority:** P1

- [ ] Detect backend crash.
- [ ] Attempt restart.
- [ ] Recheck health.
- [ ] Notify user if restart fails.

---

## T19-003 — WebSocket Recovery
**Priority:** P1

- [ ] Detect disconnect.
- [ ] Reconnect when appropriate.
- [ ] Prevent duplicate streams.

---

## T19-004 — ASR Recovery
**Priority:** P1

Handle model load/runtime failures.

---

## T19-005 — OCR Recovery
**Priority:** P2

Return clear error and preserve application usability.

---

## T19-006 — UI Error States
**Priority:** P1

Every major feature needs:

```text
loading
success
empty
error
retry
```

states.

---

# 24. Epic 20 — Performance Engineering

## T20-001 — Instrument Pipeline
**Priority:** P0

Measure:

```text
capture
VAD
ASR
question detection
RAG
LLM first token
LLM completion
UI
```

---

## T20-002 — Performance Dashboard
**Priority:** P2

Developer-only screen.

---

## T20-003 — ASR Benchmarking
**Priority:** P1

Test supported model sizes.

---

## T20-004 — LLM Benchmarking
**Priority:** P1

Compare configured models on representative questions.

---

## T20-005 — Prompt Size Optimization
**Priority:** P1

- [ ] Limit context.
- [ ] Remove duplicate information.
- [ ] Avoid full resume injection.

---

## T20-006 — Retrieval Optimization
**Priority:** P1

- [ ] Tune top-k.
- [ ] Test filtering.
- [ ] Cache repeated queries where useful.

---

## T20-007 — Model Loading Optimization
**Priority:** P1

Use lazy loading where practical.

---

## T20-008 — UI Responsiveness Testing
**Priority:** P1

Verify heavy operations do not freeze the renderer.

---

## T20-009 — End-to-End Latency Test
**Priority:** P0

Target:

```text
Approximately 2–4 seconds to useful first response
```

on suitable configurations.

---

# 25. Epic 21 — Observability and Diagnostics

## T21-001 — Structured Events
**Priority:** P1

Implement:

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

---

## T21-002 — Session Correlation IDs
**Priority:** P1

Correlate:

```text
question
retrieval
AI
UI
```

for diagnostics.

---

## T21-003 — Diagnostic Logging
**Priority:** P1

Ensure every important subsystem produces actionable logs.

---

## T21-004 — Privacy-Safe Logging Review
**Priority:** P0

Confirm sensitive content is not logged by default.

---

# 26. Epic 22 — Testing Infrastructure

## T22-001 — Frontend Unit Tests
**Priority:** P1

Test:

- components
- hooks
- state logic
- client services

---

## T22-002 — Backend Unit Tests
**Priority:** P0

Test:

- services
- repositories
- parsers
- AI provider contracts
- retrieval
- prompt builders

---

## T22-003 — Integration Tests
**Priority:** P0

Test:

```text
Electron → FastAPI
FastAPI → Ollama
Document → RAG
Question → AI
```

---

## T22-004 — ASR Integration Tests
**Priority:** P1

Use controlled audio fixtures.

---

## T22-005 — OCR Integration Tests
**Priority:** P1

Use image fixtures.

---

## T22-006 — End-to-End Tests
**Priority:** P0

Scenario:

```text
Launch Sunday
→ Upload Resume
→ Upload JD
→ Start Session
→ Question
→ Suggested Response
→ Stop Session
```

---

## T22-007 — Failure Scenario Tests
**Priority:** P0

Test:

```text
Ollama unavailable
Backend unavailable
Model missing
Invalid file
Audio unavailable
OCR failure
WebSocket disconnect
```

---

## T22-008 — Windows Smoke Tests
**Priority:** P0

Test on supported Windows environments.

---

# 27. Epic 23 — UI/UX Implementation

## T23-001 — Implement Design Tokens
**Priority:** P1

Define:

```text
colors
spacing
typography
radius
shadows
motion
```

from `Design.md`.

---

## T23-002 — Reusable Component Library
**Priority:** P1

Create reusable:

```text
Button
Card
Input
Select
Modal
Toast
Status
Progress
Tabs
Panel
```

---

## T23-003 — Loading States
**Priority:** P1

Every asynchronous feature needs a visible loading state.

---

## T23-004 — Empty States
**Priority:** P1

Add meaningful empty states.

---

## T23-005 — Error States
**Priority:** P1

Add clear recovery actions.

---

## T23-006 — Accessibility
**Priority:** P1

Check:

- [ ] keyboard navigation
- [ ] focus order
- [ ] readable sizing
- [ ] adequate contrast
- [ ] accessible names
- [ ] reduced motion consideration

---

## T23-007 — Visual QA
**Priority:** P1

Compare implemented UI against `Design.md`.

---

# 28. Epic 24 — Packaging and Installer

## T24-001 — Electron Production Build
**Priority:** P0

---

## T24-002 — Backend Packaging Strategy
**Priority:** P0

Select and document one:

```text
Bundled runtime
Standalone backend executable
Managed local process
```

---

## T24-003 — Production Configuration
**Priority:** P0

- [ ] Production paths.
- [ ] Production logging.
- [ ] Environment validation.
- [ ] Local data directories.

---

## T24-004 — Application Icon
**Priority:** P1

Create final Sunday icon assets.

---

## T24-005 — Windows Installer
**Priority:** P0

Build installable package.

---

## T24-006 — Fresh Install Test
**Priority:** P0

Test on clean Windows environment.

---

## T24-007 — Upgrade Test
**Priority:** P1

Test upgrading from previous version.

---

## T24-008 — Uninstall Test
**Priority:** P1

Verify uninstall behavior and data-retention policy.

---

# 29. Epic 25 — Documentation

## T25-001 — README
**Priority:** P0

Include:

- product overview
- screenshots
- installation
- development
- configuration
- troubleshooting

---

## T25-002 — Development Guide
**Priority:** P1

Create:

```text
docs/Development.md
```

---

## T25-003 — API Documentation
**Priority:** P1

Create:

```text
docs/API.md
```

---

## T25-004 — Privacy Documentation
**Priority:** P1

Create:

```text
docs/Privacy.md
```

---

## T25-005 — Architecture Decision Records
**Priority:** P2

Create ADRs for significant architecture decisions.

---

## T25-006 — User Guide
**Priority:** P1

Document:

- first run
- resume upload
- JD upload
- preparation
- interview
- coding mode
- settings
- privacy controls

---

# 30. Epic 26 — Release Readiness

## T26-001 — Product Requirements Review
**Priority:** P0

Check all MVP requirements against `PRD.md`.

---

## T26-002 — Architecture Review
**Priority:** P0

Check implementation against `Architecture.md`.

---

## T26-003 — Development Rules Review
**Priority:** P0

Check compliance with `Development Rules.md`.

---

## T26-004 — Design Review
**Priority:** P1

Check implementation against `Design.md`.

---

## T26-005 — Security Review
**Priority:** P0

Complete security checklist.

---

## T26-006 — Privacy Review
**Priority:** P0

Complete privacy checklist.

---

## T26-007 — Performance Review
**Priority:** P0

Record representative:

```text
ASR latency
RAG latency
first-token latency
end-to-end latency
```

---

## T26-008 — Installation QA
**Priority:** P0

Test:

```text
install
first launch
configuration
normal use
update
uninstall
```

---

## T26-009 — Release Notes
**Priority:** P1

Document:

- new features
- known limitations
- supported environments
- model requirements

---

## T26-010 — Sunday 1.0 Release Candidate
**Priority:** P0

Mark RC only when:

```text
all P0 tasks complete
critical P1 tasks complete
no release-blocking defects
security review complete
privacy review complete
Windows packaging verified
```

---

# 31. Cross-Cutting Quality Tasks

## T27-001 — Type Safety
**Priority:** P0

- [ ] TypeScript strictness appropriate for project.
- [ ] Pydantic schemas used at API boundaries.
- [ ] Avoid unsafe `any` where practical.

---

## T27-002 — Dependency Review
**Priority:** P1

For every new dependency:

- [ ] Is it necessary?
- [ ] Is it maintained?
- [ ] Is its license acceptable?
- [ ] Does it add significant footprint?
- [ ] Can it be isolated behind an interface?

---

## T27-003 — License Review
**Priority:** P0

Review licenses of:

- libraries
- AI models
- OCR models
- ASR models
- embedding models
- packaging components

before distribution.

---

## T27-004 — Resource Cleanup
**Priority:** P0

Verify cleanup for:

- WebSockets
- audio streams
- timers
- listeners
- model resources
- temporary screenshots
- temporary files

---

## T27-005 — Memory Leak Testing
**Priority:** P1

Test long-running sessions for memory growth.

---

## T27-006 — Crash Recovery Testing
**Priority:** P1

Simulate:

- backend crash
- AI provider failure
- capture disconnect
- malformed document
- UI reload

---

# 32. AI Agent Operating Tasks

These tasks apply whenever OpenCode/Antigravity performs implementation work.

## T28-001 — Read Project Documents
**Priority:** P0

Before a significant change, read:

```text
PRD.md
Architecture.md
Development Rules.md
Design.md
Tasks.md
```

---

## T28-002 — Plan Before Build
**Priority:** P0

Use Plan mode for changes that affect:

- architecture
- multiple modules
- database schema
- AI provider interfaces
- real-time processing
- packaging

---

## T28-003 — Smallest Safe Change
**Priority:** P0

Do not rewrite complete subsystems when a localized change is sufficient.

---

## T28-004 — Test Every Milestone
**Priority:** P0

After implementation:

```text
run tests
run type checks
run lint
run build where applicable
```

---

## T28-005 — Report Changed Files
**Priority:** P0

Every substantial agent task should end with:

```text
Files changed
Tests run
Build result
Known issues
Next dependency
```

---

## T28-006 — Do Not Hide Failures
**Priority:** P0

AI coding agents must never:

- suppress test failures
- silently skip errors
- fake successful builds
- delete tests merely because they fail

---

## T28-007 — No Secret Generation in Source
**Priority:** P0

Never insert:

```text
API keys
tokens
credentials
private certificates
```

into committed source.

---

## T28-008 — No Unapproved Scope Expansion
**Priority:** P1

Do not add unrelated features because they appear convenient during implementation.

---

# 33. Git and Branching Tasks

## T29-001 — Branch Naming
Suggested format:

```text
feature/T12-question-detection
bugfix/T04-ollama-timeout
refactor/T08-rag-service
docs/T25-user-guide
```

---

## T29-002 — Commit Naming
Suggested format:

```text
feat: add Sunday overlay
fix: handle Ollama timeout
refactor: extract ModelProvider
test: add RAG retrieval cases
docs: update installation guide
```

---

## T29-003 — Atomic Commits
Keep commits focused on one logical change.

---

## T29-004 — Pull Request Checklist
Every PR should include:

```text
What changed?
Why?
Tests?
Screenshots for UI?
Performance impact?
Security impact?
Privacy impact?
```

---

# 34. Definition of Done

A task is DONE only when:

```text
[ ] Implementation complete
[ ] Relevant tests pass
[ ] Type checks pass
[ ] Lint/format checks pass where configured
[ ] Error handling exists
[ ] Security impact reviewed
[ ] Privacy impact reviewed
[ ] Documentation updated where needed
[ ] UI verified where applicable
[ ] No unrelated changes
[ ] Acceptance criteria satisfied
```

For release-blocking tasks:

```text
[ ] Manual QA completed
[ ] Regression checked
```

---

# 35. Release Gates

## Sunday 0.1 Gate

```text
[ ] Desktop launches
[ ] Navigation works
[ ] Interview page exists
[ ] Preparation page exists
[ ] Resume page exists
[ ] Coding page exists
[ ] Settings exists
[ ] Overlay works
[ ] Secure Electron configuration
```

---

## Sunday 0.2 Gate

```text
[ ] FastAPI works
[ ] Ollama works
[ ] Local model works
[ ] Chat works
[ ] Streaming works
[ ] Electron/backend communication works
```

---

## Sunday 0.3 Gate

```text
[ ] Resume upload
[ ] PDF extraction
[ ] DOCX extraction
[ ] Chunking
[ ] Embeddings
[ ] FAISS indexing
[ ] Resume retrieval
```

---

## Sunday 0.4 Gate

```text
[ ] JD upload
[ ] JD indexing
[ ] Requirement extraction
[ ] Resume/JD profile
```

---

## Sunday 0.5 Gate

```text
[ ] RAG retrieval
[ ] Context builder
[ ] Prompt builder
[ ] Grounding controls
[ ] RAG evaluation tests
```

---

## Sunday 0.6 Gate

```text
[ ] Audio capture
[ ] WebSocket
[ ] VAD
[ ] faster-whisper
[ ] Partial transcript
[ ] Final transcript
```

---

## Sunday 0.7 Gate

```text
[ ] Question detection
[ ] Duplicate prevention
[ ] Resume-aware response
[ ] JD-aware response
[ ] Streaming suggested response
[ ] Overlay integration
[ ] Latency instrumentation
```

---

## Sunday 0.8 Gate

```text
[ ] Screen selection
[ ] Screenshot
[ ] OCR
[ ] Code extraction
[ ] Coding analysis
```

---

## Sunday 0.9 Gate

```text
[ ] ModelProvider abstraction
[ ] Ollama provider
[ ] OpenAI provider
[ ] Anthropic provider
[ ] Provider tests
```

---

## Sunday 1.0 Gate

```text
[ ] P0 tasks complete
[ ] Critical P1 tasks complete
[ ] Security review passed
[ ] Privacy review passed
[ ] Performance reviewed
[ ] Windows installer verified
[ ] Fresh install verified
[ ] Upgrade path tested
[ ] Documentation complete
[ ] Release notes complete
```

---

# 36. Suggested MVP Task Order

For the first implementation cycle, work exactly in this sequence:

```text
T00-001
Create Git Repository

        ↓

T00-003
Create AGENTS.md

        ↓

T02-001
Generate Electron Application

        ↓

T02-002
Configure Electron Security

        ↓

T02-006
Create Application Shell

        ↓

T02-007
Create Dashboard

        ↓

T02-009
Create Interview Page

        ↓

T02-015
Create Sunday Overlay

        ↓

T03-001
Create Python Backend

        ↓

T03-005
Health Endpoint

        ↓

T03-008
Electron ↔ Backend Connectivity

        ↓

T04-003
ModelProvider Interface

        ↓

T04-004
OllamaProvider

        ↓

T04-005
Chat API

        ↓

T04-007
Frontend AI Client

        ↓

T05-001
File Validation

        ↓

T06-003
Resume Ingestion Pipeline

        ↓

T07-003
JD Ingestion Pipeline

        ↓

T08-003
FAISS Implementation

        ↓

T08-007
Context Builder

        ↓

T08-008
Prompt Builder

        ↓

T09-001
Preparation Question Generator

        ↓

T10-001
Capture Source Discovery

        ↓

T10-004
Audio WebSocket

        ↓

T11-002
faster-whisper

        ↓

T11-005
Partial Transcript

        ↓

T12-002
Question Heuristics

        ↓

T12-008
Interview Service

        ↓

T12-009
Suggested Response

        ↓

T12-010
Streaming Suggested Response

        ↓

T13-002
Explicit Screen Capture

        ↓

T13-005
PaddleOCR

        ↓

T13-009
Coding Prompt

        ↓

T15-001
Provider Configuration

        ↓

T24-005
Windows Installer
```

---

# 37. First 10 Implementation Tasks

For a completely non-technical project owner, these are the first tasks to give OpenCode one at a time:

### Task 1

```text
Implement T00-001.
Create and initialize the Sunday repository.
```

### Task 2

```text
Implement T00-003.
Create AGENTS.md according to Development Rules.md.
```

### Task 3

```text
Implement T02-001.
Create the Sunday Electron application.
Do not add AI functionality yet.
```

### Task 4

```text
Implement T02-002.
Secure the Electron application.
```

### Task 5

```text
Implement T02-006.
Create the Sunday application shell and navigation.
```

### Task 6

```text
Implement T02-007 through T02-014.
Create the main Sunday screens using Design.md.
Do not implement backend logic yet.
```

### Task 7

```text
Implement T02-015 and T02-016.
Create the Sunday Overlay and keyboard shortcuts.
```

### Task 8

```text
Implement T03-001 through T03-008.
Create FastAPI and connect Sunday to its local backend.
```

### Task 9

```text
Implement T04-003 through T04-007.
Connect Sunday to Ollama with streaming responses.
```

### Task 10

```text
Implement T05-001 through T05-008.
Create the document infrastructure.
Do not implement live transcription yet.
```

---

# 38. Blocker Rules

Mark a task as `[-] Blocked` when:

- Required dependency is unavailable.
- Required hardware capability is unavailable.
- A security issue prevents safe implementation.
- Architecture needs a documented decision.
- A third-party dependency is incompatible.
- Acceptance criteria cannot be tested.

When blocked, add:

```text
Blocked by:
Reason:
Impact:
Possible resolution:
```

Do not silently skip blocked tasks.

---

# 39. Defect Severity

| Severity | Meaning |
|---|---|
| S0 | Data loss, security breach, unusable application |
| S1 | Core feature broken |
| S2 | Important feature degraded |
| S3 | Minor bug |
| S4 | Cosmetic/documentation issue |

Release blockers:

```text
S0
S1
Critical security defects
Critical privacy defects
```

---

# 40. Performance Regression Rules

A change must be investigated when it materially worsens:

```text
ASR latency
LLM first-token latency
RAG latency
memory usage
CPU/GPU usage
startup time
UI responsiveness
```

Performance improvements must not silently compromise:

- correctness
- privacy
- security
- grounding
- test coverage

---

# 41. AI Quality Regression Rules

Every change to prompts, retrieval, or model routing should be evaluated for:

```text
Grounding
Relevance
Hallucination
Response length
Latency
Consistency
```

Maintain a small representative question set for regression testing.

---

# 42. Final Sunday Work Sequence

The complete engineering sequence is:

```text
FOUNDATION
   ↓
DESKTOP
   ↓
BACKEND
   ↓
LOCAL AI
   ↓
DOCUMENTS
   ↓
RESUME
   ↓
JOB DESCRIPTION
   ↓
RAG
   ↓
PREPARATION
   ↓
AUDIO
   ↓
ASR
   ↓
QUESTION DETECTION
   ↓
INTERVIEW INTELLIGENCE
   ↓
OVERLAY
   ↓
CODING / OCR
   ↓
MULTI-MODEL
   ↓
DATABASE / HISTORY
   ↓
PRIVACY
   ↓
SECURITY
   ↓
PERFORMANCE
   ↓
TESTING
   ↓
PACKAGING
   ↓
RELEASE
```

---

# 43. Sunday North-Star Task

The final product should satisfy this end-to-end workflow:

```text
User
 ↓
Open Sunday
 ↓
Upload Resume
 ↓
Upload Job Description
 ↓
Prepare
 ↓
Start Sunday Session
 ↓
Capture supported audio
 ↓
Generate Live Transcript
 ↓
Detect Interview Question
 ↓
Retrieve Relevant Resume/JD Context
 ↓
Generate Grounded Suggested Response
 ↓
Stream Response to Sunday Overlay
 ↓
Optionally Analyze Selected Screen
 ↓
Store only data allowed by user settings
 ↓
End Session
```

The implementation should always preserve the central Sunday architecture:

```text
Simple User Experience
        ↓
Well-Bounded Services
        ↓
Local-First Processing
        ↓
Grounded AI
        ↓
Observable Real-Time Pipeline
        ↓
Secure Desktop Application
```
