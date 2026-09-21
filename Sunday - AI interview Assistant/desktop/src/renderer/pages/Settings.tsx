import { useState } from 'react';

export default function Settings() {
  const [localOnly, setLocalOnly] = useState(true);
  const [saveTranscript, setSaveTranscript] = useState(false);
  const [theme, setTheme] = useState('system');

  return (
    <div>
      <h1 style={styles.title}>Settings</h1>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>AI</h2>
        <div style={styles.row}>
          <span style={styles.label}>Provider</span>
          <span style={styles.value}>Ollama (Local)</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Model</span>
          <span style={styles.value}>qwen3:8b</span>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Privacy</h2>
        <div style={styles.row}>
          <span style={styles.label}>Local-only mode</span>
          <button
            onClick={() => setLocalOnly(!localOnly)}
            style={{
              ...styles.toggle,
              background: localOnly ? 'var(--accent)' : 'var(--border-default)',
            }}
          >
            {localOnly ? 'ON' : 'OFF'}
          </button>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Save transcripts</span>
          <button
            onClick={() => setSaveTranscript(!saveTranscript)}
            style={{
              ...styles.toggle,
              background: saveTranscript ? 'var(--accent)' : 'var(--border-default)',
            }}
          >
            {saveTranscript ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Appearance</h2>
        <div style={styles.row}>
          <span style={styles.label}>Theme</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={styles.select}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Shortcuts</h2>
        <div style={styles.row}>
          <span style={styles.label}>Show/Hide Overlay</span>
          <span style={styles.shortcut}>Ctrl + Space</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Start/Stop Audio</span>
          <span style={styles.shortcut}>Ctrl + Shift + A</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Analyze Screen</span>
          <span style={styles.shortcut}>Ctrl + Shift + S</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Regenerate Response</span>
          <span style={styles.shortcut}>Ctrl + Shift + R</span>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-6)',
  },
  section: {
    marginBottom: 'var(--space-6)',
  },
  sectionTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-4)',
    paddingBottom: 'var(--space-2)',
    borderBottom: '1px solid var(--border-subtle)',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--space-3) 0',
  },
  label: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-primary)',
  },
  value: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-secondary)',
  },
  toggle: {
    padding: 'var(--space-1) var(--space-4)',
    borderRadius: 'var(--radius-pill)',
    border: 'none',
    color: 'white',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-semibold)',
    cursor: 'pointer',
    minWidth: '50px',
  },
  select: {
    padding: 'var(--space-2) var(--space-3)',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-size-base)',
    outline: 'none',
  },
  shortcut: {
    padding: 'var(--space-1) var(--space-3)',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'monospace',
    color: 'var(--text-secondary)',
  },
};
