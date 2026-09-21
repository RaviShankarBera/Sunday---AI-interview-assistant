# Design — Sunday
## An Interview AI Assistant

**Document Status:** Draft  
**Version:** 1.0  
**Product:** Sunday  
**Tagline:** Your AI Interview Assistant  
**Target Platform:** Windows 10/11  
**Design Philosophy:** Calm, focused, professional, privacy-aware, fast

---

# 1. Design Vision

Sunday should feel like a **quiet personal assistant**, not an intimidating AI dashboard.

The product experience should communicate:

- Focus
- Confidence
- Clarity
- Speed
- Trust
- Privacy
- Professionalism

The interface should stay out of the user's way during an interview and become more informative during preparation.

The core design principle is:

> **Show the user what matters now, hide what does not.**

Sunday has two different UX states:

```text
PREPARATION
Rich information
More controls
More analysis
More navigation

                ↓

LIVE INTERVIEW
Minimal information
Fast scanning
Low visual noise
Immediate answers
```

---

# 2. Brand Identity

## 2.1 Product Name

```text
Sunday
```

## 2.2 Product Descriptor

```text
An Interview AI Assistant
```

## 2.3 Suggested Tagline

```text
Your AI Interview Assistant
```

Alternative product messaging may be tested later, but the primary interface should use the simple product name:

```text
Sunday
```

---

# 3. Brand Personality

Sunday should feel:

```text
Calm
Helpful
Intelligent
Modern
Professional
Private
Unobtrusive
```

Avoid:

```text
Aggressive
Overly futuristic
Corporate-heavy
Gamified
Cluttered
Flashy
```

The visual language should resemble a premium productivity tool rather than a gaming overlay.

---

# 4. Design Principles

## DP-001 — Clarity

Every screen should have one obvious primary action.

Examples:

```text
Dashboard
→ Start Interview

Preparation
→ Prepare My Interview

Resume
→ Upload Resume

Coding
→ Analyze Screen
```

---

## DP-002 — Minimal Cognitive Load

During live use, the user should not need to interpret complex UI.

Prioritize:

```text
Question
Suggested Response
Key Points
Status
```

Everything else should be secondary.

---

## DP-003 — Speed

The UI must react immediately to:

- Starting capture
- Stopping capture
- New transcript
- Question detection
- AI generation
- Screen analysis

Use visible micro-states rather than leaving the user wondering whether Sunday is working.

---

## DP-004 — Context First

The interface should communicate why a response was generated.

Example:

```text
Suggested Response

Based on:
Resume + Job Description
```

This creates transparency without overwhelming the user with technical details.

---

## DP-005 — Privacy Is Visible

Privacy should not be hidden only inside settings.

For example:

```text
● Local Only
```

or:

```text
Cloud AI: OpenAI
```

should be visible whenever relevant.

---

## DP-006 — Human-Centered AI

Do not make the AI output look authoritative when information is uncertain.

Use language such as:

```text
Suggested Response
```

not:

```text
Correct Answer
```

The product assists the user; it does not claim certainty.

---

# 5. Design System

## 5.1 Typography

Recommended primary font:

```text
Inter
```

Fallback:

```text
Segoe UI
system-ui
sans-serif
```

Typography scale:

| Token | Size | Usage |
|---|---:|---|
| Display | 32 px | Major dashboard greeting |
| H1 | 26 px | Main page heading |
| H2 | 20 px | Section heading |
| H3 | 16 px | Card heading |
| Body | 14–16 px | Main content |
| Small | 12–13 px | Metadata |
| Micro | 11 px | Status/latency |

Font weights:

```text
400 Regular
500 Medium
600 Semibold
700 Bold
```

Avoid using 700+ weights for large areas of UI.

---

# 6. Color System

The exact visual palette should be implemented through design tokens so it can be changed globally.

Recommended semantic tokens:

```text
--bg-primary
--bg-secondary
--bg-elevated
--bg-overlay

--text-primary
--text-secondary
--text-muted
--text-inverse

--border-subtle
--border-default
--border-strong

--accent
--accent-hover
--accent-soft

--success
--warning
--error
--info
```

The interface should support both dark and light themes.

---

# 7. Dark Theme Direction

Dark mode is the default theme for the live overlay because it reduces visual distraction.

Visual hierarchy:

```text
Page background
↓
Elevated cards
↓
Primary content
↓
Secondary information
```

The dark interface should use subtle elevation rather than excessive borders.

