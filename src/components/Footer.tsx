export default function Footer() {
  return (
    <footer style={{ background: '#050505', padding: '56px 0 32px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
              { heading: 'Services',  links: ['Missed-Call Text Back','AI Receptionist','Review Automation','Appointment Booking'] },
              { heading: 'Company',   links: ['About','How It Works','Pricing','Contact'] },
            ].map(col => (
              <div key={col.heading}>
                <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>{col.heading}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map(l => (
                    <a key={l} href="#" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                    >{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact + HIPAA */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>HIPAA Compliant</span>
            </div>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', lineHeight: 1.6, maxWidth: '170px', marginBottom: '14px' }}>
              All patient data handled with BAA agreements and encrypted storage.
            </p>
            <a href="mailto:hello@aurumautomation.co" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >hello@aurumautomation.co</a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.18)' }}>
            © 2026 Zeno. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy','Terms of Service'].map(l => (
              <a key={l} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
