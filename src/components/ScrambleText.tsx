import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>?';

interface Props {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function ScrambleText({ text, delay = 0, style, className }: Props) {
  const [display, setDisplay] = useState(() =>
    text.replace(/\S/g, () => CHARS[Math.floor(Math.random() * CHARS.length)])
  );

  useEffect(() => {
    let frame = 0;
    const totalFrames = 24;
    const chars = text.split('');
    let intervalId: ReturnType<typeof setInterval>;

    const timerId = setTimeout(() => {
      intervalId = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setDisplay(
          chars.map((char, i) => {
            if (char === ' ') return ' ';
            if (i / chars.length < progress) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );
        if (frame >= totalFrames) {
          clearInterval(intervalId);
          setDisplay(text);
        }
      }, 36);
    }, delay);

    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
  }, [text, delay]);

  return <span style={style} className={className}>{display}</span>;
}
