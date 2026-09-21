import { useState, useCallback, useEffect } from 'react';
import { api } from '../services/api';

export interface AppState {
  backendStatus: 'checking' | 'connected' | 'disconnected';
  ollamaStatus: 'checking' | 'connected' | 'disconnected';
  model: string;
  sessionId: string | null;
}

export function useApp() {
  const [state, setState] = useState<AppState>({
    backendStatus: 'checking',
    ollamaStatus: 'checking',
    model: 'qwen3:8b',
    sessionId: null,
  });

  const checkHealth = useCallback(async () => {
    try {
      const res = await api.health();
      setState(s => ({
        ...s,
        backendStatus: 'connected',
        ollamaStatus: res.ai_healthy ? 'connected' : 'disconnected',
      }));
    } catch {
      setState(s => ({ ...s, backendStatus: 'disconnected', ollamaStatus: 'disconnected' }));
    }
  }, []);

  const startSession = useCallback(async (title?: string) => {
    try {
      const session = await api.createSession(title || 'Interview Session');
      setState(s => ({ ...s, sessionId: session.id }));
      return session.id;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  return { ...state, checkHealth, startSession };
}
