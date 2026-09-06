import React, { useState, useEffect } from 'react';

/**
 * Tells the child the radio is off, and that it does not matter. With the
 * service worker in place the quiz keeps working, so this is reassurance,
 * not an error.
 */

function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);
    window.addEventListener('online', online);
    window.addEventListener('offline', offline);
    return () => {
      window.removeEventListener('online', online);
      window.removeEventListener('offline', offline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="pill"
      style={{
        position: 'fixed',
        top: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        boxShadow: '0 3px 0 var(--kilat-deep)'
      }}
    >
      Tiada internet — kuiz tetap boleh dimain
    </div>
  );
}

export default OfflineIndicator;
