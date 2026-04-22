import React from 'react';

const styles = {
  header: {
    height: 'var(--header-h)',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    padding: '0 28px',
    gap: '16px',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    boxShadow: '0 2px 12px rgba(15,36,71,0.12)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px',
  },
  divider: {
    width: 1,
    height: 20,
    background: 'rgba(46,68,148,0.2)',
  },
  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: 13.5,
  },
  crumbLink: {
    color: 'rgba(46,68,148,0.45)',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.15s',
  },
  crumbSep: {
    color: 'rgba(46,68,148,0.25)',
    fontSize: 12,
  },
  crumbCurrent: {
    color: '#2E4494',
    fontWeight: 500,
  },
  spacer: { flex: 1 },
  portalLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 10,
    color: 'rgba(46,68,148,0.4)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  agentWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  agentAvatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'var(--brand-sky)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    color: '#fff',
    flexShrink: 0,
  },
  agentName: {
    fontSize: 11,
    color: '#2E4494',
    fontWeight: 500,
    lineHeight: 1,
  },
};

export default function Header({ breadcrumbs = [], onCrumbClick }) {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        {/* TODO: add logo */}
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
                  onMouseEnter={e => (e.target.style.color = '#2E4494')}
                  onMouseLeave={e => (e.target.style.color = 'rgba(46,68,148,0.45)')}
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

      <div style={styles.agentWrap}>
        <div style={styles.agentAvatar}>JR</div>
        <div style={styles.agentName}>Jamie R.</div>
      </div>
    </header>
  );
}
