import { useState } from 'react';
import { api } from '../services/api';

export default function Coding() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setAnalysis('');
    try {
      const res = await api.chat([
        { role: 'system', content: 'You are a coding interview assistant. Analyze the provided code or problem and give clear explanations with approach, complexity, and improvements.' },
        { role: 'user', content: input },
      ]);
      setAnalysis(res.answer);
    } catch (e: any) {
      setAnalysis(`Error: ${e.message}`);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 style={styles.title}>Coding</h1>
      <p style={styles.subtitle}>Analyze code or practice coding problems</p>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste code or describe a coding problem..."
        style={styles.textarea}
      />

      <button onClick={analyze} disabled={loading || !input.trim()} style={{ ...styles.button, opacity: loading || !input.trim() ? 0.5 : 1 }}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {analysis && (
        <div style={styles.result}>
          <h3 style={styles.resultTitle}>Analysis</h3>
          <p style={styles.resultText}>{analysis}</p>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' },
  subtitle: { fontSize: 'var(--font-size-base)', color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' },
  textarea: { width: '100%', minHeight: 200, padding: 'var(--space-4)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: 'var(--font-size-base)', fontFamily: 'monospace', resize: 'vertical', outline: 'none', marginBottom: 'var(--space-4)' },
  button: { padding: 'var(--space-2) var(--space-5)', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', cursor: 'pointer', marginBottom: 'var(--space-5)' },
  result: { background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)' },
  resultTitle: { fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' },
  resultText: { fontSize: 'var(--font-size-base)', color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' as const },
};
