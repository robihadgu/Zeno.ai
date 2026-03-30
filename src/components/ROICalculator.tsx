import { useState } from 'react';
import { openBooking } from './BookingModal';

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString();
}

export default function ROICalculator() {
  const [dailyCalls, setDailyCalls] = useState(25);
  const [missedPct, setMissedPct] = useState(40);
  const [ticketValue, setTicketValue] = useState(150);

  const missedPerMonth = Math.round(dailyCalls * (missedPct / 100) * 30);
  const lostBookings   = Math.round(missedPerMonth * 0.25);
  const revLostMonthly = lostBookings * ticketValue;
  const revLostYearly  = revLostMonthly * 12;
  const recoveredMonthly = Math.round(revLostMonthly * 0.68);

  return (
    <>
      <style>{`
        .roi-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.12);
          outline: none;
          cursor: pointer;
        }
        .roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.6);
          transition: transform 0.15s;
        }
        .roi-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .roi-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }
      `}</style>

      <section style={{ background: '#050505', padding: '96px 0', position: 'relative' }}>
        {/* top border */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '999px', padding: '5px 14px', marginBottom: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 0 12px rgba(37,99,235,0.25)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Revenue Calculator</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.12, marginBottom: '16px' }}>
              See exactly what missed calls are costing you.
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
              Move the sliders. The math speaks for itself.
            </p>
          </div>

          {/* Calculator card */}
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: 'clamp(24px, 5vw, 40px)',
            }}>

              {/* Sliders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '36px' }}>

                {/* Slider 1 */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                      Calls received per day
                    </label>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px 12px' }}>
                      {dailyCalls}
                    </span>
                  </div>
                  <input
                    type="range"
                    className="roi-slider"
                    min={5}
                    max={100}
                    value={dailyCalls}
                    onChange={e => setDailyCalls(Number(e.target.value))}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>5</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>100</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                      Missed after hours (%)
                    </label>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px 12px' }}>
                      {missedPct}%
                    </span>
                  </div>
                  <input
                    type="range"
                    className="roi-slider"
                    min={10}
                    max={80}
                    value={missedPct}
                    onChange={e => setMissedPct(Number(e.target.value))}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>10%</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>80%</span>
                  </div>
                </div>

                {/* Slider 3 */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                      Average booking value
                    </label>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px 12px' }}>
                      ${ticketValue}
                    </span>
                  </div>
                  <input
                    type="range"
                    className="roi-slider"
                    min={50}
                    max={500}
                    step={10}
                    value={ticketValue}
                    onChange={e => setTicketValue(Number(e.target.value))}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>$50</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>$500</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '28px' }} />

              {/* Results */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>

                {/* Missed calls */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  padding: '18px',
                  textAlign: 'center',
                }}>
                  <p style={{ fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-1px', lineHeight: 1, marginBottom: '6px' }}>
                    {missedPerMonth}
                  </p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Missed calls/month</p>
                </div>

                {/* Lost bookings */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  padding: '18px',
                  textAlign: 'center',
                }}>
                  <p style={{ fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-1px', lineHeight: 1, marginBottom: '6px' }}>
                    {lostBookings}
                  </p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Lost bookings/month</p>
                </div>

                {/* Revenue lost — highlighted */}
                <div style={{
                  background: 'rgba(239,68,68,0.06)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  borderRadius: '14px',
                  padding: '18px',
                  textAlign: 'center',
                  boxShadow: '0 0 24px rgba(239,68,68,0.08)',
                }}>
                  <p style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, color: '#fff', letterSpacing: '-1px', lineHeight: 1, marginBottom: '6px' }}>
                    {fmt(revLostMonthly)}/mo
                  </p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Revenue lost/month</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginTop: '4px' }}>{fmt(revLostYearly)}/year</p>
                </div>
              </div>

              {/* Recovery estimate */}
              <div style={{
                background: 'rgba(34,197,94,0.06)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '14px',
                padding: '18px 22px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0, flex: 1 }}>
                  Zeno recovers an average of 68% of missed calls.
                </p>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '11px', color: 'rgba(34,197,94,0.7)', fontWeight: 600, marginBottom: '2px' }}>Estimated monthly recovery</p>
                  <p style={{ fontSize: '24px', fontWeight: 900, color: 'rgb(34,197,94)', letterSpacing: '-0.8px', lineHeight: 1 }}>
                    {fmt(recoveredMonthly)}/mo
                  </p>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={openBooking}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '14px',
                  background: '#fff',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(255,255,255,0.15)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(255,255,255,0.25)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(255,255,255,0.15)'; }}
              >
                Start Recovering This Revenue
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