Avoid:

- Pure black everywhere
- Excessive glow
- Neon gradients
- Excessive shadows

---

# 8. Light Theme Direction

Light mode should use:

```text
Soft neutral background
White/near-white elevated cards
Dark readable text
Subtle borders
Reserved accent usage
```

Light mode is especially appropriate for:

- Resume editing
- Preparation
- Settings
- Session history

---

# 9. Spacing System

Use a consistent 4 px base scale.

```text
4
8
12
16
20
24
32
40
48
64
```

Recommended usage:

```text
4–8 px
Micro spacing

12–16 px
Control spacing

20–24 px
Card padding

32–40 px
Section spacing

48–64 px
Major page spacing
```

---

# 10. Border Radius

Recommended:

```text
Small controls       8 px
Inputs               10 px
Cards                12–16 px
Large containers     16–20 px
Overlay              16 px
Pills                999 px
```

Avoid excessive rounded corners on every element.

---

# 11. Shadows

Use shadows mainly for:

- Overlay
- Dropdowns
- Modals
- Floating panels

Cards in the main dashboard should rely primarily on spacing and subtle borders.

---

# 12. Iconography

Use one consistent icon library throughout the application.

Recommended:

```text
Lucide
```

Icon characteristics:

- Simple
- Outline-based
- Consistent stroke width
- Clear at small sizes

Avoid mixing icon styles.

---

# 13. Motion Design

Animations should be subtle.

Recommended durations:

```text
Fast:     100–150 ms
Normal:   150–250 ms
Slow:     250–400 ms
```

Use animation for:

- Panel appearance
- Overlay movement
- Status changes
- Progress
- Streaming answer transitions

Avoid:

- Large bouncing animations
- Constant pulsing
- Distracting gradients
- Motion during answer reading

The live overlay should feel calm.

---

# 14. Application Shell

The main desktop application should use a left navigation rail.

Recommended structure:

```text
┌───────────────────────────────────────────────────────┐
│ SUNDAY                                                │
├───────────────┬───────────────────────────────────────┤
│               │                                       │
│  Home         │                                       │
│  Preparation  │            Main Content               │
│  Interview    │                                       │
│  Coding       │                                       │
│  Resume       │                                       │
│  Job Description │                                    │
│  History      │                                       │
│               │                                       │
│  Settings     │                                       │
│               │                                       │
└───────────────┴───────────────────────────────────────┘
```

Sidebar width:

```text
220–240 px
```

On narrow application windows, collapse to icons with tooltips.

---

# 15. Top Bar

The top bar should be minimal.

Example:

```text
┌─────────────────────────────────────────────────────┐
│ Sunday          Interview / Preparation      ● Local│
└─────────────────────────────────────────────────────┘
```

Potential right-side controls:

- Privacy mode
- AI model
- Notifications
- Settings

During live interview mode, keep the top bar especially quiet.

---

# 16. Dashboard Design

The dashboard should greet the user without becoming overly personalized.

Example:

```text
┌──────────────────────────────────────────────────────┐
│ Good afternoon                                       │
│ Ready for your next interview?                       │
│                                                      │
│  ┌────────────────────┐  ┌────────────────────────┐  │
│  │ Interview          │  │ Preparation            │  │
│  │                    │  │                        │  │
│  │ Start a session    │  │ Prepare for a role     │  │
│  │                    │  │                        │  │
│  │ [ Start → ]        │  │ [ Prepare → ]          │  │
│  └────────────────────┘  └────────────────────────┘  │
│                                                      │
│ Recent Sessions                                      │
│                                                      │
│ Senior QA Engineer            Today                  │
│ SAP Test Automation           Yesterday              │
│ Software Engineer             Sep 18                 │
└──────────────────────────────────────────────────────┘
```

The two primary actions should visually dominate the page.

---

# 17. Preparation Page

The preparation page should use a three-stage workflow.

```text
1. Your Resume
        ↓
2. Target Job
        ↓
3. Prepare
```

Progress indicator:

```text
Resume ✓  →  Job Description ✓  →  Ready ✓
```

---

# 18. Resume Page

The resume page should have:

```text
┌─────────────────────────────────────────────────┐
│ Resume                                          │
│ Your experience gives Sunday context.           │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │                                             │ │
│ │            Drop resume here                │ │
│ │                                             │ │
│ │      PDF, DOCX or TXT                      │ │
│ │                                             │ │
│ │           [ Choose File ]                  │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Recent Resume                                   │
│ ✓ John_Doe_Resume.pdf                           │
│   Indexed · 24 sections                         │
└─────────────────────────────────────────────────┘
```

