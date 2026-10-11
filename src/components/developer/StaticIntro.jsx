import { skills } from '../../data/skills';

// Reduced motion: the same title, summary and technologies as the tile reveal, without the scroll animation.
export default function StaticIntro({ eyebrow, title, summary, stackLabel }) {
  return (
    <div className="developer-static">
      <h2 id="developer-title" className="section-eyebrow">{eyebrow}</h2>
      <h3 className="developer-static-title">{title}</h3>
      <p className="developer-static-summary">{summary}</p>
      <ul className="developer-stack" aria-label={stackLabel}>
        {skills.map(({ name }) => (
          <li key={name} className="work-chip">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
