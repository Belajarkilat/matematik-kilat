import React, { useState, useEffect } from 'react';

/**
 * Offline Indicator Component
 * Shows connection status in the top-right corner
 */

function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#E74C3C',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '3px solid #C0392B',
        boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
        fontSize: '0.95rem',
        fontWeight: 'bold',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        animation: 'pulse 1s ease-in-out infinite'
      }}
    >
      <span style={{ fontSize: '1.2rem' }}>📡</span>
      Offline Mode
    </div>
  );
}

export default OfflineIndicator;
