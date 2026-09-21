import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={styles.greeting}>Good afternoon</h1>
      <p style={styles.subtitle}>Ready for your next interview?</p>

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
        <p style={styles.emptyText}>No sessions yet. Start by preparing or beginning an interview.</p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  greeting: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-2)',
  },
  subtitle: {
    fontSize: 'var(--font-size-md)',
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-8)',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-5)',
    marginBottom: 'var(--space-10)',
  },
  card: {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-6)',
    cursor: 'pointer',
    transition: 'border-color var(--transition-fast)',
  },
  cardTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-2)',
  },
  cardDesc: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-5)',
  },
  cardAction: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--accent)',
  },
  section: {
    marginTop: 'var(--space-4)',
  },
  sectionTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-4)',
  },
  emptyText: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-muted)',
  },
};
