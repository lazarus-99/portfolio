import { useTypewriter } from '../../hooks/useTyperWriter';

export default function TypewriterText({
  segments,
  speed = 60,
  showCursor = true,
  loop = false,
  restartDelay = 3000,
}) {
  const fullText = segments.map((s) => s.text).join('');
  const count = useTypewriter(fullText, { speed, loop, restartDelay });

  return (
    <span>
      {/* Screen readers get the full text once instead of every partially typed frame. */}
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true">
        {segments.map((segment, idx) => {
          const start = segments.slice(0, idx).reduce((total, s) => total + s.text.length, 0);
          const visibleChars = Math.max(0, Math.min(segment.text.length, count - start));
          const visibleText = segment.text.slice(0, visibleChars);

          if (!visibleText) return null;

          return (
            <span key={idx} className={segment.className}>
              {visibleText}
            </span>
          );
        })}
        {showCursor && count < fullText.length && <span className="typewriter-cursor">|</span>}
      </span>
    </span>
  );
}
