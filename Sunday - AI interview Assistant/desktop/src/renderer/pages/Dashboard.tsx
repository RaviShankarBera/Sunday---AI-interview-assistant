import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [backendOk, setBackendOk] = useState<boolean | null>(null);
  const [ollamaOk, setOllamaOk] = useState<boolean | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    api.health().then(r => {
      setBackendOk(true);
      setOllamaOk(r.ai_healthy);
    }).catch(() => {
      setBackendOk(false);
      setOllamaOk(false);
    });
    api.listSessions().then(r => setSessions(r.sessions || [])).catch(() => {});
  }, []);

  return (
    <div>
      <h1 style={styles.greeting}>Good afternoon</h1>
      <p style={styles.subtitle}>Ready for your next interview?</p>

      <div style={styles.statusBar}>
        <span style={{ ...styles.statusDot, background: backendOk ? 'var(--success)' : backendOk === false ? 'var(--error)' : 'var(--warning)' }} />
        <span style={styles.statusText}>Backend: {backendOk ? 'Connected' : backendOk === false ? 'Disconnected' : 'Checking...'}</span>
        <span style={{ ...styles.statusDot, background: ollamaOk ? 'var(--success)' : ollamaOk === false ? 'var(--error)' : 'var(--warning)', marginLeft: 16 }} />
        <span style={styles.statusText}>Ollama: {ollamaOk ? 'Connected' : ollamaOk === false ? 'Disconnected' : 'Checking...'}</span>
      </div>

      <div style={styles.cards}>
        <div style={styles.card} onClick={() => navigate('/interview')}>
          <h2 style={styles.cardTitle}>Interview</h2>
          <p style={styles.cardDesc}>Start a live session with AI assistance</p>
          <span style={styles.cardAction}>Start →</span>
        </div>
        <div style={styles.card} onClick={() => navigate('/preparation')}>
          <h2 style={styles.cardTitle}>Preparation</h2>
          <p style={styles.cardDesc}>Prepare for a specific role</p>
          <span style={styles.cardAction}>Prepare →</span>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Recent Sessions</h3>
        {sessions.length > 0 ? sessions.slice(0, 5).map(s => (
          <div key={s.id} style={styles.sessionRow}>
            <span>{s.title}</span>
            <span style={styles.sessionDate}>{new Date(s.created_at).toLocaleDateString()}</span>
          </div>
        )) : (
          <p style={styles.emptyText}>No sessions yet. Start by preparing or beginning an interview.</p>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  greeting: { fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' },
  subtitle: { fontSize: 'var(--font-size-md)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' },
  statusBar: { display: 'flex', alignItems: 'center', marginBottom: 'var(--space-6)', gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: '50%', display: 'inline-block' },
  statusText: { fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' },
  cards: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', marginBottom: 'var(--space-10)' },
  card: { background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', cursor: 'pointer', transition: 'border-color var(--transition-fast)' },
  cardTitle: { fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' },
  cardDesc: { fontSize: 'var(--font-size-base)', color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' },
  cardAction: { fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--accent)' },
  section: { marginTop: 'var(--space-4)' },
  sectionTitle: { fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-4)' },
  emptyText: { fontSize: 'var(--font-size-base)', color: 'var(--text-muted)' },
  sessionRow: { display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-base)', color: 'var(--text-primary)' },
  sessionDate: { color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' },
};
