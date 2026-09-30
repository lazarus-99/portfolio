import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { skills } from '../../data/skills';

// Sizes and spring match Aceternity's Floating Dock, scaled up slightly.
const BASE = 70;
const MAX = 96;
const RANGE = 150;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

// Copies needed so the track stays wider than the viewport while it scrolls one copy's width.
const COPIES = 3;

function DockItem({ mouseX, name, icon: Icon, filled }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - bounds.x - bounds.width / 2;
  });

  const size = useSpring(useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]), SPRING);
  const iconSize = useSpring(
    useTransform(distance, [-RANGE, 0, RANGE], [BASE / 2, MAX / 2, BASE / 2]),
    SPRING
  );

  return (
    <li className="dock-item">
      <motion.div
        ref={ref}
        className="dock-bubble"
        style={{ width: size, height: size }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence>
          {hovered && (
            <motion.span
              className="dock-tooltip"
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
            >
              {name}
            </motion.span>
          )}
        </AnimatePresence>
        <motion.div className="dock-icon-wrap" style={{ width: iconSize, height: iconSize }}>
          <Icon className={`dock-icon ${filled ? 'dock-icon-filled' : ''}`} stroke={1.5} />
        </motion.div>
      </motion.div>
    </li>
  );
}

export default function SkillsDock() {
  const mouseX = useMotionValue(Infinity);
  const shiftX = useMotionValue(0);
  const trackRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Aceternity's dock is centered, so magnification spreads both ways. This row is left-anchored,
  // so shift it left by the growth that happens left of the cursor to keep the hovered icon in place.
  useAnimationFrame(() => {
    const track = trackRef.current;
    if (!track) return;
    const x = mouseX.get();
    let growthLeftOfCursor = 0;
    for (const bubble of track.querySelectorAll('.dock-bubble')) {
      const rect = bubble.getBoundingClientRect();
      const growth = rect.width - BASE;
      if (growth < 0.5) continue;
      if (rect.right <= x) growthLeftOfCursor += growth;
      else if (rect.left < x) growthLeftOfCursor += growth * ((x - rect.left) / rect.width);
    }
    const next = -growthLeftOfCursor;
    if (Math.abs(next - shiftX.get()) > 0.1) shiftX.set(next);
    else if (next === 0 && shiftX.get() !== 0) shiftX.set(0);
  });

  const pointerHandlers = reduceMotion
    ? {}
    : {
        onMouseMove: (e) => mouseX.set(e.clientX),
        onMouseLeave: () => mouseX.set(Infinity),
      };

  return (
    <div className="skills-dock" style={{ '--count': skills.length }}>
      <div className="dock-viewport">
        <motion.div className="dock-shift" style={{ x: shiftX }}>
          <div ref={trackRef} className="dock-track" {...pointerHandlers}>
            {Array.from({ length: COPIES }, (_, copy) => (
              <ul key={copy} className="dock-list" aria-hidden={copy > 0 || undefined}>
                {skills.map((skill) => (
                  <DockItem key={skill.name} mouseX={mouseX} {...skill} />
                ))}
              </ul>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
