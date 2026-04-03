import React from 'react';
import ampLogoWhite from '../../images/AMP_Logo_White.png';

const styles = {
  footer: {
    background: '#1F4F9F',
    padding: '28px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    flexWrap: 'wrap',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  },
  logoMark: {
    width: 36,
    height: 36,
    background: '#fff',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 16,
    color: '#2E4494',
    letterSpacing: '-0.5px',
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 18,
    color: '#fff',
    letterSpacing: '0.5px',
  },
  logoSubText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: '0.5px',
    marginTop: 1,
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  socialLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  iconLink: {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.4)',
    transition: 'border-color 0.15s',
  },
  bottomBar: {
    background: '#152E50',
    padding: '14px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
  },
  copyright: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12.5,
  },
  bottomLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  bottomLink: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    fontSize: 12.5,
    fontWeight: 500,
  },
};

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer>
      <div style={styles.footer}>
        <a href="https://ampmemberships.com" target="_blank" rel="noopener noreferrer" style={styles.logoLink}>
          <img src={ampLogoWhite} alt="AMP" style={{ height: 70, display: 'block' }} />
        </a>

        <a
          href="https://ampmemberships.com/amp-privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.navLink}
        >
          Privacy Policy
        </a>

        <div style={styles.socialLinks}>
          <a
            href="https://www.linkedin.com/company/amp-memberships/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconLink}
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://www.facebook.com/ampmemberships"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconLink}
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="mailto:info@ampmemberships.com"
            style={styles.iconLink}
            aria-label="Email"
          >
            <EmailIcon />
          </a>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <span style={styles.copyright}>
          &copy; 2023 &ndash; All Rights Reserved &ndash; AMP is an AMP Memberships, LLC product.
        </span>
        <div style={styles.bottomLinks}>
          <a
            href="https://ampmemberships.com/get-started/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.bottomLink}
          >
            Contact Us
          </a>
          <a
            href="https://ampmemberships.com/about-us/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.bottomLink}
          >
            About Us
          </a>
        </div>
      </div>
    </footer>
  );
}
