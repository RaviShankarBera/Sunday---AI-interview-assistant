import { useState } from 'react';

export default function Coding() {
  const [captured, setCaptured] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState('');

  const handleCapture = () => {
    setCaptured(true);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysis('Coding analysis will appear here once the backend OCR and AI pipeline are connected.');
    }, 1000);
  };

  const handleClear = () => {
    setCaptured(false);
    setAnalysis('');
  };

  return (
    <div>
      <h1 style={styles.title}>Coding Mode</h1>
      <p style={styles.subtitle}>Capture and analyze code from your screen</p>

      <div style={styles.columns}>
        <div style={styles.column}>
          <h3 style={styles.label}>Captured Screen</h3>
          <div style={styles.screenPanel}>
            {captured ? (
              <p style={styles.placeholder}>Screen captured. Connect backend for OCR analysis.</p>
            ) : (
              <p style={styles.placeholder}>No screen captured yet.</p>
            )}
          </div>
        </div>

        <div style={styles.column}>
          <h3 style={styles.label}>Analysis</h3>
          <div style={styles.analysisPanel}>
            {analyzing ? (
              <p style={styles.placeholder}>Analyzing screen...</p>
            ) : analysis ? (
              <p>{analysis}</p>
            ) : (
              <p style={styles.placeholder}>Analysis will appear here after capture.</p>
            )}
          </div>
        </div>
      </div>

      <div style={styles.actions}>
        <button onClick={handleCapture} style={styles.button}>Capture Screen</button>
        <button
          onClick={handleAnalyze}
          disabled={!captured || analyzing}
          style={{
            ...styles.button,
            opacity: !captured || analyzing ? 0.5 : 1,
          }}
        >
          Analyze
        </button>
        <button onClick={handleClear} style={{ ...styles.button, background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
          Clear
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-2)',
  },
  subtitle: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-6)',
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
  screenPanel: {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-6)',
    minHeight: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  analysisPanel: {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-5)',
    minHeight: '300px',
    lineHeight: 1.6,
  },
  placeholder: {
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
  actions: {
    display: 'flex',
    gap: 'var(--space-3)',
  },
  button: {
    padding: 'var(--space-2) var(--space-5)',
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    background: 'var(--accent)',
    color: 'white',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-semibold)',
    cursor: 'pointer',
  },
};