After processing:

```text
✓ Uploaded
✓ Text extracted
✓ Indexed
```

---

# 19. Job Description Page

Design similarly to Resume.

Show extracted information in cards:

```text
Role
Senior QA Automation Engineer

Core Skills
SAP
Tosca
API Testing
Azure DevOps

Experience
5+ years

Responsibilities
Automation
Test Strategy
Defect Management
```

This lets the user verify that Sunday understood the job description.

---

# 20. Preparation Results

Use tabs:

```text
Overview
Questions
Technical
Behavioral
Resume
Follow-ups
```

Overview example:

```text
Your Preparation

Role:
Senior QA Automation Engineer

Key Areas
• SAP testing
• Automation
• API testing
• Azure DevOps

Focus Areas
3

Likely Questions
18
```

---

# 21. Question Card

A preparation question card:

```text
┌────────────────────────────────────────────┐
│ Tell me about your SAP testing experience.│
│                                            │
│ Suggested structure                        │
│                                            │
│ 1. Context                                 │
│ 2. Responsibility                          │
│ 3. Actions                                 │
│ 4. Result                                  │
│                                            │
│ [ Practice Answer ]   [ Show Suggestion ] │
└────────────────────────────────────────────┘
```

---

# 22. Mock Interview Design

Mock interview mode should feel conversational.

```text
┌────────────────────────────────────────────┐
│ Sunday Mock Interview                      │
├────────────────────────────────────────────┤
│                                            │
│ Sunday                                     │
│                                            │
│ Tell me about yourself.                    │
│                                            │
│                                00:42       │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │ Type your response...                  │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ [ Submit Response ]                        │
└────────────────────────────────────────────┘
```

After submission:

```text
Response Review

Clarity            Strong
Relevance          Strong
Specificity        Could improve

Missing:
• Quantified result
• Specific example

[ Continue ]
```

This feedback should remain specific and constructive.

---

# 23. Interview Page

Before starting:

```text
┌──────────────────────────────────────────────┐
│ Interview Session                            │
├──────────────────────────────────────────────┤
│                                              │
│ Resume                                       │
│ [ John_Doe_Resume ✓ ]                        │
│                                              │
│ Job Description                              │
│ [ Senior QA Engineer ✓ ]                     │
│                                              │
│ AI Model                                     │
│ [ Sunday Local — Qwen3 8B ▼ ]                │
│                                              │
│ Privacy                                      │
│ ● Local Only                                 │
│                                              │
│              [ Start Interview ]             │
└──────────────────────────────────────────────┘
```

---

# 24. Active Interview Screen

The main window can show a richer dashboard:

```text
┌────────────────────────────────────────────────────────┐
│ SUNDAY        Interview Session            ● Listening │
├──────────────────────┬─────────────────────────────────┤
│ Live Transcript      │ Suggested Response              │
│                      │                                 │
│ Can you explain      │ I've worked extensively with   │
│ your experience...   │ SAP SD, particularly around    │
│                      │ Order-to-Cash...                │
│                      │                                 │
├──────────────────────┴─────────────────────────────────┤
│ Key Points                                               │
│ SAP SD · Order-to-Cash · Testing · Automation           │
└─────────────────────────────────────────────────────────┘
```

---

# 25. Live Overlay Design

The overlay is the most important design surface during live use.

It should prioritize:

```text
1. Question
2. Suggested Response
3. Key Points
4. Status
```

Recommended compact layout:

```text
┌────────────────────────────────────┐
│ SUNDAY                    ● 1.7s   │
├────────────────────────────────────┤
│ QUESTION                           │
│                                    │
│ Tell me about your experience      │
│ with Azure DevOps.                 │
│                                    │
├────────────────────────────────────┤
│ SUGGESTED RESPONSE                 │
│                                    │
│ I've used Azure DevOps for CI/CD, │
│ work tracking, repositories and    │
│ release pipelines...              │
│                                    │
├────────────────────────────────────┤
│ KEY POINTS                         │
│ • CI/CD                            │
│ • Pipelines                        │
│ • Git                              │
│ • Azure Boards                     │
└────────────────────────────────────┘
```

---

# 26. Overlay Visual Priority

The hierarchy should be:

