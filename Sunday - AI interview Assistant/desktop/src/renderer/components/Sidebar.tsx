import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: '◉' },
  { to: '/preparation', label: 'Preparation', icon: '◎' },
  { to: '/interview', label: 'Interview', icon: '●' },
  { to: '/coding', label: 'Coding', icon: '◆' },
  { to: '/resume', label: 'Resume', icon: '◇' },
  { to: '/job-description', label: 'Job Description', icon: '▹' },
  { to: '/history', label: 'History', icon: '◷' },
];

export default function Sidebar() {
  return (
    <nav style={styles.sidebar}>
      <div style={styles.brand}>SUNDAY</div>
      <div style={styles.navList}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            style={({ isActive }) => ({
              ...styles.navItem,
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: isActive ? 'var(--accent-soft)' : 'transparent',
            })}
          >
            <span style={styles.icon}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
      <div style={styles.bottom}>
        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            ...styles.navItem,
            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
            background: isActive ? 'var(--accent-soft)' : 'transparent',
          })}
        >
          <span style={styles.icon}>⚙</span>
          Settings
        </NavLink>
      </div>
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 'var(--sidebar-width)',
    minWidth: 'var(--sidebar-width)',
    height: '100vh',
    background: 'var(--bg-secondary)',
    borderRight: '1px solid var(--border-subtle)',
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--space-5) 0',
    userSelect: 'none',
  },
  brand: {
    padding: '0 var(--space-5)',
    marginBottom: 'var(--space-6)',
    fontSize: 'var(--font-size-md)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--accent)',
    letterSpacing: '2px',
  },
  navList: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
    padding: '0 var(--space-3)',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    padding: 'var(--space-2) var(--space-3)',
    borderRadius: 'var(--radius-sm)',
    textDecoration: 'none',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-medium)',
    transition: 'background var(--transition-fast), color var(--transition-fast)',
  },
  icon: {
    fontSize: '14px',
    width: '20px',
    textAlign: 'center',
  },
  bottom: {
    padding: '0 var(--space-3)',
    borderTop: '1px solid var(--border-subtle)',
    paddingTop: 'var(--space-3)',
  },
};
