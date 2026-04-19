import { CaseStudy } from '../types';
import { MediaCarousel } from './MediaCarousel';

interface CaseStudyCardProps {
  project: CaseStudy;
}

export function CaseStudyCard({ project }: CaseStudyCardProps) {
  return (
    <article className="project-card">
      <p className="project-kicker">Case study</p>
      <h3>{project.title}</h3>
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
  );
}
