import { useLanguage } from '../../context/language';

function WorkCard({ index, project, labels }) {
  const { label, title, description, role, stack, outcome, link } = project;
  const number = String(index + 1).padStart(2, '0');

  return (
    <article className="work-card">
      <span className="work-meta">
        {number} · {label}
      </span>
      <h4 className="work-title">{title}</h4>
      <p className="work-description">{description}</p>
      <dl className="work-facts">
        {role && (
          <>
            <dt>{labels.role}</dt>
            <dd>{role}</dd>
          </>
        )}
        <dt>{labels.stack}</dt>
        <dd className="work-stack">
          {stack.map((tech) => (
            <span key={tech} className="work-chip">
              {tech}
            </span>
          ))}
        </dd>
        {outcome && (
          <>
            <dt>{labels.outcome}</dt>
            <dd>{outcome}</dd>
          </>
        )}
      </dl>
      {link && (
        <a className="work-link" href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label} <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  );
}

export default function SelectedWork() {
  const { t } = useLanguage();
  const projects = t('developer.work.projects');
  const labels = {
    role: t('developer.work.role'),
    stack: t('developer.work.stack'),
    outcome: t('developer.work.outcome'),
  };

  return (
    <div className="selected-work">
      <div className="selected-work-header">
        <h3 className="selected-work-title">{t('developer.work.title')}</h3>
        <p className="selected-work-intro">{t('developer.work.intro')}</p>
      </div>
      <div className="work-grid">
        {Array.isArray(projects) &&
          projects.map((project, index) => (
            <WorkCard key={project.id} index={index} project={project} labels={labels} />
          ))}
      </div>
    </div>
  );
}
