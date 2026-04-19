import { GameCard } from '../components/GameCard';
import { GameLab } from '../components/GameLab';
import { gameJourney } from '../data';

interface GamePageProps {
  onNavigateHome: () => void;
}

export function GamePage({ onNavigateHome }: GamePageProps) {
  return (
    <main className="page game-page">
      <div className="backdrop backdrop-one" />
      <div className="backdrop backdrop-two" />

      <section className="hero panel game-hero">
        <p className="eyebrow">Game journey</p>
        <h1>From no-code client work to educational game systems in Godot.</h1>
        <p className="hero-text">
          This page is intentionally separate from the software case studies. It focuses on design decisions, player
          learning goals, and how prototypes evolved into shipped playable experiences.
        </p>

        <div className="hero-actions">
          <button className="button button-dark" type="button" onClick={onNavigateHome}>
            Back to software portfolio
          </button>
          <a className="button button-light" href="#playable-lab">
            Jump to playable lab
          </a>
        </div>
      </section>

      <section className="panel game-gate">
        <div className="section-heading">
          <p className="eyebrow">Timeline</p>
          <h2>Game development milestones</h2>
        </div>

        <div className="journey-grid">
          {gameJourney.map((entry) => (
            <GameCard key={entry.title} entry={entry} />
          ))}
        </div>
      </section>

      <div id="playable-lab">
        <GameLab />
      </div>
    </main>
  );
}
