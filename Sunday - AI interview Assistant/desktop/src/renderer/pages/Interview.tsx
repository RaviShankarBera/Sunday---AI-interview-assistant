import { useState } from 'react';

export default function Interview() {
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing'>('idle');
  const [transcript, setTranscript] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>([]);

  const toggleCapture = () => {
    setStatus(status === 'idle' ? 'listening' : 'idle');
  };

  return (
    <div>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Interview Session</h1>
          <p style={styles.status}>
            <span style={{
              ...styles.dot,
              background: status === 'listening' ? 'var(--success)' : 'var(--text-muted)',
            }} />
            {status === 'idle' ? 'Ready' : 'Listening'}
          </p>
        </div>
        <button
          onClick={toggleCapture}
          style={{
            ...styles.button,
            background: status === 'listening' ? 'var(--error)' : 'var(--accent)',
          }}
        >
          {status === 'idle' ? 'Start Interview' : 'Stop'}
        </button>
      </div>

      <div style={styles.columns}>
        <div style={styles.column}>
          <h3 style={styles.label}>Live Transcript</h3>
          <div style={styles.panel}>
            {transcript || (
              <span style={styles.placeholder}>
                Transcript will appear here when you start capturing audio...
              </span>
            )}
          </div>
        </div>

        <div style={styles.column}>
          <h3 style={styles.label}>Suggested Response</h3>
          <div style={styles.panel}>
            {response || (
              <span style={styles.placeholder}>
                AI response will appear here when a question is detected...
              </span>
            )}
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
            {keyPoints.map((point, i) => (
              <span key={i} style={styles.point}>{point}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 'var(--space-6)',
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-2)',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-secondary)',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  button: {
    padding: 'var(--space-2) var(--space-5)',
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    color: 'white',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-semibold)',
    cursor: 'pointer',
  },
  columns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-5)',
    marginBottom: 'var(--space-5)',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
  },
  label: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--text-muted)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  panel: {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-5)',
    minHeight: '200px',
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-primary)',
    lineHeight: 1.6,
  },
  placeholder: {
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
  questionBox: {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-accent, var(--accent))',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-5)',
    marginBottom: 'var(--space-5)',
  },
  questionText: {
    fontSize: 'var(--font-size-md)',
    color: 'var(--text-primary)',
    lineHeight: 1.5,
  },
  keyPoints: {
    marginBottom: 'var(--space-5)',
  },
  pointsList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 'var(--space-2)',
  },
  point: {
    background: 'var(--accent-soft)',
    color: 'var(--accent)',
    padding: 'var(--space-1) var(--space-3)',
    borderRadius: 'var(--radius-pill)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
  },
};
