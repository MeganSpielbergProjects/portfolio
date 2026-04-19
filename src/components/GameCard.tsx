import { GameProject } from '../types';
import { MediaCarousel } from './MediaCarousel';

interface GameCardProps {
  entry: GameProject;
}

export function GameCard({ entry }: GameCardProps) {
  return (
    <article className="journey-card">
      <p className="project-kicker">Journey milestone</p>
      <h3>{entry.title}</h3>
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
        <a
          className="media-card-link"
          href={entry.projectUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${entry.title} on itch.io`}
        >
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
        </a>
      ) : entry.mediaItems && entry.mediaItems.length > 0 ? (
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
  );
}
