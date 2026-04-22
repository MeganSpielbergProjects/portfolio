import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { GameProject } from '../types';
import { MediaCarousel } from './MediaCarousel';

interface GameCardProps {
  entry: GameProject;
}

export function GameCard({ entry }: GameCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const yearMatch = entry.arc.match(/\b(?:19|20)\d{2}\b/g);
  const timelineYear = yearMatch?.[yearMatch.length - 1] ?? '----';

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
            <p className="project-kicker">Journey milestone</p>
            <h3 id={titleId}>{entry.title}</h3>
          </div>
          <button className="button button-light button-small card-overlay-close" type="button" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </header>

        <p className="detail-row">
          <strong>Phase:</strong> {entry.arc}
        </p>
        <p className="detail-row">
          <strong>Details:</strong> {entry.details}
        </p>

        <div className="tags">
          {entry.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>

        {entry.projectUrl ? (
          <div className="project-links">
            <a
              href={entry.projectUrl}
              target="_blank"
              rel="noreferrer"
              className="button button-small"
              aria-label={`Open ${entry.title} project`}
            >
              View project
            </a>
          </div>
        ) : null}

        {entry.mediaItems && entry.mediaItems.length > 0 ? (
          <MediaCarousel items={entry.mediaItems} projectTitle={entry.title} />
        ) : (
          <div className="media-placeholder">
            {entry.imagePath ? (
              <img
                className="jam-title-image"
                src={entry.imagePath}
                alt={`${entry.title} title art`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            ) : null}
            {entry.imageCaption ? <span className="image-caption">{entry.imageCaption}</span> : null}
            {!entry.imagePath ? (
              <>
                <p>Media placeholder</p>
                <span>{entry.mediaPlaceholder}</span>
              </>
            ) : null}
          </div>
        )}
      </article>
    </div>
  ) : null;

  return (
    <article className="journey-card">
      <span className="timeline-year" aria-hidden="true">
        {timelineYear}
      </span>
      <button className="preview-card" type="button" onClick={() => setIsOpen(true)} aria-haspopup="dialog">
        {entry.imagePath ? (
          <div className="thumbnail-placeholder preview-thumbnail-with-image">
            <img className="preview-thumbnail-image" src={entry.imagePath} alt={`${entry.title} logo`} loading="lazy" />
          </div>
        ) : (
          <div className="thumbnail-placeholder" aria-hidden="true">
            <span>Thumbnail</span>
          </div>
        )}
        <div className="preview-copy">
          <p className="project-kicker">Journey milestone</p>
          <h3>{entry.title}</h3>
          <p className="preview-description">{entry.details}</p>
        </div>
      </button>
      {overlay ? createPortal(overlay, document.body) : null}
    </article>
  );
}
