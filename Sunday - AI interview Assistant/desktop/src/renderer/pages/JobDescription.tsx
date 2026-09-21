import { useState } from 'react';
import type { DocumentStatus } from '../types';

export default function JobDescription() {
  const [status, setStatus] = useState<DocumentStatus>('idle');
  const [filename, setFilename] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File) => {
    setFilename(file.name);
    setStatus('uploading');
    setTimeout(() => setStatus('processing'), 500);
    setTimeout(() => setStatus('indexed'), 1500);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <h1 style={styles.title}>Job Description</h1>
      <p style={styles.subtitle}>Add the target role to make preparation more specific.</p>

      <div
        style={{
          ...styles.dropzone,
          borderColor: dragOver ? 'var(--accent)' : 'var(--border-default)',
          background: dragOver ? 'var(--accent-soft)' : 'var(--bg-elevated)',
        }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        {status === 'idle' && (
          <>
            <p style={styles.dropText}>Drop your job description here</p>
            <p style={styles.dropSub}>PDF, DOCX or TXT</p>
            <label style={styles.fileButton}>
              Choose File
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={onFileSelect}
                style={{ display: 'none' }}
              />
            </label>
          </>
        )}
        {status === 'uploading' && <p style={styles.dropText}>Uploading {filename}...</p>}
        {status === 'processing' && <p style={styles.dropText}>Analyzing job description...</p>}
        {status === 'indexed' && (
          <>
            <p style={styles.dropText}>✓ {filename}</p>
            <p style={styles.dropSub}>Indexed and ready</p>
          </>
        )}
        {status === 'error' && (
          <p style={{ ...styles.dropText, color: 'var(--error)' }}>Failed to process file</p>
        )}
      </div>

      {status === 'indexed' && (
        <div style={styles.requirements}>
          <h3 style={styles.reqTitle}>Detected Requirements</h3>
          <div style={styles.reqGrid}>
            <div style={styles.reqCard}>
              <span style={styles.reqLabel}>Role</span>
              <span style={styles.reqValue}>Detected after processing</span>
            </div>
            <div style={styles.reqCard}>
              <span style={styles.reqLabel}>Core Skills</span>
              <span style={styles.reqValue}>Waiting for backend</span>
            </div>
            <div style={styles.reqCard}>
              <span style={styles.reqLabel}>Experience</span>
              <span style={styles.reqValue}>Waiting for backend</span>
            </div>
          </div>
        </div>
      )}
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
  dropzone: {
    border: '2px dashed var(--border-default)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-12) var(--space-8)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color var(--transition-fast), background var(--transition-fast)',
    marginBottom: 'var(--space-5)',
  },
  dropText: {
    fontSize: 'var(--font-size-md)',
    color: 'var(--text-primary)',
    fontWeight: 'var(--font-weight-medium)',
    marginBottom: 'var(--space-2)',
  },
  dropSub: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-muted)',
    marginBottom: 'var(--space-4)',
  },
  fileButton: {
    display: 'inline-block',
    padding: 'var(--space-2) var(--space-5)',
    background: 'var(--accent)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-semibold)',
    cursor: 'pointer',
  },
  requirements: {
    marginTop: 'var(--space-4)',
  },
  reqTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-4)',
  },
  reqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-4)',
  },
  reqCard: {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-4)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
  },
  reqLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-muted)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  reqValue: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-secondary)',
  },
};
