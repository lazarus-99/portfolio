import { useEffect, useId, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import './index.css';

// A wave across a 1200×400 box; it starts and ends off the edges so the text enters and leaves unseen.
const PATH = 'M -120 200 C 150 105, 350 105, 600 200 S 1050 295, 1320 200';
const SPEED = 70; // path units per second

export default function TextLoop({ items, separator = '✦' }) {
  const pathId = `text-loop-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const [copies, setCopies] = useState(3);
  const reduceMotion = usePrefersReducedMotion();
  const segment = items.map((item) => `${item.toUpperCase()}  ${separator}  `).join('');

  useEffect(() => {
    const wrap = wrapRef.current;
    const textPath = textPathRef.current;
    let segmentLength = 0;
    let offset = 0;
    let last = 0;
    let frame = 0;
    let visible = false;
    let hovered = false;
    let cancelled = false;

    const tick = (time) => {
      if (last) offset = (offset - (SPEED * (time - last)) / 1000) % segmentLength;
      last = time;
      textPath.setAttribute('startOffset', offset);
      frame = requestAnimationFrame(tick);
    };
    // Runs only while on screen, not hovered, and once the text has been measured.
    const sync = () => {
      const run = !reduceMotion && visible && !hovered && segmentLength > 0;
      if (run && !frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      } else if (!run && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    // Measure after the web font loads, so one repetition's length is exact and the loop is seamless.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      segmentLength = measureRef.current.getComputedTextLength();
      setCopies(Math.ceil(pathRef.current.getTotalLength() / segmentLength) + 2);
      sync();
    });

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(wrap);
    const onEnter = () => { hovered = true; sync(); };
    const onLeave = () => { hovered = false; sync(); };
    wrap.addEventListener('pointerenter', onEnter);
    wrap.addEventListener('pointerleave', onLeave);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      wrap.removeEventListener('pointerenter', onEnter);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, [reduceMotion, segment]);

  return (
    <div ref={wrapRef} className="text-loop" aria-hidden="true">
      <svg viewBox="0 0 1200 400" className="text-loop-svg">
        <defs>
          <linearGradient id={`${pathId}-ribbon`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" className="text-loop-stop-purple" />
            <stop offset="0.5" className="text-loop-stop-blue" />
            <stop offset="1" className="text-loop-stop-cyan" />
          </linearGradient>
        </defs>
        <path ref={pathRef} id={pathId} d={PATH} className="text-loop-ribbon" stroke={`url(#${pathId}-ribbon)`} />
        <text ref={measureRef} className="text-loop-text" visibility="hidden">
          {segment}
        </text>
        <text className="text-loop-text">
          <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0">
            {/* Half the cap height drops the uppercase text onto the band's center line. A fixed
                shift, because Safari ignores dominant-baseline on text along a path. */}
            <tspan dy="0.36em">{segment.repeat(copies)}</tspan>
          </textPath>
        </text>
      </svg>
    </div>
  );
}
