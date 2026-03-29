import { useState } from 'react';
import { openBooking } from './BookingModal';

interface UrgencyStripProps {
  onDismiss: () => void;
}

export default function UrgencyStrip({ onDismiss }: UrgencyStripProps) {
  const [hoverCta, setHoverCta] = useState(false);

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: '36px',
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
        }}
      >
        {/* Pulsing green dot */}
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgb(34,197,94)',
            flexShrink: 0,
            marginRight: '10px',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }}
        />

        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
          Now taking new clients in Northern Virginia —{' '}
        </span>
        <span
          onClick={openBooking}
          onMouseEnter={() => setHoverCta(true)}
          onMouseLeave={() => setHoverCta(false)}
          style={{
            fontSize: '12px',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: hoverCta ? 'underline' : 'none',
            marginLeft: '4px',
          }}
        >
          Claim your spot →
        </span>

        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.35)',
            fontSize: '16px',
            lineHeight: 1,
            cursor: 'pointer',
            padding: '4px 6px',
            transition: 'color 0.18s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.8)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.35)'; }}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </>
  );
}