```text
Question
████████████████████

Suggested Response
████████████████████
████████████████████
████████████████████

Key Points
████████
```

Use the most visual space for the response.

The question should be easy to identify but not dominate the overlay.

---

# 27. Overlay States

The overlay must support these states:

### Idle

```text
SUNDAY
Ready
```

### Listening

```text
● Listening
```

### Transcribing

```text
● Transcribing
```

### Question Detected

```text
Question detected
```

### Generating

```text
Generating response...
```

### Streaming

```text
Suggested Response
I have worked...
```

### Complete

```text
Suggested Response
...
```

### Error

```text
Something went wrong
[ Retry ]
```

---

# 28. Transcript Design

Transcript should be secondary to the answer.

Use:

```text
LIVE TRANSCRIPT
```

with subtle text styling.

Example:

```text
INTERVIEWER

Can you explain how you handled a difficult
production issue?
```

Avoid placing every audio fragment into a large scrolling region.

Show the most recent useful segment.

---

# 29. Suggested Response Design

The response should be optimized for quick reading.

Use:

```text
SUGGESTED RESPONSE
```

and a readable paragraph width.

Use line breaks when useful.

Avoid long walls of text.

Preferred:

```text
I've worked with SAP SD primarily around
Order-to-Cash processes.

In one project, I focused on...
```

instead of a single 200-word paragraph.

---

# 30. Key Points Design

Key points should be short:

```text
• SAP SD
• Order-to-Cash
• Automation
• Testing
```

Maximum recommended default:

```text
3–5 key points
```

---

# 31. Latency Display

During development and optionally in production, show:

```text
1.7s
```

rather than:

```text
Latency: 1,732ms
```

Use a tooltip for the detailed breakdown.

Example:

```text
1.7s
```

Tooltip:

```text
ASR        720ms
Retrieval   18ms
AI         960ms
UI          12ms
```

---

# 32. Coding Page

Coding Mode should provide three major areas:

```text
┌────────────────────────────────────────────────────┐
│ Coding Mode                                        │
├─────────────────────┬──────────────────────────────┤
│ Captured Screen     │ Analysis                     │
│                     │                              │
│ [ screenshot ]      │ Approach                     │
│                     │ ...                          │
│                     │                              │
│                     │ Complexity                   │
│                     │ O(n)                         │
│                     │                              │
│                     │ Potential Issues             │
│                     │ ...                          │
├─────────────────────┴──────────────────────────────┤
│ [ Capture Screen ] [ Analyze ] [ Clear ]           │
└────────────────────────────────────────────────────┘
```

---

# 33. Screen Capture Control

The control should make capture state obvious.

Idle:

```text
[ Capture Screen ]
```

Capturing:

```text
[ Capturing... ]
```

Complete:

```text
✓ Screen Captured
```

Never leave the user guessing whether the screen is being captured.

---

# 34. History Page

History should feel like a searchable library.

```text
┌────────────────────────────────────────────────────┐
│ History                          [ Search ]         │
├────────────────────────────────────────────────────┤
│                                                    │
│ Today                                              │
│                                                    │
│ Senior QA Engineer Interview       18 questions   │
│                                                    │
│ Yesterday                                          │
│                                                    │
│ SAP Automation Interview           24 questions   │
│                                                    │
└────────────────────────────────────────────────────┘
```

Clicking a session opens:

```text
Session Summary
Questions
Suggested Responses
Preparation Notes
Performance Data
```

Only show persisted data according to the user's privacy settings.

---

# 35. Settings Design

Use categorized sections rather than one long form.

```text
Settings

AI
├── Provider
├── Model
├── Response style
└── Response length

Interview
├── Auto question detection
├── Transcript
└── Key points

Capture
├── Audio source
└── Screen capture

Privacy
├── Local-only mode
├── Save transcripts
└── Clear data

Appearance
├── Theme
├── Overlay
└── Shortcuts
```

---

# 36. Model Selector

Model selector should clearly communicate local/cloud status.

Example:

```text
AI Model

◉ Sunday Local
  Qwen3 8B
  Local

○ Sunday Local
  gpt-oss 20B
  Local

○ OpenAI
  Cloud

○ Anthropic
  Cloud
```

Do not hide cloud status.

---

# 37. Privacy Indicator

Use a compact badge:

```text
● Local Only
```

Cloud mode:

```text
● Cloud: OpenAI
```

Hybrid:

```text
● Hybrid
```

