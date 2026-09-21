import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Settings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => { api.getSettings().then(r => setSettings(r.settings || {})).catch(() => {}); }, []);

  const update = async (key: string, value: string) => {
    setSettings(s => ({ ...s, [key]: value }));
    await api.updateSettings([{ key, value }]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 style={styles.title}>Settings</h1>
      {saved && <p style={styles.saved}>✓ Settings saved</p>}

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>AI</h2>
        <div style={styles.row}><span style={styles.label}>Provider</span><span style={styles.value}>{settings.provider || 'ollama'}</span></div>
        <div style={styles.row}><span style={styles.label}>Model</span><span style={styles.value}>{settings.model || 'qwen3:8b'}</span></div>
        <div style={styles.row}><span style={styles.label}>Response Style</span>
          <select value={settings.response_style || 'concise'} onChange={e => update('response_style', e.target.value)} style={styles.select}>
            <option value="concise">Concise</option><option value="detailed">Detailed</option><option value="professional">Professional</option><option value="technical">Technical</option>
          </select>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Privacy</h2>
        <div style={styles.row}><span style={styles.label}>Local-only mode</span>
          <button onClick={() => update('local_only_mode', settings.local_only_mode === 'true' ? 'false' : 'true')} style={{ ...styles.toggle, background: settings.local_only_mode === 'true' ? 'var(--accent)' : 'var(--border-default)' }}>
            {settings.local_only_mode === 'true' ? 'ON' : 'OFF'}
          </button>
        </div>
        <div style={styles.row}><span style={styles.label}>Save transcripts</span>
          <button onClick={() => update('save_transcript', settings.save_transcript === 'true' ? 'false' : 'true')} style={{ ...styles.toggle, background: settings.save_transcript === 'true' ? 'var(--accent)' : 'var(--border-default)' }}>
            {settings.save_transcript === 'true' ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Appearance</h2>
        <div style={styles.row}><span style={styles.label}>Theme</span>
          <select value={settings.theme || 'system'} onChange={e => update('theme', e.target.value)} style={styles.select}>
            <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Shortcuts</h2>
        <div style={styles.row}><span style={styles.label}>Show/Hide Overlay</span><span style={styles.shortcut}>Ctrl + Space</span></div>
        <div style={styles.row}><span style={styles.label}>Start/Stop Audio</span><span style={styles.shortcut}>Ctrl + Shift + A</span></div>
        <div style={styles.row}><span style={styles.label}>Analyze Screen</span><span style={styles.shortcut}>Ctrl + Shift + S</span></div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-4)' },
  saved: { color: 'var(--success)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-4)' },
  section: { marginBottom: 'var(--space-6)' },
  sectionTitle: { fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3) 0' },
  label: { fontSize: 'var(--font-size-base)', color: 'var(--text-primary)' },
  value: { fontSize: 'var(--font-size-base)', color: 'var(--text-secondary)' },
  toggle: { padding: 'var(--space-1) var(--space-4)', borderRadius: 'var(--radius-pill)', border: 'none', color: 'white', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', cursor: 'pointer', minWidth: 50 },
  select: { padding: 'var(--space-2) var(--space-3)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: 'var(--font-size-base)', outline: 'none' },
  shortcut: { padding: 'var(--space-1) var(--space-3)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-sm)', fontFamily: 'monospace', color: 'var(--text-secondary)' },
};
