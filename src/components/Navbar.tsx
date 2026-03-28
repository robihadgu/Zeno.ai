import { useEffect, useState } from 'react';
import { openBooking } from './BookingModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'How It Works', href: '#solution' },
    { label: 'Services',     href: '#solution' },
    { label: 'Pricing',      href: '#pricing'  },
    { label: 'About',        href: '#why-us'   },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(5,5,5,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img
              src="/Apexai.jpg"
              alt="Zeno logo"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                objectFit: 'cover',
                display: 'block',
                boxShadow: '0 2px 12px rgba(255,255,255,0.15)',
              }}
            />
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#fff', letterSpacing: '-0.3px' }}>Zeno</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '32px' }}>
            {links.map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >{l.label}</a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={openBooking} style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#fff', color: '#000',
              fontWeight: 700, fontSize: '13px', letterSpacing: '-0.1px',
              padding: '9px 18px', borderRadius: '8px', border: 'none',
              boxShadow: '0 2px 12px rgba(255,255,255,0.12)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px rgba(255,255,255,0.12)'; }}
            >
              Book a Free Demo
            </button>
            <button className="md:hidden" onClick={() => setMenuOpen(o => !o)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '7px', padding: '8px', cursor: 'pointer', color: '#fff' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(20px)', padding: '16px 0 20px' }}>
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '13px 0', fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{l.label}</a>
            ))}
            <button onClick={() => { setMenuOpen(false); openBooking(); }} style={{ display: 'block', width: '100%', marginTop: '16px', textAlign: 'center', background: '#fff', color: '#000', fontWeight: 700, fontSize: '14px', padding: '13px', borderRadius: '9px', border: 'none' }}>
              Book a Free Demo
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
