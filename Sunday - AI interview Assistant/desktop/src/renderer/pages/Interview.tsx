import { useState, useEffect, useRef } from 'react';
import { api, ws } from '../services/api';

export default function Interview() {
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing'>('idle');
  const [transcript, setTranscript] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);
  const [manualQuestion, setManualQuestion] = useState('');
  const responseRef = useRef('');

  useEffect(() => {
    ws.connect();
    ws.on('transcript.partial', (data: any) => setTranscript(data.payload?.text || ''));
    ws.on('transcript.final', (data: any) => setTranscript(data.payload?.text || ''));
    ws.on('question.detected', (data: any) => {
      setQuestion(data.payload?.question || '');
      setStatus('processing');
    });
    ws.on('answer.token', (data: any) => {
      responseRef.current += data.payload?.text || '';
      setResponse(responseRef.current);
    });
    ws.on('answer.completed', (data: any) => {
      setKeyPoints(data.payload?.key_points || []);
      setHistory(h => [...h, { q: question || data.payload?.question || '', a: data.payload?.answer || responseRef.current }]);
      setStatus('listening');
    });
    ws.on('error', (data: any) => {
      console.error('WS error:', data);
      setStatus('idle');
    });
    return () => ws.disconnect();
  }, []);

  const toggleCapture = async () => {
    if (status === 'idle') {
      const sid = sessionId || await api.createSession('Live Interview');
      if (sid) setSessionId(sid);
      ws.send({ type: 'session.start', session_id: sid });
      setStatus('listening');
    } else {
      ws.send({ type: 'session.stop' });
      setStatus('idle');
    }
  };

  const handleManualAsk = async () => {
    if (!manualQuestion.trim()) return;
    setQuestion(manualQuestion);
    setStatus('processing');
    responseRef.current = '';
    setResponse('');
    setKeyPoints([]);
    try {
      const res = await api.askQuestion(manualQuestion, sessionId || undefined);
      setResponse(res.answer);
      setKeyPoints(res.key_points || []);
      setLatency(res.latency_ms);
      setHistory(h => [...h, { q: manualQuestion, a: res.answer }]);
    } catch (e: any) {
      setResponse(`Error: ${e.message}`);
    }
    setStatus('idle');
    setManualQuestion('');
  };

  return (
    <div>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Interview Session</h1>
          <p style={styles.status}>
            <span style={{ ...styles.dot, background: status === 'listening' ? 'var(--success)' : status === 'processing' ? 'var(--warning)' : 'var(--text-muted)' }} />
            {status === 'idle' ? 'Ready' : status === 'listening' ? 'Listening' : 'Processing...'}
            {latency && <span style={styles.latency}> · {latency}ms</span>}
          </p>
        </div>
        <button onClick={toggleCapture} style={{ ...styles.button, background: status === 'listening' ? 'var(--error)' : 'var(--accent)' }}>
          {status === 'idle' ? 'Start Interview' : 'Stop'}
        </button>
      </div>

      <div style={styles.manualBar}>
        <input
          type="text"
          value={manualQuestion}
          onChange={e => setManualQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleManualAsk()}
          placeholder="Type or paste interview question..."
          style={styles.input}
        />
        <button onClick={handleManualAsk} style={styles.button}>Ask</button>
      </div>

      <div style={styles.columns}>
        <div style={styles.column}>
          <h3 style={styles.label}>Live Transcript</h3>
          <div style={styles.panel}>
            {transcript || <span style={styles.placeholder}>Transcript will appear here when you start capturing audio...</span>}
          </div>
        </div>
        <div style={styles.column}>
          <h3 style={styles.label}>Suggested Response</h3>
          <div style={styles.panel}>
            {response || <span style={styles.placeholder}>AI response will appear here when a question is detected...</span>}
          </div>
        </div>
      </div>

      {question && (
        <div style={styles.questionBox}>
          <h3 style={styles.label}>Detected Question</h3>
          <p style={styles.questionText}>{question}</p>
        </div>
      )}

      {keyPoints.length > 0 && (
        <div style={styles.keyPoints}>
          <h3 style={styles.label}>Key Points</h3>
          <div style={styles.pointsList}>
            {keyPoints.map((point, i) => <span key={i} style={styles.point}>{point}</span>)}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div style={styles.historySection}>
          <h3 style={styles.label}>Session History ({history.length} questions)</h3>
          {history.map((h, i) => (
            <div key={i} style={styles.historyItem}>
              <p style={styles.historyQ}>Q: {h.q}</p>
              <p style={styles.historyA}>A: {h.a.substring(0, 150)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' },
  title: { fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' },
  status: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--font-size-base)', color: 'var(--text-secondary)' },
  dot: { width: 8, height: 8, borderRadius: '50%', display: 'inline-block' },
  latency: { fontSize: 'var(--font-size-sm)', color: 'var(--accent)' },
  button: { padding: 'var(--space-2) var(--space-5)', borderRadius: 'var(--radius-sm)', border: 'none', color: 'white', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', cursor: 'pointer' },
  manualBar: { display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-5)' },
  input: { flex: 1, padding: 'var(--space-2) var(--space-4)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: 'var(--font-size-base)', outline: 'none' },
  columns: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', marginBottom: 'var(--space-5)' },
  column: { display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' },
  label: { fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.5px' },
  panel: { background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)', minHeight: 200, fontSize: 'var(--font-size-base)', color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' as const },
  placeholder: { color: 'var(--text-muted)', fontStyle: 'italic' },
  questionBox: { background: 'var(--bg-elevated)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)', marginBottom: 'var(--space-5)' },
  questionText: { fontSize: 'var(--font-size-md)', color: 'var(--text-primary)', lineHeight: 1.5 },
  keyPoints: { marginBottom: 'var(--space-5)' },
  pointsList: { display: 'flex', flexWrap: 'wrap' as const, gap: 'var(--space-2)' },
  point: { background: 'var(--accent-soft)', color: 'var(--accent)', padding: 'var(--space-1) var(--space-3)', borderRadius: 'var(--radius-pill)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' },
  historySection: { marginTop: 'var(--space-5)' },
  historyItem: { background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', marginBottom: 'var(--space-3)' },
  historyQ: { fontSize: 'var(--font-size-base)', color: 'var(--text-primary)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-2)' },
  historyA: { fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 },
};
