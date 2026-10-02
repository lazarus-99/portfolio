import { useRef, useState } from 'react';
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
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

function DockItem({ mouseX, name, icon: Icon, filled, focusable, tabIndex, itemRef, onFocusVisible }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - bounds.x - bounds.width / 2;
  });

  const size = useSpring(useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]), SPRING);
  const iconSize = useSpring(
    useTransform(distance, [-RANGE, 0, RANGE], [BASE / 2, MAX / 2, BASE / 2]),
    SPRING
  );

  // Only keyboard focus shows the tooltip; a mouse click already has hover.
  const focusProps = focusable
    ? {
        tabIndex,
        onFocus: (e) => {
          if (!e.currentTarget.matches(':focus-visible')) return;
          setFocused(true);
          onFocusVisible(e.currentTarget, ref.current);
        },
        onBlur: () => setFocused(false),
      }
    : {};

  return (
    <li ref={itemRef} className="dock-item" {...focusProps}>
      <span className="sr-only">{name}</span>
      <m.div
        ref={ref}
        className="dock-bubble"
        style={{ width: size, height: size }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence>
          {(hovered || focused) && (
            <m.span
              className="dock-tooltip"
              aria-hidden="true"
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
            >
              {name}
            </m.span>
          )}
        </AnimatePresence>
        <m.div className="dock-icon-wrap" style={{ width: iconSize, height: iconSize }}>
          <Icon
            className={`dock-icon ${filled ? 'dock-icon-filled' : ''}`}
            stroke={1.5}
            aria-hidden="true"
          />
        </m.div>
      </m.div>
      {/* Shown instead of the tooltip on touch screens, which have no hover. */}
      <span className="dock-caption" aria-hidden="true">
        {name}
      </span>
    </li>
  );
}

export default function SkillsDock() {
  const mouseX = useMotionValue(Infinity);
  const shiftX = useMotionValue(0);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Keyboard focus behaves like hovering: bring the item into the visible area and magnify it.
  const handleFocusVisible = (index, item, bubble) => {
    setActiveIndex(index);
    const viewport = viewportRef.current;
    const view = viewport.getBoundingClientRect();
    const rect = item.getBoundingClientRect();
    const fade = view.width * 0.1;
    if (rect.left < view.left + fade || rect.right > view.right - fade) {
      viewport.scrollLeft += rect.left + rect.width / 2 - (view.left + view.width / 2);
    }
    if (!reduceMotion) {
      const b = bubble.getBoundingClientRect();
      mouseX.set(b.left + b.width / 2);
    }
  };

  const handleKeyDown = (e) => {
    const last = skills.length - 1;
    const next = {
      ArrowRight: activeIndex === last ? 0 : activeIndex + 1,
      ArrowLeft: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    itemRefs.current[next]?.focus({ preventScroll: true });
  };

  const handleBlur = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    mouseX.set(Infinity);
    viewportRef.current.scrollLeft = 0;
  };

  const pointerHandlers = reduceMotion
    ? {}
    : {
        onMouseMove: (e) => mouseX.set(e.clientX),
        onMouseLeave: () => mouseX.set(Infinity),
      };

  return (
    // `m` + LazyMotion loads only the DOM animation features instead of the full `motion` bundle.
    <LazyMotion features={domAnimation} strict>
      <div className="skills-dock" style={{ '--count': skills.length }}>
        <div ref={viewportRef} className="dock-viewport">
          <m.div className="dock-shift" style={{ x: shiftX }}>
            <div
              ref={trackRef}
              className="dock-track"
              onBlur={handleBlur}
              {...pointerHandlers}
            >
              {Array.from({ length: COPIES }, (_, copy) => (
                <ul
                  key={copy}
                  className="dock-list"
                  aria-hidden={copy > 0 || undefined}
                  onKeyDown={copy === 0 ? handleKeyDown : undefined}
                >
                  {skills.map((skill, index) => (
                    <DockItem
                      key={skill.name}
                      mouseX={mouseX}
                      {...skill}
                      focusable={copy === 0}
                      tabIndex={index === activeIndex ? 0 : -1}
                      itemRef={
                        copy === 0
                          ? (el) => {
                              itemRefs.current[index] = el;
                            }
                          : undefined
                      }
                      onFocusVisible={(item, bubble) => handleFocusVisible(index, item, bubble)}
                    />
                  ))}
                </ul>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}
