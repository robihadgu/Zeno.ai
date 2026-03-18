import { useEffect, useRef, useState } from 'react';

interface Props {
  value: string;   // e.g. "30%", "85%", "9 PM"
  duration?: number;
  style?: React.CSSProperties;
}

function parse(str: string) {
  const m = str.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { pre: '', num: 0, suf: str };
  return { pre: m[1], num: parseFloat(m[2]), suf: m[3] };
}

export default function CountUp({ value, duration = 1800, style }: Props) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { pre, num, suf } = parse(value);

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || done.current) return;
      done.current = true;
      obs.disconnect();

      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        const cur = p < 1 ? Math.floor(eased * num) : num;
        setDisplay(pre + cur + suf);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return <span ref={ref} style={style}>{display}</span>;
}
