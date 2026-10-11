import { useTypewriterCycle } from '../../hooks/useTypewriterCycle';
import './index.css';

// Visual only: the caller provides the accessible text, since the typed letters change constantly.
// Every full variant is laid out invisibly in the same grid cell, so the box keeps the size (and line
// wrapping) of the longest one and the content below doesn't jump as words change.
export default function TypewriterText({ words, prefix = '', suffix = '', typeSpeed, deleteSpeed, hold }) {
  const text = useTypewriterCycle(words, { typeSpeed, deleteSpeed, hold });

  return (
    <span className="typewriter" aria-hidden="true">
      {words.map((word) => (
        <span key={word} className="typewriter-sizer">
          {prefix}
          <span className="typewriter-word">{word}</span>
          {suffix}
        </span>
      ))}
      <span className="typewriter-live">
        {prefix}
        <span className="typewriter-word">{text}</span>
        <span className="typewriter-cursor">|</span>
        {suffix}
      </span>
    </span>
  );
}
