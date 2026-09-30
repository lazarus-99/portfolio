import './index.css';

const STRIPS = 30;
const WIDTH = 30;
const STRIP_WIDTH = WIDTH / STRIPS;
const BAND = 20 / 3;

export default function BoliviaFlag({ className = '' }) {
  return (
    <svg className={`bolivia-flag ${className}`} viewBox="0 0 30 22" aria-hidden="true">
      {Array.from({ length: STRIPS }, (_, i) => (
        <g
          key={i}
          className="bolivia-flag-strip"
          style={{
            '--amp': `${0.25 + i * 0.05}px`,
            animationDelay: `${-i * 0.04}s`,
          }}
        >
          {/* Slight overlap hides hairline gaps between strips. */}
          <rect x={i * STRIP_WIDTH} y={1} width={STRIP_WIDTH + 0.05} height={BAND} fill="#D52B1E" />
          <rect x={i * STRIP_WIDTH} y={1 + BAND} width={STRIP_WIDTH + 0.05} height={BAND} fill="#F9E300" />
          <rect x={i * STRIP_WIDTH} y={1 + BAND * 2} width={STRIP_WIDTH + 0.05} height={BAND} fill="#007934" />
          <rect
            className="bolivia-flag-shade"
            x={i * STRIP_WIDTH}
            y={1}
            width={STRIP_WIDTH + 0.05}
            height={20}
            style={{ animationDelay: `${-i * 0.04}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
