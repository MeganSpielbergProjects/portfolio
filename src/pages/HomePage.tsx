import { CaseStudyCard } from '../components/CaseStudyCard';
import { NavBar } from '../components/NavBar';
import { softwareCaseStudies } from '../data';
import '../styles/software.css';

interface HomePageProps {
  onNavigateGame: () => void;
}

export function HomePage({ onNavigateGame }: HomePageProps) {
  return (
    <main className="page software-page">
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
            <p className="eyebrow">Software engineering portfolio</p>
            <h1>The Digital Architect</h1>
            <p className="hero-text">
              Structure, performance, and clean data visualization shaped like a blueprint editor and tuned for technical depth.
            </p>

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
                <strong>4</strong>
                <span>game-dev milestones</span>
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
          <h2>How the architecture is organized</h2>
        </div>
        <div className="about-grid">
          <p>
            The main flow focuses on software engineering case studies. The layout stays modular and precise so projects read
            like structural systems rather than decorative cards.
          </p>
          <ul>
            <li>Blue-toned surfaces with subtle glow and strong legibility</li>
            <li>Case studies framed as reusable structural modules</li>
            <li>Reserved space for metrics, screenshots, and technical context</li>
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
          <h2>Let's work together</h2>
        </div>
        <div className="contact-stack">
          <div className="contact-item">
            <span className="contact-label">Email</span>
            <a className="contact-value" href="mailto:megan160202@gmail.com">
              megan160202@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <span className="contact-label">Location</span>
            <span className="contact-value">Mönchengladbach, NRW, Germany</span>
          </div>

          <div className="contact-item">
            <span className="contact-label">LinkedIn</span>
            <a
              className="contact-linkedin"
              href="https://www.linkedin.com/in/megan-spielberg-b42475239"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Megan Spielberg LinkedIn profile"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.1 1 2.48 1h.02C3.87 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zm7.5 0h3.83v2.05h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.66 4.8 6.11V23h-4v-7.88c0-1.88-.03-4.29-2.61-4.29-2.62 0-3.02 2.05-3.02 4.16V23h-4V8z" />
              </svg>
              <span>linkedin.com/in/megan-spielberg-b42475239</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
