import { CaseStudyCard } from '../components/CaseStudyCard';
import { NavBar } from '../components/NavBar';
import { softwareCaseStudies } from '../data';

interface HomePageProps {
  onNavigateGame: () => void;
}

export function HomePage({ onNavigateGame }: HomePageProps) {
  return (
    <main className="page">
      <div className="backdrop backdrop-one" />
      <div className="backdrop backdrop-two" />

      <NavBar
        links={[
          { label: 'About', href: '#about' },
          { label: 'Projects', href: '#projects' },
          { label: 'Contact', href: '#contact' },
        ]}
        switchChecked={false}
        onSwitch={onNavigateGame}
      />

      <section className="hero panel">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Software engineer and game dev</p>
            <h1>Hello, I'm Megan and I build software tools.</h1>

            <div className="hero-actions">
              <a className="button button-dark" href="#projects">
                Explore projects
              </a>
              <button className="button button-light" type="button" onClick={onNavigateGame}>
                Enter game journey page
              </button>
            </div>

            <div className="hero-metrics">
              <article>
                <strong>4</strong>
                <span>software projects</span>
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
          </div>

          <div className="hero-visual" aria-hidden="true">
            <img className="hero-character" src="/media/megan_character.png" alt="" />
          </div>
        </div>
      </section>

      <section className="panel about-panel" id="about">
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
          <p className="eyebrow">Selected projects</p>
          <h2>Software engineering projects</h2>
        </div>

        <div className="projects-grid">
          {softwareCaseStudies.map((project) => (
            <CaseStudyCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="panel contact-panel" id="contact">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Next step</h2>
        </div>
        <p>
          Add GitHub, LinkedIn, and email here. also place a button to CV and a short availability
          note for internships or junior roles.
        </p>
      </section>
    </main>
  );
}