The indicator should use both text and a visual marker so color is not the only signal.

---

# 38. Onboarding

First launch should take the user through approximately four steps.

```text
Welcome
   ↓
Choose AI Mode
   ↓
Add Resume
   ↓
Ready
```

Example:

```text
Welcome to Sunday

Your AI Interview Assistant

Sunday can prepare interviews and organize
your resume and job-specific context.

[ Continue ]
```

---

# 39. First-Run Local AI Setup

If Ollama is not available:

```text
Sunday needs a local AI model.

Status:
✕ Ollama not detected

[ Check Again ]

Optional:
Use a configured cloud provider
```

Do not silently download large models.

Provide model size and disk requirements when asking the user to install one.

---

# 40. Empty States

Every empty state should provide an action.

### No Resume

```text
No resume yet.

Add your resume so Sunday can personalize
interview preparation and responses.

[ Upload Resume ]
```

### No Job Description

```text
No job description yet.

Add the target role to make preparation more specific.

[ Add Job Description ]
```

### No History

```text
No sessions yet.

Start preparing or begin an interview session.

[ Get Started ]
```

---

# 41. Loading States

Avoid generic:

```text
Loading...
```

Prefer specific states:

```text
Reading resume...
Creating searchable context...
Analyzing job description...
Listening...
Transcribing...
Finding relevant experience...
Generating suggested response...
Analyzing screen...
```

Specific wording builds trust.

---

# 42. Error States

Errors should contain:

```text
What happened
What the user can do
Retry action
```

Example:

```text
Sunday couldn't connect to the local AI model.

Check that Ollama is running and the selected
model is installed.

[ Retry ]
```

Do not expose raw stack traces in normal user UI.

---

# 43. Notifications

Use lightweight notifications.

Examples:

```text
Resume indexed successfully
```

```text
Job description ready
```

```text
Local AI model is ready
```

Avoid persistent notification banners unless action is required.

---

# 44. Modal Design

Use modals only for:

- Destructive actions
- Important setup steps
- Explicit source selection
- Provider configuration

Avoid modal overload.

---

# 45. Confirmation Dialogs

For data deletion:

```text
Delete session?

This will permanently remove the saved session
from this computer.

[ Cancel ]  [ Delete Session ]
```

For clear-all:

```text
Clear all Sunday data?

This can remove resumes, job descriptions,
sessions, indexes, and saved settings.

[ Cancel ]  [ Clear Data ]
```

---

# 46. Accessibility

Sunday should meet strong desktop accessibility standards.

Requirements:

- Full keyboard navigation
- Visible focus states
- Minimum readable text size
- Sufficient contrast
- Avoid color-only status indicators
- Screen-reader-friendly labels where applicable
- Logical tab order
- Reduced-motion option

Keyboard users must be able to complete the main preparation workflow without a mouse.

---

# 47. Keyboard Navigation

Recommended application shortcuts:

```text
Ctrl + 1
Dashboard

Ctrl + 2
Preparation

Ctrl + 3
Interview

Ctrl + 4
Coding

Ctrl + ,
Settings

Ctrl + Space
Show/Hide Overlay
```

Context-sensitive live controls:

```text
Ctrl + Shift + A
Start/Stop Audio

Ctrl + Shift + S
Analyze Screen

Ctrl + Shift + R
Regenerate Response
```

---

# 48. Responsive Desktop Behavior

The application is desktop-first.

Recommended minimum window:

```text
1100 × 700
```

At narrower widths:

```text
Sidebar → Collapsed
Cards → Stack
Two-column layouts → Single-column
```

The overlay should remain usable at much smaller sizes.

---

# 49. Overlay Sizing

Recommended defaults:

```text
Width:
360–460 px

Height:
420–650 px
```

Minimum size:

```text
320 × 360 px
```

The user should be able to resize it.

---

# 50. Overlay Positioning

Default:

```text
Right side of primary display
```

Remember user position between sessions.

Support:

```text
Move
Resize
Reset position
Reset size
```

---

# 51. Overlay Interaction

Provide:

```text
Drag title bar
Resize edges/corners
Collapse
Expand
Hide
Pin
```

Do not overload the overlay with configuration controls.

Settings remain in the main application.

---

# 52. Component Library

Create reusable components:

