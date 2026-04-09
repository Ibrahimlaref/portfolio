// components/ui/ParticleCanvas.tsx
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
}

interface Meteor {
  x: number;
  y: number;
  len: number;
  speed: number;
  alpha: number;
  width: number;
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const meteorsRef = useRef<Meteor[]>([]);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    starsRef.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random(),
    }));

    const spawnMeteor = () => {
      meteorsRef.current.push({
        x: Math.random() * canvas.width * 1.5,
        y: -20,
        len: Math.random() * 120 + 60,
        speed: Math.random() * 8 + 6,
        alpha: 1,
        width: Math.random() * 1.5 + 0.5,
      });
    };

    // Spawn meteors every 700ms
    const meteorInterval = setInterval(spawnMeteor, 700);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      starsRef.current.forEach((s) => {
        s.a += 0.005;
        if (s.a > 1) s.a = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.4 + Math.sin(s.a * Math.PI) * 0.5})`;
        ctx.fill();
      });

      // Draw meteors
      for (let i = meteorsRef.current.length - 1; i >= 0; i--) {
        const m = meteorsRef.current[i];
        const angle = Math.PI / 4;
        const gx = Math.cos(angle);
        const gy = Math.sin(angle);

        const grad = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x - gx * m.len,
          m.y - gy * m.len
        );
        grad.addColorStop(0, `rgba(255,255,255,${m.alpha})`);
        grad.addColorStop(0.3, `rgba(100,180,255,${m.alpha * 0.6})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - gx * m.len, m.y - gy * m.len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.stroke();

        m.x += gx * m.speed;
        m.y += gy * m.speed;
        m.alpha -= 0.012;

        if (
          m.alpha <= 0 ||
          m.x > canvas.width + 50 ||
          m.y > canvas.height + 50
        ) {
          meteorsRef.current.splice(i, 1);
        }
      }

      if (!document.hidden) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      } else {
        animate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(meteorInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ willChange: 'transform' }}
    />
  );
};

export default ParticleCanvas;