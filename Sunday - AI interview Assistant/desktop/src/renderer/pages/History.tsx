export default function History() {
  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>History</h1>
        <input
          type="text"
          placeholder="Search sessions..."
          style={styles.search}
        />
      </div>

      <div style={styles.empty}>
        <p style={styles.emptyTitle}>No sessions yet</p>
        <p style={styles.emptyDesc}>
          Start preparing or begin an interview session.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--space-6)',
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--text-primary)',
  },
  search: {
    padding: 'var(--space-2) var(--space-4)',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-size-base)',
    width: '250px',
    outline: 'none',
  },
  empty: {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-12)',
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-2)',
  },
  emptyDesc: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-muted)',
  },
};