```text
Button
IconButton
Input
Textarea
Select
Dropdown
Card
Badge
Pill
Tabs
Tooltip
Modal
Toast
Progress
Spinner
Skeleton
EmptyState
ErrorState
StatusIndicator
FileUploader
DocumentCard
QuestionCard
AnswerCard
TranscriptCard
KeyPointList
ModelSelector
PrivacyBadge
SessionCard
```

---

# 53. Core Feature Components

Recommended feature-specific components:

```text
ResumeUploader
ResumeStatus
JobDescriptionUploader
JobSummary
PreparationQuestion
MockInterviewPanel
InterviewStatus
TranscriptPanel
QuestionCard
SuggestedAnswer
KeyPoints
LatencyIndicator
AudioControl
ScreenCaptureControl
CodingAnalysis
OverlayPanel
SessionHistory
```

---

# 54. Component Naming

Use semantic names.

Good:

```text
SuggestedAnswer
InterviewStatus
ResumeUploader
```

Avoid:

```text
Box1
Card2
PanelThing
BlueBox
```

The component name should communicate its purpose.

---

# 55. Content Design

Use direct language.

Prefer:

```text
Start Interview
```

over:

```text
Initialize Interview Session
```

Prefer:

```text
Upload Resume
```

over:

```text
Import Candidate Curriculum Vitae
```

Prefer:

```text
Suggested Response
```

over:

```text
AI Generated Answer Output
```

---

# 56. AI Output UX

AI responses should always distinguish between:

```text
Suggested Response
```

and:

```text
Key Points
```

Optional:

```text
Why this fits
```

For example:

```text
Suggested Response

"I've worked extensively with..."

Key Points
• SAP SD
• Testing
• Automation

Context
Resume + Job Description
```

---

# 57. Confidence and Uncertainty

Do not create a misleading numerical "AI confidence score" unless the underlying model supports a meaningful metric.

Instead use language such as:

```text
Based on your resume
```

```text
Relevant resume context found
```

```text
Limited matching experience found
```

This is easier for users to understand.

---

# 58. Prompt/Context Transparency

When practical, show compact source metadata:

```text
Based on:
Resume · 2 sections
Job Description · 3 sections
```

Allow an expandable detail view for advanced users.

---

# 59. Preparation vs Live UX

## Preparation

Prioritize:

```text
Discovery
Analysis
Practice
Review
```

## Live

Prioritize:

```text
Speed
Legibility
Minimal interaction
Minimal motion
```

This distinction must be preserved throughout the UI.

---

# 60. Visual Density

### Preparation pages

Moderate density:

```text
Cards
Tables
Tabs
Explanations
```

### Live overlay

Low density:

```text
Question
Response
Key points
Status
```

### Settings

Low-to-moderate density.

---

# 61. Design Token Architecture

Use centralized tokens.

Example:

```css
:root {
  --color-bg-primary: ...;
  --color-bg-secondary: ...;
  --color-bg-elevated: ...;

  --color-text-primary: ...;
  --color-text-secondary: ...;
  --color-text-muted: ...;

  --color-accent: ...;
  --color-success: ...;
  --color-warning: ...;
  --color-error: ...;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;
}
```

Exact values should be finalized during implementation.

---

# 62. Design File Structure

Recommended frontend design structure:

```text
desktop/src/renderer/
├── components/
├── features/
│   ├── dashboard/
│   ├── preparation/
│   ├── interview/
│   ├── coding/
│   ├── resume/
│   ├── jobDescription/
│   ├── history/
│   └── settings/
│
├── styles/
│   ├── tokens.css
│   ├── themes.css
│   ├── globals.css
│   └── typography.css
│
└── assets/
    ├── icons/
    └── illustrations/
```

---

# 63. Visual QA Rules

Every UI milestone should be checked for:

```text
□ Alignment
□ Spacing
□ Typography
□ Contrast
□ Focus states
□ Hover states
□ Disabled states
□ Loading states
□ Error states
□ Empty states
□ Long text
□ Window resizing
□ Keyboard navigation
```

---

# 64. Antigravity Design Testing Workflow

Antigravity should be used to visually test:

```text
Dashboard
Preparation
Resume upload
Job upload
Interview page
Overlay
Coding page
Settings
History
```

For every significant UI change:

```text
Open page
→ Inspect layout
→ Resize window
→ Test interactions
→ Test loading state
→ Test error state
→ Capture visual issues
→ Fix
```

---

# 65. OpenCode UI Rules

When asking OpenCode to implement UI:

