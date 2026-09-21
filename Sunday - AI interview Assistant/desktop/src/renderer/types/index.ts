export interface AudioSource {
  id: string;
  name: string;
}

export interface ScreenSource {
  id: string;
  name: string;
  thumbnailDataURL: string;
}

export interface SundayAPI {
  app: {
    getVersion: () => Promise<string>;
  };
  overlay: {
    show: () => Promise<void>;
    hide: () => Promise<void>;
    toggle: () => Promise<void>;
  };
  audio: {
    getSources: () => Promise<AudioSource[]>;
  };
  screen: {
    getSources: () => Promise<ScreenSource[]>;
  };
}

declare global {
  interface Window {
    sunday: SundayAPI;
  }
}

export type InterviewStatus = 'idle' | 'listening' | 'processing' | 'error';
export type OverlayStatus = 'idle' | 'listening' | 'transcribing' | 'generating' | 'error';
export type DocumentStatus = 'idle' | 'uploading' | 'processing' | 'indexed' | 'error';

export interface TranscriptSegment {
  id: string;
  text: string;
  timestamp: number;
  isFinal: boolean;
}

export interface SuggestedResponse {
  answer: string;
  keyPoints: string[];
  followUp?: string;
}

export interface InterviewSession {
  id: string;
  title: string;
  type: 'preparation' | 'interview' | 'coding';
  resumeId?: string;
  jobDescriptionId?: string;
  model: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  type: 'resume' | 'job_description';
  filename: string;
  status: DocumentStatus;
  createdAt: string;
}

export interface Settings {
  provider: string;
  model: string;
  localOnlyMode: boolean;
  saveTranscript: boolean;
  theme: 'system' | 'light' | 'dark';
  overlayEnabled: boolean;
}
