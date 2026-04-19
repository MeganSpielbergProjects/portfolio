import { CaseStudyCard } from '../components/CaseStudyCard';
import { softwareCaseStudies } from '../data';

interface HomePageProps {
  onNavigateGame: () => void;
}

export function HomePage({ onNavigateGame }: HomePageProps) {
  return (
    <main className="page">
      <div className="backdrop backdrop-one" />
      <div className="backdrop backdrop-two" />

      <section className="hero panel">
        <p className="eyebrow">Software engineer and game dev</p>
        <h1>Building useful software and playful systems, from research tools to educational games.</h1>
        <p className="hero-text">
          This portfolio is structured as case studies so confidential and university work still shows clear technical
          ownership, decisions, and impact.
        </p>

        <div className="hero-actions">
          <a className="button button-dark" href="#projects">
            Explore case studies
          </a>
          <button className="button button-light" type="button" onClick={onNavigateGame}>
            Enter game journey page
          </button>
        </div>

        <div className="hero-metrics">
          <article>
            <strong>4</strong>
            <span>software case studies</span>
          </article>
          <article>
            <strong>3</strong>
            <span>game-dev milestones</span>
          </article>
          <article>
            <strong>1</strong>
            <span>dedicated game page</span>
          </article>
        </div>
      </section>

      <section className="panel about-panel">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>How this portfolio is organized</h2>
        </div>
        <div className="about-grid">
          <p>
            The main flow focuses on software engineering case studies. Game development is intentionally nested behind a
            click so it feels like a discovery path instead of a competing homepage narrative.
          </p>
          <ul>
            <li>Public and confidential work framed with safe detail levels</li>
            <li>Clear role, challenge, and outcome for each project</li>
            <li>Media placeholders ready for your screenshots and GIFs</li>
          </ul>
        </div>
      </section>

      <section className="panel" id="projects">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Software engineering case studies</h2>
        </div>

        <div className="projects-grid">
          {softwareCaseStudies.map((project) => (
            <CaseStudyCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="panel game-gate">
        <div className="section-heading">
          <p className="eyebrow">Game dev</p>
          <h2>Separate game page</h2>
        </div>
        <p className="gate-text">
          Your game development work now lives on its own page so you can style it with a different visual identity.
        </p>
        <button className="button button-light" type="button" onClick={onNavigateGame}>
          Open game journey page
        </button>
      </section>

      <section className="panel contact-panel">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Next step</h2>
        </div>
        <p>
          Add your GitHub, LinkedIn, and email here. You can also place a button to your CV and a short availability
          note for internships or junior roles.
        </p>
      </section>
    </main>
  );
}