```text
Use existing design tokens.

Do not create one-off colors.

Do not create one-off spacing values
unless justified.

Use reusable components.

Keep business logic outside presentation components.

Keep UI state explicit.

Use accessible labels.

Implement loading, empty, success,
disabled, and error states.

Do not redesign unrelated screens.
```

---

# 66. Design Review Checklist

Before accepting a screen:

```text
□ Is the primary action obvious?
□ Is the most important information most visible?
□ Is there enough whitespace?
□ Are labels understandable?
□ Are states clear?
□ Is the design consistent with Sunday?
□ Does the screen work in dark mode?
□ Does the screen work in light mode?
□ Does keyboard navigation work?
□ Does the screen remain usable when resized?
```

---

# 67. Visual Brand Rule

Sunday should not look like a generic AI chatbot.

Avoid overusing:

```text
Chat bubbles
Robot illustrations
Glowing brains
Circuit patterns
Excessive AI sparkles
```

Instead, emphasize:

```text
Editorial typography
Clean cards
Clear hierarchy
Professional controls
Minimal animation
```

---

# 68. Logo Direction

Initial logo concept:

```text
SUNDAY
```

with a simple geometric mark.

Possible concept:

- Rounded "S"
- Minimal sunrise arc
- Soft circular form

The identity should work at:

```text
16 px
24 px
32 px
64 px
```

Avoid complex logo details.

---

# 69. Icon/Logo Usage

Use:

```text
Sunday logo
```

in:

- Splash/startup
- Sidebar
- Overlay title
- About page
- Installer icon
- Application icon

Do not repeatedly display the full product tagline in compact contexts.

---

# 70. Startup Screen

Suggested startup:

```text
        SUNDAY

  Your AI Interview Assistant

        ● Starting...
```

Once ready:

```text
        SUNDAY

  Ready when you are.

        [ Continue ]
```

Keep startup under a few seconds where practical.

---

# 71. Tray Design

The system tray menu may contain:

```text
Sunday

● Ready

Show Sunday
Start Interview
Open Dashboard
Settings
Quit
```

Avoid using the tray to hide the application from operating-system monitoring or other system visibility.

The tray is a usability feature only.

---

# 72. Notification Design

Examples:

```text
✓ Resume indexed
```

```text
✓ Job description ready
```

```text
● Interview started
```

```text
⚠ Local model unavailable
```

Keep notifications short and actionable.

---

# 73. Design for Long Responses

Long AI output must not break the layout.

Use:

```text
Scrollable content
Maximum line width
Paragraph spacing
Copy action
```

The live overlay should prefer shortened output.

---

# 74. Copy Action

Suggested response should provide:

```text
Copy
```

on hover or at the bottom of the answer card.

Optional:

```text
Regenerate
```

Do not make the action bar visually dominant.

---

# 75. Answer Refresh

When regeneration is requested:

```text
Current answer
      ↓
Fade/replace
      ↓
Generating...
      ↓
New streamed answer
```

Avoid abrupt UI jumps.

---

# 76. Clipboard Design

Copy actions should provide a confirmation:

```text
Copied
```

Do not show a large popup.

---

# 77. Search Design

History and documents should use:

```text
Search
```

with clear placeholder text.

Example:

```text
Search sessions...
```

Do not use vague placeholders such as:

```text
Type here...
```

---

# 78. File Upload UX

Use drag-and-drop plus button selection.

States:

```text
Idle
Hover
Uploading
Processing
Indexed
Error
```

Example:

```text
Drop your resume here
or

[ Choose File ]
```

During processing:

```text
Reading resume...
██████████████░░░
```

---

# 79. Progress Indicators

Progress should reflect meaningful phases.

Resume:

```text
Upload
✓
Extract
✓
Index
●
Ready
```

Avoid fake progress percentages when exact progress is unavailable.

---

# 80. Privacy UX

Privacy settings should include plain-language explanations.

Example:

```text
Local-only mode

When enabled, Sunday uses configured local
services for AI processing where supported.

[ ON ]
```

Cloud mode:

```text
Your selected AI provider may receive the
content needed to generate a response.

[ Configure Provider ]
```

---

# 81. Destructive Action Design

Destructive buttons should be visually distinct but not dramatic.

Examples:

```text
Delete Session
Clear All Data
Remove Resume
```

Require confirmation for destructive data operations.

---

# 82. Theme Switching

Theme options:

```text
System
Light
Dark
```

Default:

```text
System
```

During live interview mode, allow the user to force dark overlay independently if desired.

---

