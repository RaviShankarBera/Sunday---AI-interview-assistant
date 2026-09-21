import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { DocumentStatus } from '../types';

export default function Resume() {
  const [status, setStatus] = useState<DocumentStatus>('idle');
  const [filename, setFilename] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.listDocuments('resume').then(r => setDocuments(r.documents || [])).catch(() => {});
  }, []);

  const handleFile = async (file: File) => {
    setFilename(file.name);
    setStatus('uploading');
    setError('');
    try {
      const res = await api.uploadDocument(file, 'resume');
      setStatus('indexed');
      api.listDocuments('resume').then(r => setDocuments(r.documents || [])).catch(() => {});
    } catch (e: any) {
      setStatus('error');
      setError(e.message);
    }
  };

  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); };
  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); };

  const deleteDoc = async (id: string) => {
    await api.deleteDocument(id);
    setDocuments(d => d.filter(doc => doc.id !== id));
  };

  return (
    <div>
      <h1 style={styles.title}>Resume</h1>
      <p style={styles.subtitle}>Your experience gives Sunday context.</p>

      <div style={{ ...styles.dropzone, borderColor: dragOver ? 'var(--accent)' : 'var(--border-default)', background: dragOver ? 'var(--accent-soft)' : 'var(--bg-elevated)' }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={onDrop}>
        {status === 'idle' && (<>
          <p style={styles.dropText}>Drop your resume here</p>
          <p style={styles.dropSub}>PDF, DOCX or TXT</p>
          <label style={styles.fileButton}>Choose File<input type="file" accept=".pdf,.docx,.txt" onChange={onFileSelect} style={{ display: 'none' }} /></label>
        </>)}
        {status === 'uploading' && <p style={styles.dropText}>Uploading {filename}...</p>}
        {status === 'processing' && <p style={styles.dropText}>Reading resume...</p>}
        {status === 'indexed' && <><p style={styles.dropText}>✓ {filename}</p><p style={styles.dropSub}>Indexed and ready</p></>}
        {status === 'error' && <p style={{ ...styles.dropText, color: 'var(--error)' }}>{error || 'Failed to process file'}</p>}
      </div>

      {documents.length > 0 && (
        <div>
          <h3 style={styles.sectionTitle}>Uploaded Resumes</h3>
          {documents.map(doc => (
            <div key={doc.id} style={styles.docRow}>
              <span>✓ {doc.filename}</span>
              <button onClick={() => deleteDoc(doc.id)} style={styles.deleteBtn}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' },
  subtitle: { fontSize: 'var(--font-size-base)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' },
  dropzone: { border: '2px dashed var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-12) var(--space-8)', textAlign: 'center', cursor: 'pointer', transition: 'border-color var(--transition-fast), background var(--transition-fast)', marginBottom: 'var(--space-5)' },
  dropText: { fontSize: 'var(--font-size-md)', color: 'var(--text-primary)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-2)' },
  dropSub: { fontSize: 'var(--font-size-base)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' },
  fileButton: { display: 'inline-block', padding: 'var(--space-2) var(--space-5)', background: 'var(--accent)', color: 'white', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', cursor: 'pointer' },
  sectionTitle: { fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-4)' },
  docRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3) var(--space-4)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-base)', color: 'var(--text-primary)' },
  deleteBtn: { background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: 'var(--font-size-sm)' },
};
