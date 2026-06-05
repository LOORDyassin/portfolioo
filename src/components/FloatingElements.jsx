import { useMemo } from 'react';

const TYPES  = ['ring', 'ring', 'diamond', 'dot', 'ring', 'cross', 'diamond', 'ring', 'dot', 'cross'];
const COLORS = [
  'rgba(124,58,237,',   // violet
  'rgba(6,182,212,',    // cyan
  'rgba(244,114,182,',  // pink
  'rgba(167,139,250,',  // light violet
  'rgba(56,189,248,',   // sky
];

const p = (n, max) => ((n * 2654435761) >>> 0) % max;

export default function FloatingElements() {
  const items = useMemo(() =>
    Array.from({ length: 32 }, (_, i) => {
      const op = 0.2 + p(i * 7 + 3, 18) / 100;
      return {
        id:       i,
        type:     TYPES[i % TYPES.length],
        color:    `${COLORS[i % COLORS.length]}${op})`,
        size:     7 + p(i * 3 + 1, 14),
        x:        p(i * 17 + 5, 90) + 5,
        y:        p(i * 11 + 9, 86) + 7,
        duration: 5 + p(i * 5 + 2, 7),
        delay:    -(p(i * 13 + 7, 8)),
      };
    }), []);

  return (
    <div className="floating-bg" aria-hidden="true">
      {items.map(el => (
        <span
          key={el.id}
          className={`fb fb-${el.type}`}
          style={{
            '--c':   el.color,
            '--s':   el.size + 'px',
            '--dur': el.duration + 's',
            '--del': el.delay + 's',
            left:    el.x + '%',
            top:     el.y + '%',
          }}
        />
      ))}
    </div>
  );
}