# 83. Reduced Motion

Respect:

```text
prefers-reduced-motion
```

and provide a Sunday setting:

```text
Reduce motion
[ ON / OFF ]
```

When enabled:

- Disable nonessential animations
- Avoid pulsing
- Use instant or low-duration transitions

---

# 84. Live Status Indicator

The status indicator should combine icon, text, and optional motion.

Example:

```text
● Listening
```

```text
● Transcribing
```

```text
● Generating
```

Do not rely solely on a green/red dot.

---

# 85. Accessibility Color Rule

Never communicate status using only color.

Bad:

```text
green = ready
red = error
```

Preferred:

```text
✓ Ready
⚠ Attention
× Error
```

Color can reinforce the meaning but must not be the only signal.

---

# 86. Keyboard Focus

Focus rings should always be visible.

Example:

```text
┌────────────────────┐
│ Start Interview    │
└────────────────────┘
```

When focused:

```text
┏━━━━━━━━━━━━━━━━━━━━┓
┃ Start Interview    ┃
┗━━━━━━━━━━━━━━━━━━━━┛
```

The exact visual treatment should match the final theme.

---

# 87. Design Language for AI States

Use:

```text
Preparing...
Analyzing...
Searching your context...
Generating...
Ready
```

Avoid overly anthropomorphic status language such as:

```text
Thinking really hard...
My brain is working...
```

Keep the product professional.

---

# 88. Design for Failure

Every major feature must have:

```text
Success
Loading
Empty
Error
Disabled
Permission denied
```

For capture features also include:

```text
Source unavailable
Source disconnected
Stopped
Reconnecting
```

---

# 89. Screen Analysis UX

Before analysis:

```text
Select a screen or window

[ Capture Screen ]
```

After capture:

```text
Screen Captured

Detected:
Python
Problem statement
Code

[ Analyze ]
```

During analysis:

```text
Reading screen...
Analyzing code...
```

Results:

```text
Approach
Complexity
Issues
Improvements
```

---

# 90. Session End UX

When an interview ends:

```text
Session Complete

Questions detected
18

Suggested responses
16

Duration
42 min

[ View Summary ]
[ Start New Session ]
```

If history saving is disabled:

```text
Session data was not saved because
your privacy setting is enabled.
```

---

# 91. Summary Page

Preparation/interview summary:

```text
Session Summary

Role
Senior QA Engineer

Questions
18

Most discussed topics
• SAP
• Automation
• API Testing

Saved data
Based on your privacy settings
```

Do not invent performance metrics without real measurements.

---

# 92. Design Quality Bar

Sunday should visually communicate:

```text
Premium
but not flashy

Intelligent
but not intimidating

Powerful
but not complicated

Private
but not technical

Fast
but not frantic
```

---

# 93. Implementation Priority

Build the visual system in this order:

```text
1. Design tokens
2. Typography
3. Global layout
4. Navigation
5. Buttons/inputs
6. Cards
7. Status components
8. Dashboard
9. Resume
10. Job Description
11. Preparation
12. Interview
13. Overlay
14. Coding
15. History
16. Settings
17. Onboarding
18. Empty/error/loading states
19. Accessibility
20. Visual QA
```

---

# 94. Design-to-Code Rules

Every new UI feature should:

```text
1. Reuse existing tokens.
2. Reuse existing components.
3. Add a new component only when reusable.
4. Avoid inline arbitrary styling.
5. Support dark/light themes.
6. Support keyboard navigation.
7. Define all important states.
8. Keep presentation separate from business logic.
9. Test at multiple window sizes.
10. Verify visual consistency.
```

---

# 95. Sunday Visual Reference

The overall design should follow this hierarchy:

```text
                     SUNDAY
                        │
          ┌─────────────┴─────────────┐
          │                           │
     PREPARATION                    LIVE
          │                           │
       Explore                     Focus
       Practice                   Respond
       Review                    Minimal UI
          │                           │
          └─────────────┬─────────────┘
                        │
                        ▼
                 Clear AI Output
```

The central experience is never the technology.

It is:

```text
Question
      ↓
Context
      ↓
Suggested Response
```

---

# 96. Final Design Principle

Sunday should feel like a calm workspace sitting beside the user.

The product should not compete for attention.

The main design objective is:

> **When Sunday is helping, the user should immediately understand what Sunday heard, what context it used, and what response it suggests.**

The interface should make those three things obvious while keeping everything else secondary.
