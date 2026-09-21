import { useState, useEffect, useRef } from 'react';
import { api, ws } from '../services/api';

export default function Overlay() {
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing'>('idle');
  const [question, setQuestion] = useState('');
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
    ws.on('answer.completed', () => {
      setStatus('listening');
    });
    return () => ws.disconnect();
  }, []);

  const toggleCapture = () => {
    if (status === 'idle') {
      ws.send({ type: 'session.start' });
      setStatus('listening');
    } else {
      ws.send({ type: 'session.stop' });
      setStatus('idle');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.dot} />
        <span style={styles.statusText}>{status === 'idle' ? 'Ready' : status === 'listening' ? 'Listening' : 'Processing...'}</span>
      </div>

      <button onClick={toggleCapture} style={{ ...styles.button, background: status === 'listening' ? 'var(--error)' : 'var(--accent)' }}>
        {status === 'idle' ? 'Start' : 'Stop'}
      </button>

      {question && <p style={styles.question}>{question}</p>}

      {response && (
        <div style={styles.response}>
          <p style={styles.responseText}>{response}</p>
        </div>
      )}

      {!response && transcript && (
        <p style={styles.transcript}>{transcript}</p>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: 16, height: '100vh', display: 'flex', flexDirection: 'column', background: 'rgba(13, 17, 23, 0.95)', color: 'white', fontFamily: 'var(--font-family)' },
  header: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 },
  dot: { width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' },
  statusText: { fontSize: 11, color: 'var(--text-muted)' },
  button: { padding: '6px 16px', border: 'none', borderRadius: 4, color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginBottom: 12, alignSelf: 'flex-start' },
  question: { fontSize: 13, color: 'var(--accent)', marginBottom: 8, fontWeight: 500 },
  response: { background: 'rgba(255,255,255,0.05)', borderRadius: 6, padding: 10, flex: 1, overflow: 'auto' },
  responseText: { fontSize: 13, lineHeight: 1.5, color: 'var(--text-primary)' },
  transcript: { fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' },
};
