import React, { useState, useEffect, useRef } from 'react';

export default function Toast({ message, onDone }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 350);
    }, 3000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 28,
      left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : -20}px)`,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.25s ease, transform 0.25s ease',
      zIndex: 300,
      background: 'var(--amp-navy)',
      color: '#fff',
      borderRadius: 10,
      padding: '12px 22px',
      fontSize: 13.5,
      fontWeight: 500,
      boxShadow: '0 4px 20px rgba(15,36,71,0.35)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
    }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      {message}
    </div>
  );
}
