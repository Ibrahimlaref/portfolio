// components/ui/CursorGlow.tsx
import { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (window.innerWidth < 768) return null;

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-72 h-72 bg-cyan-400/15 rounded-full pointer-events-none z-0 blur-3xl"
      style={{ willChange: 'transform' }}
    />
  );
};

export default CursorGlow;