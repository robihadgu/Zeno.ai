import { useEffect, useRef } from 'react';

// ── colour palette ─────────────────────────────────────────────────────────
const ORBS = [
  { cx: 0.18, cy: 0.28, rx: 0.22, ry: 0.16, ps: 0.0032, py: 1.3,  size: 0.60, rgb: [37,  99, 235], alpha: 0.52 },
  { cx: 0.82, cy: 0.22, rx: 0.20, ry: 0.13, ps: 0.0028, py: 0.85, size: 0.55, rgb: [124, 58, 237], alpha: 0.48 },
  { cx: 0.50, cy: 0.68, rx: 0.24, ry: 0.20, ps: 0.0036, py: 1.55, size: 0.50, rgb: [14, 165, 233], alpha: 0.44 },
  { cx: 0.12, cy: 0.78, rx: 0.16, ry: 0.11, ps: 0.0042, py: 0.65, size: 0.42, rgb: [99, 102, 241], alpha: 0.40 },
  { cx: 0.88, cy: 0.58, rx: 0.18, ry: 0.15, ps: 0.0025, py: 1.80, size: 0.46, rgb: [29,  78, 216], alpha: 0.42 },
  { cx: 0.50, cy: 0.12, rx: 0.28, ry: 0.10, ps: 0.0020, py: 0.92, size: 0.52, rgb: [139, 92, 246], alpha: 0.36 },
];

interface ShootingStar {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  len: number;
}

interface PulseRing {
  x: number; y: number;
  r: number; maxR: number;
  life: number; maxLife: number;
  rgb: number[];
}

// ── component ──────────────────────────────────────────────────────────────
export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;

    let W = 0, H = 0;
    const mouse  = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };

    const resize = () => {
      // render at half res for perf, CSS stretches it to full
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = Math.round(W * 0.6);
      canvas.height = Math.round(H * 0.6);
    };
    resize();

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / W;
      mouse.y = e.clientY / H;
    };
    window.addEventListener('resize',    resize);
    window.addEventListener('mousemove', onMouse);

    // mutable orb phases
    const phases = ORBS.map((_, i) => i * 1.05);

    // shooting stars
    const stars: ShootingStar[] = [];
    let nextStar  = 180;

    // pulse rings
    const rings: PulseRing[] = [];
    let nextRing  = 220;

    let frame = 0;
    let raf: number;

    const draw = () => {
      frame++;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = cw / W;   // normalised scale (≈0.6)

      // smooth mouse
      smooth.x += (mouse.x - smooth.x) * 0.04;
      smooth.y += (mouse.y - smooth.y) * 0.04;
      const mx = (smooth.x - 0.5) * 0.09;
      const my = (smooth.y - 0.5) * 0.07;

      ctx.clearRect(0, 0, cw, ch);

      // ── aurora orbs ──────────────────────────────────────────────────────
      ORBS.forEach((orb, i) => {
        phases[i] += orb.ps;
        const x = (orb.cx + Math.cos(phases[i])              * orb.rx + mx) * cw;
        const y = (orb.cy + Math.sin(phases[i] * orb.py)     * orb.ry + my) * ch;
        const r = orb.size * Math.min(cw, ch) * 0.9;

        const [R, G, B] = orb.rgb;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0,    `rgba(${R},${G},${B},${orb.alpha * 0.35})`);
        g.addColorStop(0.30, `rgba(${R},${G},${B},${orb.alpha * 0.18})`);
        g.addColorStop(0.65, `rgba(${R},${G},${B},${orb.alpha * 0.06})`);
        g.addColorStop(1,    `rgba(${R},${G},${B},0)`);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // ── shooting stars ───────────────────────────────────────────────────
      if (frame >= nextStar) {
        const dir = Math.random() > 0.5 ? 1 : -1;
        stars.push({
          x:       dir > 0 ? -20 * scale : (W + 20) * scale,
          y:       Math.random() * ch * 0.55,
          vx:      dir * (3.5 + Math.random() * 2.5) * scale,
          vy:      (0.6 + Math.random() * 1.2) * scale,
          life:    0,
          maxLife: 55 + Math.random() * 50,
          len:     (60 + Math.random() * 80) * scale,
        });
        nextStar = frame + 150 + Math.random() * 280;
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx; s.y += s.vy; s.life++;
        const p = s.life / s.maxLife;
        const a = p < 0.25 ? p / 0.25 : 1 - (p - 0.25) / 0.75;
        const tx = s.x - (s.vx / Math.abs(s.vx)) * s.len;
        const ty = s.y - (s.vy / Math.abs(s.vx)) * s.len;
        const sg = ctx.createLinearGradient(tx, ty, s.x, s.y);
        sg.addColorStop(0, `rgba(255,255,255,0)`);
        sg.addColorStop(0.7, `rgba(200,220,255,${a * 0.5})`);
        sg.addColorStop(1, `rgba(255,255,255,${a * 0.85})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = sg;
        ctx.lineWidth = 1.5 * scale;
        ctx.stroke();
        // head glow
        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 4 * scale);
        hg.addColorStop(0, `rgba(200,220,255,${a * 0.9})`);
        hg.addColorStop(1, `rgba(200,220,255,0)`);
        ctx.beginPath(); ctx.arc(s.x, s.y, 4 * scale, 0, Math.PI * 2);
        ctx.fillStyle = hg; ctx.fill();
        if (s.life >= s.maxLife) stars.splice(i, 1);
      }

      // ── pulse rings ──────────────────────────────────────────────────────
      if (frame >= nextRing) {
        const orb = ORBS[Math.floor(Math.random() * ORBS.length)];
        const oi  = ORBS.indexOf(orb);
        rings.push({
          x:       (orb.cx + mx) * cw,
          y:       (orb.cy + my) * ch,
          r:       0,
          maxR:    (0.18 + Math.random() * 0.14) * Math.min(cw, ch),
          life:    0,
          maxLife: 90 + Math.random() * 40,
          rgb:     ORBS[oi].rgb,
        });
        nextRing = frame + 200 + Math.random() * 300;
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.life++;
        ring.r = (ring.life / ring.maxLife) * ring.maxR;
        const p = ring.life / ring.maxLife;
        const a = (1 - p) * 0.22;
        const [R, G, B] = ring.rgb;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${R},${G},${B},${a})`;
        ctx.lineWidth = (1.5 * (1 - p * 0.5)) * scale;
        ctx.stroke();
        if (ring.life >= ring.maxLife) rings.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width:  '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        // slight blur turns the low-res canvas into a silky aurora
        filter: 'blur(32px) saturate(1.4)',
        opacity: 0.85,
      }}
    />
  );
}
