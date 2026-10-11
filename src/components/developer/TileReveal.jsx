import { useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m, useScroll, useSpring, useTransform } from 'motion/react';
import { skills } from '../../data/skills';

// 4×3 grid with the two middle cells of row 2 left empty for the headline: exactly 10 tiles.
const COLUMNS = 4;
const CELLS = [
  [0, 0], [1, 0], [2, 0], [3, 0],
  [0, 1],                 [3, 1],
  [0, 2], [1, 2], [2, 2], [3, 2],
];
const ROWS = 3;

// Phases of the scroll progress (0..1): tiles fly in, then the grid zooms and spreads them off stage.
const FLY_END = 0.5;
const STAGGER = 0.14; // delay between tiles of a column, as a share of the fly-in phase
const ZOOM_START = 0.42; // overlaps the end of the fly-in
const ZOOM = 2.05;
const INTRO_START = 0.86;

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOutCubic = (p) => 1 - (1 - p) ** 3;
const easeInCubic = (p) => p ** 3;

function Tile({ progress, col, row, skill }) {
  const { name, icon: Icon, filled } = skill;
  // Even columns enter from the top, odd ones from the bottom.
  const from = col % 2 === 0 ? -1 : 1;
  // Outward direction from the grid center, used to push the tile off stage while zooming.
  const dx = col - (COLUMNS - 1) / 2;
  const dy = row - (ROWS - 1) / 2;
  const len = Math.hypot(dx, dy) || 1;
  const order = from === -1 ? row : ROWS - 1 - row;

  const fly = useTransform(progress, (s) =>
    clamp01((s / FLY_END - order * STAGGER) / (1 - (ROWS - 1) * STAGGER))
  );
  const zoom = useTransform(progress, (s) => easeInCubic(clamp01((s - ZOOM_START) / (1 - ZOOM_START))));

  const push = () => Math.max(window.innerWidth, window.innerHeight) * 0.55;
  const x = useTransform(zoom, (z) => (dx / len) * push() * z);
  const y = useTransform([fly, zoom], ([f, z]) =>
    (1 - easeOutCubic(f)) * from * window.innerHeight * 1.1 + (dy / len) * push() * z
  );
  const opacity = useTransform(fly, (f) => clamp01(f * 3));

  return (
    <m.li
      className="tile-reveal-tile"
      style={{ gridColumn: col + 1, gridRow: row + 1, x, y, opacity }}
    >
      <Icon className={`tile-reveal-icon ${filled ? 'tile-reveal-icon-filled' : ''}`} stroke={1.5} aria-hidden="true" />
      <span className="tile-reveal-name">{name}</span>
    </m.li>
  );
}

export default function TileReveal({ eyebrow, title, summary, stackLabel }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // A short lag behind the scroll position so the motion doesn't feel rigid.
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.6 });

  const gridScale = useTransform(progress, (s) => {
    const z = easeInCubic(clamp01((s - ZOOM_START) / (1 - ZOOM_START)));
    return 1 + (ZOOM - 1) * z;
  });
  const introOpacity = useTransform(progress, (s) => clamp01((s - INTRO_START) / 0.1));

  // Mandatory section snapping would fight a long scroll-driven block, so it's off only while the
  // Developer section fills the whole screen. Above or below it, the other sections still snap.
  useEffect(() => {
    const root = document.documentElement;
    const section = ref.current.closest('section');
    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, bottom } = section.getBoundingClientRect();
      root.classList.toggle('snap-free', top <= 1 && bottom >= window.innerHeight - 1);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      root.classList.remove('snap-free');
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={ref} className="tile-reveal">
        <div className="tile-reveal-stage">
          <m.ul className="tile-reveal-grid" style={{ scale: gridScale }} aria-hidden="true">
            {CELLS.map(([col, row], i) => (
              <Tile key={skills[i].name} progress={progress} col={col} row={row} skill={skills[i]} />
            ))}
          </m.ul>
          <div className="tile-reveal-copy">
            <h2 id="developer-title" className="section-eyebrow">{eyebrow}</h2>
            <h3 className="tile-reveal-title">{title}</h3>
            <m.p className="tile-reveal-intro" style={{ opacity: introOpacity }}>
              {summary}
            </m.p>
          </div>
          {/* The animated tiles are hidden from screen readers; this gives them the technology list once. */}
          <ul className="sr-only" aria-label={stackLabel}>
            {skills.map(({ name }) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </LazyMotion>
  );
}
