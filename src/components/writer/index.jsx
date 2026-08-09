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

  let charsUsed = 0;

  return (
    <span>
      {segments.map((segment, idx) => {
        const start = charsUsed;
        const end = charsUsed + segment.text.length;
        charsUsed = end;

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
  );
}
