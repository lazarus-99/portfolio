import { useLanguage } from '../../context/languageContext';

export default function EducationEntry({ title, school, subjects, dateStart, dateEnd, content, logo }) {
  const { t } = useLanguage();

  return (
    <div className="education-entry">
      <div className="teaching-header">
        {logo && <img src={logo} alt="" className="teaching-logo" />}
        <div className="teaching-header-text">
          <h3 className="teaching-role">{title}</h3>
          <h2 className="teaching-institution">{school}</h2>
          {subjects?.length > 0 && (
            <p className="teaching-courses-line">{subjects.join(' • ')}</p>
          )}
        </div>
      </div>

      <div className="teaching-timeline">
        <div className="teaching-dates">
          <span>{dateStart}</span>
          <span className="teaching-timeline-line" />
          <span>{dateEnd || t('teaching.present')}</span>
        </div>
        <p className="teaching-description">{content}</p>
      </div>
    </div>
  );
}
