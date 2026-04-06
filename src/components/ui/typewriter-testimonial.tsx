'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Testimonial = {
  image: string;
  text: string;
  name: string;
  jobtitle: string;
};

type ComponentProps = {
  testimonials: Testimonial[];
};

export const TypewriterTestimonial: React.FC<ComponentProps> = ({ testimonials }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasBeenHovered, setHasBeenHovered] = useState<boolean[]>(new Array(testimonials.length).fill(false));
  const [typedText, setTypedText] = useState('');
  const typewriterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentTextRef = useRef('');

  const startTypewriter = useCallback((text: string) => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }
    setTypedText('');
    currentTextRef.current = text;

    let i = 0;
    const type = () => {
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
        i++;
        typewriterTimeoutRef.current = setTimeout(type, 30);
      }
    };
    type();
  }, []);

  const stopTypewriter = useCallback(() => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
      typewriterTimeoutRef.current = null;
    }
    setTypedText('');
    currentTextRef.current = '';
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
    setHasBeenHovered(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
    startTypewriter(testimonials[index].text);
  }, [testimonials, startTypewriter]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    stopTypewriter();
  }, [stopTypewriter]);

  useEffect(() => {
    return () => {
      stopTypewriter();
    };
  }, [stopTypewriter]);

  return (
    <div className="flex justify-center items-center gap-6 flex-wrap">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className="relative flex flex-col items-center"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 object-cover"
            style={{ cursor: 'pointer' }}
            animate={{
              borderColor: (hoveredIndex === index || hasBeenHovered[index]) ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.12)',
            }}
            transition={{ duration: 0.3 }}
          />
          <p className="mt-2 text-xs text-center" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '80px' }}>
            {testimonial.name}
          </p>
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-24 md:bottom-28 px-5 py-4 rounded-2xl shadow-2xl w-64 md:w-72 z-50"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <div className="h-28 overflow-hidden whitespace-pre-wrap text-sm leading-relaxed" style={{ color: '#1a1a1a' }}>
                  "{typedText}
                  <span className="animate-blink" style={{ borderRight: '2px solid #333', marginLeft: '1px' }}>&nbsp;</span>"
                </div>
                <p className="mt-3 text-right font-bold text-xs" style={{ color: '#000' }}>{testimonial.name}</p>
                <p className="text-right text-xs" style={{ color: '#666' }}>{testimonial.jobtitle}</p>
                {/* Speech bubble tail */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full shadow-lg" style={{ background: 'rgba(255,255,255,0.95)' }} />
                  <div className="w-2 h-2 rounded-full shadow-lg mt-1" style={{ background: 'rgba(255,255,255,0.9)' }} />
                  <div className="w-1 h-1 rounded-full shadow-lg mt-1" style={{ background: 'rgba(255,255,255,0.8)' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};
