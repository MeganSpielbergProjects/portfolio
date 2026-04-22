import type { MouseEvent } from 'react';
import { GameCard } from '../components/GameCard';
import { MotorcycleJourneyLab } from '../components/MotorcycleJourneyLab';
import { gameJourney } from '../data';
import '../styles/game.css';

interface GamePageProps {
  onNavigateHome: () => void;
}

export function GamePage({ onNavigateHome }: GamePageProps) {
  const handleScrollTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { label: 'Games', href: 'timeline' },
    { label: 'Approach', href: 'about-game' },
    { label: 'Play', href: 'playable-lab' },
    { label: 'Contact', href: 'contact-game' },
  ];

  return (
    <main className="page game-page" data-testid="game-page">
      <div className="backdrop backdrop-one" />
      <div className="backdrop backdrop-two" />

      {/* ─── NAV ────────────────────────────────────────────── */}
      <nav className="nav panel game-nav" data-testid="game-nav">
        <span className="nav-brand" data-testid="nav-brand">Megan Spielberg</span>

        <div className="nav-links" data-testid="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="nav-link"
              href={`#${link.href}`}
              onClick={handleScrollTo(link.href)}
              data-testid={`nav-link-${link.href}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="nav-switch"
          type="button"
          aria-checked="true"
          aria-label="Switch back to software portfolio"
          onClick={onNavigateHome}
          data-testid="nav-switch-btn"
        >
          <span className="nav-switch-text nav-switch-text-left">SW</span>
          <span className="switch-track" aria-hidden="true">
            <span className="switch-thumb" />
          </span>
          <span className="nav-switch-text nav-switch-text-right">GD</span>
        </button>
      </nav>

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section className="hero panel game-hero" data-testid="game-hero">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Game development portfolio</p>
            <h1 className="hero-title">
              The <span className="hero-highlight">Pixel</span> Journey
            </h1>
            <p className="hero-text">
              From no-code prototypes to Godot — a timeline of game projects
              built during my Bachelor and Master&apos;s, each one a level-up
              in craft, systems thinking, and player-centred design.
            </p>

            <div className="hero-actions">
              <button
                className="button button-dark"
                type="button"
                onClick={onNavigateHome}
                data-testid="back-to-software-btn"
              >
                ← Back to software
              </button>
              <a
                className="button button-light"
                href="#playable-lab"
                onClick={handleScrollTo('playable-lab')}
                data-testid="play-lab-demo-btn"
              >
                Play the lab demo
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <img className="hero-character" src="/media/megan_character.png" alt="" />
          </div>
        </div>
      </section>

      {/* ─── TIMELINE / PROJECTS ────────────────────────────── */}
      <section className="panel game-gate" id="timeline" data-testid="timeline-section">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h2>The journey map</h2>
          <p className="section-desc">
            Each project marks a milestone — a new tool mastered, a design
            challenge tackled, or a mechanic shipped. Explore them in order
            and watch the craft evolve.
          </p>
        </div>

        <div className="journey-grid" data-testid="journey-grid">
          {gameJourney.map((entry) => (
            <GameCard key={entry.title} entry={entry} />
          ))}
        </div>
      </section>

      {/* ─── ABOUT / APPROACH ───────────────────────────────── */}
      <section className="panel about-panel" id="about-game" data-testid="about-section">
        <div className="section-heading">
          <p className="eyebrow">Approach</p>
          <h2>How I approach game design and development</h2>
        </div>

        <div className="about-grid">
          <p>
            Good games are built around{' '}
            <strong className="about-emph">clear learning loops</strong>.
            I start by defining the core player skill — what should someone
            feel capable of after ten minutes? — then prototype fast and
            tune the feedback until every interaction is legible and
            satisfying. My software engineering background keeps the
            systems clean and maintainable; my design instincts keep the
            player experience front and centre.
            <br />
            <br />
            I&apos;ve worked across both no-code tools (GDevelop) and full
            scripting environments (Godot / GDScript), which gives me a
            practical sense of when to reach for each. I&apos;m equally
            comfortable whiteboarding a mechanic on paper and committing
            it to code.
          </p>

          <div className="about-pillars" data-testid="about-pillars">
            <div className="pillar">
              <span className="pillar-label">Rapid prototypes first</span>
              <p className="pillar-text">
                Start with quick playable versions, then run targeted polish passes.
              </p>
            </div>
            <div className="pillar">
              <span className="pillar-label">Feedback-driven design</span>
              <p className="pillar-text">
                Design decisions are grounded in player feedback and testing.
              </p>
            </div>
            <div className="pillar">
              <span className="pillar-label">Maintainable systems</span>
              <p className="pillar-text">
                Technical focus on reusable components and scalable game systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLAYABLE LAB ───────────────────────────────────── */}
      <section className="panel playable-lab-teaser" id="playable-lab" data-testid="playable-lab-section">
        <div className="section-heading">
          <p className="eyebrow">Playable lab</p>
          <h2>Motorcycle journey minigame</h2>
          <p className="section-desc">
            A small interactive demo built directly into this portfolio —
            try the controls and get a feel for the game mechanics
            I&apos;m currently experimenting with.
          </p>
        </div>
        <MotorcycleJourneyLab />
      </section>

      {/* ─── CONTACT ────────────────────────────────────────── */}
      <section className="panel contact-panel" id="contact-game" data-testid="contact-section">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s collaborate on game projects</h2>
        </div>

        <div className="contact-stack">
          <div className="contact-item">
            <span className="contact-label">Email</span>
            <a
              className="contact-value"
              href="mailto:megan160202@gmail.com"
              data-testid="contact-email-link"
            >
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
              data-testid="contact-linkedin-link"
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