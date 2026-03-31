import React from 'react';

const styles = {
  header: {
    height: 'var(--header-h)',
    background: 'var(--amp-navy)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 28px',
    gap: '16px',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    boxShadow: '0 2px 8px rgba(15,36,71,0.25)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginRight: '8px',
  },
  logoMark: {
    width: 32,
    height: 32,
    background: 'var(--amp-sky)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 15,
    color: '#fff',
    letterSpacing: '-0.5px',
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 17,
    color: '#fff',
    letterSpacing: '0.5px',
  },
  divider: {
    width: 1,
    height: 20,
    background: 'rgba(255,255,255,0.2)',
  },
  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: 13.5,
  },
  crumbLink: {
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.15s',
  },
  crumbSep: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
  },
  crumbCurrent: {
    color: '#fff',
    fontWeight: 500,
  },
  spacer: { flex: 1 },
  portalLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  agentChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '5px 10px',
    borderRadius: 8,
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
  },
  agentAvatar: {
    width: 26,
    height: 26,
    borderRadius: '50%',
    background: 'var(--amp-sky)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    color: '#fff',
    flexShrink: 0,
  },
  agentName: { fontSize: 12.5, color: '#fff', fontWeight: 500 },
  agentRole: { fontSize: 10.5, color: 'rgba(255,255,255,0.4)' },
};

export default function Header({ breadcrumbs = [], onCrumbClick }) {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <div style={styles.logoMark}>A</div>
        <span style={styles.logoText}>AMP</span>
      </div>

      <div style={styles.divider} />

      <nav style={styles.breadcrumbs}>
        {breadcrumbs.map((crumb, i) => {
          const isLast = i === breadcrumbs.length - 1;
          return (
            <React.Fragment key={crumb.label}>
              {i > 0 && <span style={styles.crumbSep}>›</span>}
              {isLast ? (
                <span style={styles.crumbCurrent}>{crumb.label}</span>
              ) : (
                <span
                  style={styles.crumbLink}
                  onClick={() => onCrumbClick && onCrumbClick(crumb)}
                  onMouseEnter={e => (e.target.style.color = '#fff')}
                  onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.6)')}
                >
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      <div style={styles.spacer} />

      <span style={styles.portalLabel}>CSR Portal</span>

      <div style={styles.agentChip}>
        <div style={styles.agentAvatar}>JR</div>
        <div>
          <div style={styles.agentName}>Jamie R.</div>
          <div style={styles.agentRole}>CSR Agent</div>
        </div>
      </div>
    </header>
  );
}
