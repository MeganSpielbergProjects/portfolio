import { GameCard } from '../components/GameCard';
import { MotorcycleJourneyLab } from '../components/MotorcycleJourneyLab';
import { NavBar } from '../components/NavBar';
import { gameJourney } from '../data';
import '../styles/game.css';

interface GamePageProps {
  onNavigateHome: () => void;
}

export function GamePage({ onNavigateHome }: GamePageProps) {
  return (
    <main className="page game-page">
      <div className="backdrop backdrop-one" />
      <div className="backdrop backdrop-two" />

      <NavBar
        links={[
          { label: 'About', href: '#about-game' },
          { label: 'Games', href: '#timeline' },
          { label: 'Playable Lab', href: '#playable-lab' },
          { label: 'Contact', href: '#contact-game' },
        ]}
        switchChecked
        onSwitch={onNavigateHome}
      />

      <section className="hero panel game-hero">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Game development portfolio</p>
            <h1>The Pixel Journey</h1>
            <p className="hero-text">
              A playful overworld map where projects are explored as milestones, with retro color and modern readability.
            </p>

            <div className="hero-actions">
              <button className="button button-dark" type="button" onClick={onNavigateHome}>
                Back to software portfolio
              </button>
              <a className="button button-light" href="#playable-lab">
                Jump to playable lab
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <img className="hero-character" src="/media/megan_character.png" alt="" />
          </div>
        </div>
      </section>

      <section className="panel game-gate" id="timeline">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h2>Explore the journey map</h2>
        </div>

        <div className="journey-grid">
          {gameJourney.map((entry) => (
            <GameCard key={entry.title} entry={entry} />
          ))}
        </div>
      </section>

      <section className="panel about-panel" id="about-game">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>How I approach game design and development</h2>
        </div>
        <div className="about-grid">
          <p>
            I build games around clear learning loops: define the player skill goal, prototype rapidly, and tune feedback
            so each interaction teaches something useful. My process combines systems thinking from software engineering
            with player-focused iteration from game jams and educational projects.
          </p>
          <ul>
            <li>Rapid prototypes first, then targeted polish passes</li>
            <li>Design decisions grounded in player feedback and testing</li>
            <li>Technical focus on maintainable systems and reusable components</li>
          </ul>
        </div>
      </section>

      <section className="panel playable-lab-teaser" id="playable-lab">
        <div className="section-heading">
          <p className="eyebrow">Playable lab</p>
          <h2>Motorcycle journey minigame</h2>
        </div>
        <MotorcycleJourneyLab />
      </section>

      <section className="panel contact-panel" id="contact-game">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s collaborate on game projects</h2>
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
