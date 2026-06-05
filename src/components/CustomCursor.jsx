import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const colors = ['#a78bfa', '#06b6d4', '#f472b6', '#e879f9', '#38bdf8', '#ffffff'];
    let last = 0;

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;

      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;

      const now = Date.now();
      if (now - last > 30) {
        last = now;
        createSpark(x, y);
      }
    };

    const createSpark = (x, y) => {
      const el = document.createElement('span');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size  = 3 + Math.random() * 7;
      const dx    = (Math.random() - 0.5) * 60;
      const dy    = -(20 + Math.random() * 50);
      const rot   = Math.random() * 360;

      el.className = 'cursor-spark';
      el.style.cssText = `
        left:${x}px; top:${y}px;
        width:${size}px; height:${size}px;
        background:${color};
        box-shadow:0 0 ${size + 4}px ${color}, 0 0 ${size * 2 + 6}px ${color}88;
        --dx:${dx}px; --dy:${dy}px; --rot:${rot}deg;
      `;
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove(), { once: true });
    };

    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return <div ref={cursorRef} className="cursor-main" />;
}
