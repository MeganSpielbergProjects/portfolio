import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { CaseStudy } from '../types';
import { MediaCarousel } from './MediaCarousel';

interface CaseStudyCardProps {
  project: CaseStudy;
}

export function CaseStudyCard({ project }: CaseStudyCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const overlay = isOpen ? (
    <div
      className="card-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <article className="card-overlay-panel" onClick={(event) => event.stopPropagation()}>
        <header className="card-overlay-header">
          <div>
            <p className="project-kicker">Case study</p>
            <h3 id={titleId}>{project.title}</h3>
          </div>
          <button className="button button-light button-small" type="button" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </header>

        <p className="detail-row">
          <strong>Context:</strong> {project.context}
        </p>
        <p className="detail-row">
          <strong>Role:</strong> {project.role}
        </p>
        <p className="detail-row">
          <strong>Challenge:</strong> {project.challenge}
        </p>
        <p className="detail-row">
          <strong>Outcome:</strong> {project.outcome}
        </p>

        <div className="tags">
          {project.stack.map((item: string) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        {(project.projectUrl || project.githubUrl) && (
          <div className="project-links">
            {project.projectUrl && (
              <a href={project.projectUrl} target="_blank" rel="noreferrer" className="button button-small">
                View project
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="button button-small">
                GitHub
              </a>
            )}
          </div>
        )}

        {project.mediaItems && project.mediaItems.length > 0 ? (
          <MediaCarousel items={project.mediaItems} projectTitle={project.title} />
        ) : (
          <div className="media-placeholder">
            <p>Media placeholder</p>
            <span>{project.mediaPlaceholder}</span>
          </div>
        )}
      </article>
    </div>
  ) : null;

  return (
    <article className="project-card">
      <button className="preview-card" type="button" onClick={() => setIsOpen(true)} aria-haspopup="dialog">
        {project.imagePath ? (
          <div className="thumbnail-placeholder preview-thumbnail-with-image">
            <img className="preview-thumbnail-image" src={project.imagePath} alt={`${project.title} logo`} loading="lazy" />
          </div>
        ) : (
          <div className="thumbnail-placeholder" aria-hidden="true">
            <span>Thumbnail</span>
          </div>
        )}
        <div className="preview-copy">
          <p className="project-kicker">Case study</p>
          <h3>{project.title}</h3>
          <p className="preview-description">{project.outcome}</p>
        </div>
      </button>
      {overlay ? createPortal(overlay, document.body) : null}
    </article>
  );
}
