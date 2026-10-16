import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import portrait from '../../assets/portrait.webp';

const MAX_TILT = 14; // degrees at the card's edges

export default function ProfileCard({ alt, handle, status, contactLabel, contactHref }) {
  const cardRef = useRef(null);
  const frame = useRef(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // Pointer position goes straight into CSS variables, so moving the mouse never re-renders React.
  const handleMove = (event) => {
    // Touch and pen keep the card still; tilting under a finger would fight scrolling.
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      card.classList.add('is-active');
      card.style.setProperty('--px', `${x * 100}%`);
      card.style.setProperty('--py', `${y * 100}%`);
      card.style.setProperty('--rx', `${(x - 0.5) * MAX_TILT}deg`);
      card.style.setProperty('--ry', `${(0.5 - y) * MAX_TILT}deg`);
    });
  };

  const handleLeave = () => {
    const card = cardRef.current;
    cancelAnimationFrame(frame.current);
    card.classList.remove('is-active');
    ['--px', '--py', '--rx', '--ry'].forEach((name) => card.style.removeProperty(name));
  };

  return (
    <div className="profile-card-wrap" data-reveal style={{ '--i': 2 }}>
      <div ref={cardRef} className="profile-card" onPointerMove={handleMove} onPointerLeave={handleLeave}>
        <img className="profile-card-photo" src={portrait} alt={alt} width="720" height="1003" loading="lazy" decoding="async" />
        <div className="profile-card-shine" aria-hidden="true" />
        <div className="profile-card-glare" aria-hidden="true" />
        <div className="profile-card-bar">
          <div className="profile-card-bar-text">
            <span className="profile-card-handle">{handle}</span>
            <span className="profile-card-status">
              <span className="profile-card-dot" aria-hidden="true" />
              {status}
            </span>
          </div>
          <a className="profile-card-button" href={contactHref}>
            {contactLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
