import { useState } from 'react';

type PrepTab = 'overview' | 'questions' | 'technical' | 'behavioral';

export default function Preparation() {
  const [activeTab, setActiveTab] = useState<PrepTab>('overview');
  const [resumeReady, setResumeReady] = useState(false);
  const [jdReady, setJdReady] = useState(false);

  const tabs: { key: PrepTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'questions', label: 'Questions' },
    { key: 'technical', label: 'Technical' },
    { key: 'behavioral', label: 'Behavioral' },
  ];

  return (
    <div>
      <h1 style={styles.title}>Preparation</h1>
      <p style={styles.subtitle}>Prepare for your interview with AI-powered insights</p>

      <div style={styles.stages}>
        <div style={{ ...styles.stage, opacity: resumeReady ? 1 : 0.5 }}>
          <span style={styles.check}>{resumeReady ? '✓' : '○'}</span>
          Resume
        </div>
        <span style={styles.arrow}>→</span>
        <div style={{ ...styles.stage, opacity: jdReady ? 1 : 0.5 }}>
          <span style={styles.check}>{jdReady ? '✓' : '○'}</span>
          Job Description
        </div>
        <span style={styles.arrow}>→</span>
        <div style={{ ...styles.stage, opacity: resumeReady && jdReady ? 1 : 0.5 }}>
          <span style={styles.check}>{resumeReady && jdReady ? '✓' : '○'}</span>
          Ready
        </div>
      </div>

      <div style={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...styles.tab,
              color: activeTab === tab.key ? 'var(--accent)' : 'var(--text-secondary)',
              borderBottomColor: activeTab === tab.key ? 'var(--accent)' : 'transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        {activeTab === 'overview' && (
          <div>
            <h3 style={styles.sectionTitle}>Your Preparation</h3>
            <div style={styles.stats}>
              <div style={styles.stat}>
                <span style={styles.statValue}>0</span>
                <span style={styles.statLabel}>Focus Areas</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statValue}>0</span>
                <span style={styles.statLabel}>Likely Questions</span>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'questions' && (
          <p style={styles.placeholder}>Upload your resume and job description to generate questions.</p>
        )}
        {activeTab === 'technical' && (
          <p style={styles.placeholder}>Technical questions will appear here after document processing.</p>
        )}
        {activeTab === 'behavioral' && (
          <p style={styles.placeholder}>Behavioral questions will appear here after document processing.</p>
        )}
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
  stages: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    marginBottom: 'var(--space-6)',
  },
  stage: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-primary)',
    fontWeight: 'var(--font-weight-medium)',
  },
  check: {
    color: 'var(--success)',
    fontWeight: 'var(--font-weight-bold)',
  },
  arrow: {
    color: 'var(--text-muted)',
  },
  tabs: {
    display: 'flex',
    gap: 'var(--space-1)',
    borderBottom: '1px solid var(--border-subtle)',
    marginBottom: 'var(--space-6)',
  },
  tab: {
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: 'var(--space-3) var(--space-4)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-medium)',
    cursor: 'pointer',
    transition: 'color var(--transition-fast)',
  },
  content: {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-6)',
  },
  sectionTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-4)',
  },
  stats: {
    display: 'flex',
    gap: 'var(--space-8)',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
  },
  statValue: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--accent)',
  },
  statLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-muted)',
  },
  placeholder: {
    color: 'var(--text-muted)',
    fontSize: 'var(--font-size-base)',
  },
};
