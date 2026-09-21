const API_BASE = 'http://127.0.0.1:8001/api/v1';
const WS_BASE = 'ws://127.0.0.1:8001';

async function request(path: string, options: RequestInit = {}): Promise<any> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail || error.error?.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  health: () => request('/health'),

  chat: (messages: { role: string; content: string }[], model?: string) =>
    request('/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, model: model || 'qwen3:8b' }),
    }),

  models: () => request('/models'),

  uploadDocument: async (file: File, docType: string = 'resume') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('doc_type', docType);
    const res = await fetch(`${API_BASE}/documents/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(error.detail || `Upload failed`);
    }
    return res.json();
  },

  listDocuments: (docType?: string) =>
    request(`/documents${docType ? `?doc_type=${docType}` : ''}`),

  deleteDocument: (docId: string) =>
    request(`/documents/${docId}`, { method: 'DELETE' }),

  askQuestion: (question: string, sessionId?: string, responseStyle?: string) =>
    request('/interview/ask', {
      method: 'POST',
      body: JSON.stringify({ question, session_id: sessionId, response_style: responseStyle }),
    }),

  clearContext: () => request('/interview/clear-context', { method: 'POST' }),

  createSession: (title?: string, type?: string) =>
    request(`/sessions?title=${encodeURIComponent(title || 'Untitled')}&session_type=${type || 'interview'}`, {
      method: 'POST',
    }),

  listSessions: () => request('/sessions'),

  getSession: (id: string) => request(`/sessions/${id}`),

  deleteSession: (id: string) => request(`/sessions/${id}`, { method: 'DELETE' }),

  generatePreparation: (topic: string = 'general') =>
    request('/preparation/generate', {
      method: 'POST',
      body: JSON.stringify({ topic }),
    }),

  answerDraft: (question: string) =>
    request('/preparation/answer-draft', {
      method: 'POST',
      body: JSON.stringify({ question }),
    }),

  analyzeResponse: (question: string, response: string) =>
    request('/preparation/analyze', {
      method: 'POST',
      body: JSON.stringify({ question, response }),
    }),

  getSettings: () => request('/settings'),

  updateSettings: (updates: { key: string; value: string }[]) =>
    request('/settings', {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  analyzeScreen: () => request('/screen/analyze', { method: 'POST' }),
};

export class SundayWebSocket {
  private ws: WebSocket | null = null;
  private handlers: Map<string, Function[]> = new Map();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  connect(clientId: string = 'sunday') {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(`${WS_BASE}/ws/transcribe`);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.emit('connected', {});
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.emit(data.type, data);
      } catch (e) {
        console.error('WebSocket message parse error:', e);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.emit('disconnected', {});
      this.reconnectTimer = setTimeout(() => this.connect(clientId), 3000);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  disconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
  }

  send(message: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  on(event: string, handler: Function) {
    if (!this.handlers.has(event)) this.handlers.set(event, []);
    this.handlers.get(event)!.push(handler);
  }

  off(event: string, handler: Function) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      this.handlers.set(event, handlers.filter(h => h !== handler));
    }
  }

  private emit(event: string, data: any) {
    this.handlers.get(event)?.forEach(h => h(data));
  }
}

export const ws = new SundayWebSocket();
