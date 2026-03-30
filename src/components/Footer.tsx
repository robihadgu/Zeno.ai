export default function Footer() {
  return (
    <footer className="dot-grid" style={{ background: 'linear-gradient(to bottom, #060610, #050505)', padding: '56px 0 32px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
      {/* UPGRADE 11 — Top gradient beam */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent)',
      }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '28px' }}>

          {/* Brand */}
          <div>
            <img
              src="/Apexai.jpg"
              alt="Zeno logo"
              style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px' }}>
            {[
              { heading: 'Services', links: [
                { label: 'Missed-Call Text Back', href: '#solution' },
                { label: 'AI Receptionist',       href: '#solution' },
                { label: 'Review Automation',     href: '#solution' },
                { label: 'Appointment Booking',   href: '#solution' },
              ]},
              { heading: 'Company', links: [
                { label: 'About',        href: '#'                          },
                { label: 'How It Works', href: '#solution'                  },
                { label: 'Pricing',      href: '#pricing'                   },
                { label: 'Contact',      href: 'mailto:hello@zenoautomation.ai' },
              ]},
            ].map(col => (
              <div key={col.heading}>
                <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>{col.heading}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map(l => (
                    <a key={l.label} href={l.href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                    >{l.label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact + Security */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>Encrypted & Secure</span>
            </div>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', lineHeight: 1.6, maxWidth: '170px', marginBottom: '14px' }}>
              All customer data handled with encrypted messaging and secure storage.
            </p>
            <a href="mailto:hello@zenoautomation.ai" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >hello@zenoautomation.ai</a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.18)' }}>
            © 2026 Zeno. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { label: 'Privacy Policy',    href: '/privacy-policy'    },
              { label: 'Terms of Service',  href: '/terms-of-service'  },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
              >{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
