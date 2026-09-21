import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function History() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listSessions().then(r => { setSessions(r.sessions || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = sessions.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  const deleteSession = async (id: string) => {
    await api.deleteSession(id);
    setSessions(s => s.filter(sess => sess.id !== id));
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>History</h1>
        <input type="text" placeholder="Search sessions..." value={search} onChange={e => setSearch(e.target.value)} style={styles.search} />
      </div>

      {loading ? <p style={styles.empty}>Loading...</p> : filtered.length > 0 ? (
        <div>
          {filtered.map(s => (
            <div key={s.id} style={styles.sessionCard}>
              <div>
                <p style={styles.sessionTitle}>{s.title}</p>
                <p style={styles.sessionMeta}>{s.type} · {new Date(s.created_at).toLocaleDateString()} · {s.model}</p>
              </div>
              <button onClick={() => deleteSession(s.id)} style={styles.deleteBtn}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyBox}>
          <p style={styles.emptyTitle}>No sessions yet</p>
          <p style={styles.emptyDesc}>Start preparing or begin an interview session.</p>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' },
  title: { fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)' },
  search: { padding: 'var(--space-2) var(--space-4)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: 'var(--font-size-base)', width: 250, outline: 'none' },
  sessionCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)' },
  sessionTitle: { fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' },
  sessionMeta: { fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' },
  deleteBtn: { background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: 'var(--font-size-sm)' },
  empty: { color: 'var(--text-muted)', fontSize: 'var(--font-size-base)' },
  emptyBox: { background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--space-12)', textAlign: 'center' },
  emptyTitle: { fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' },
  emptyDesc: { fontSize: 'var(--font-size-base)', color: 'var(--text-muted)' },
};
