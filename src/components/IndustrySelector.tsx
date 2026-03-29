import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Industry = 'Med Spa' | 'Dental' | 'Fitness Studio' | 'Law Firm' | 'Real Estate' | 'Auto Shop';

const industries: Industry[] = ['Med Spa', 'Dental', 'Fitness Studio', 'Law Firm', 'Real Estate', 'Auto Shop'];

const stats: Record<Industry, string> = {
  'Med Spa':       'Med spas using Zeno recover an average of $4,200/month in missed bookings.',
  'Dental':        'Dental practices see 3× more new patient bookings within 30 days.',
  'Fitness Studio':'Fitness studios fill 40% more class slots with automated follow-ups.',
  'Law Firm':      'Law firms capture 55% more consultation requests after hours.',
  'Real Estate':   'Real estate teams respond to leads 18× faster and close more deals.',
  'Auto Shop':     'Auto shops recover an average of $1,800/month from missed service calls.',
};

export default function IndustrySelector() {
  const [selected, setSelected] = useState<Industry>('Med Spa');

  return (
    <div style={{ background: '#050505', padding: '32px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
          {industries.map(ind => (
            <button
              key={ind}
              onClick={() => setSelected(ind)}
              style={{
                padding: '7px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: selected === ind ? '#fff' : 'rgba(255,255,255,0.05)',
                color: selected === ind ? '#000' : 'rgba(255,255,255,0.55)',
                border: selected === ind ? '1px solid #fff' : '1px solid rgba(255,255,255,0.1)',
                letterSpacing: selected === ind ? '-0.2px' : '0',
              }}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Stat line */}
        <div style={{ textAlign: 'center', minHeight: '28px' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.5)',
                fontWeight: 500,
                margin: 0,
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>
                {stats[selected].split(' ').slice(0, 4).join(' ')}
              </span>
              {' '}
              {stats[selected].split(' ').slice(4).join(' ')}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
