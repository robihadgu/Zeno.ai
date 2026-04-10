const TICKER_ITEMS = [
  '⚡ James in Alexandria recovered $420 in week one',
  '📅 3 appointments booked in the last hour',
  '⭐ Priya in Reston went from 43 to 201 Google reviews',
  '💬 Missed call recovered in 4 seconds — Northern Virginia',
  '📞 Melissa in Tysons cut front-desk calls by 60%',
  '🚀 New client live in 3 days — no disruption to workflow',
];

const DIVIDER = ' · ';

function TickerContent() {
  return (
    <>
      {TICKER_ITEMS.map((item, i) => (
        <span key={i} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', fontWeight: 500 }}>{item}</span>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px', fontWeight: 500, margin: '0 18px' }}>{DIVIDER}</span>
        </span>
      ))}
    </>
  );
}

export default function LiveTicker() {
  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 40s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          height: '38px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Fade masks */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, rgba(5,5,5,1), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, rgba(5,5,5,1), transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <div
          className="ticker-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Duplicated twice for seamless loop */}
          <TickerContent />
          <TickerContent />
        </div>
      </div>
    </>
  );
}
