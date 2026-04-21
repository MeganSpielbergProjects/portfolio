import { GameCard } from '../components/GameCard';
import { GameLab } from '../components/GameLab';
import { NavBar } from '../components/NavBar';
import { gameJourney } from '../data';

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
            <p className="eyebrow">Game journey</p>
            <h1>Hello, I'm Megan and I make games.</h1>

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
          <h2>Game development projects</h2>
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

      <div id="playable-lab">
        <GameLab />
      </div>

      <section className="panel contact-panel" id="contact-game">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s collaborate on game projects</h2>
        </div>
        <p>
          Add your preferred contact channels here for studios, collaborators, and jam teams. You can include links to
          itch.io, GitHub, LinkedIn, and your email, plus a short note on availability for freelance or junior roles.
        </p>
      </section>
    </main>
  );
}
