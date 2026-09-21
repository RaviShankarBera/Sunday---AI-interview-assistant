import { useState } from 'react';

type OverlayStatus = 'idle' | 'listening' | 'generating' | 'error';

export default function Overlay() {
  const [status, setStatus] = useState<OverlayStatus>('idle');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>([]);

  return (
    <div style={styles.container}>
      <div style={styles.titleBar} data-tauric-drag-region>
        <span style={styles.brand}>SUNDAY</span>
        <span style={styles.latency}>● Ready</span>
      </div>

      <div style={styles.body}>
        <div style={styles.section}>
          <span style={styles.label}>QUESTION</span>
          {question ? (
            <p style={styles.questionText}>{question}</p>
          ) : (
            <p style={styles.placeholder}>Waiting for question...</p>
          )}
        </div>

        <div style={styles.section}>
          <span style={styles.label}>SUGGESTED RESPONSE</span>
          {response ? (
            <p style={styles.responseText}>{response}</p>
          ) : (
            <p style={styles.placeholder}>Response will appear here...</p>
          )}
        </div>

        {keyPoints.length > 0 && (
          <div style={styles.section}>
            <span style={styles.label}>KEY POINTS</span>
            <div style={styles.points}>
              {keyPoints.map((point, i) => (
                <span key={i} style={styles.point}>{point}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'rgba(18, 20, 30, 0.95)',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'var(--font-family)',
  },
  titleBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    WebkitAppRegion: 'drag' as unknown as string,
  },
  brand: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#6c8cff',
    letterSpacing: '2px',
  },
  latency: {
    fontSize: '11px',
    color: '#34d399',
  },
  body: {
    flex: 1,
    overflow: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#6b7084',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  questionText: {
    fontSize: '14px',
    color: '#e4e6f0',
    lineHeight: 1.5,
    fontWeight: 500,
  },
  responseText: {
    fontSize: '13px',
    color: '#9ca0b0',
    lineHeight: 1.6,
  },
  placeholder: {
    fontSize: '13px',
    color: '#6b7084',
    fontStyle: 'italic',
  },
  points: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
  },
  point: {
    background: 'rgba(108, 140, 255, 0.12)',
    color: '#6c8cff',
    padding: '3px 10px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 500,
  },
};
