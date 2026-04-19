import { useEffect, useMemo, useState } from 'react';
import ascherwaldTitle from '../media/ascherwald_logo.png';
import catsAgainstDarknessTitle from '../media/cats_against_darkness_logo.png';

type CaseStudy = {
  title: string;
  context: string;
  role: string;
  challenge: string;
  outcome: string;
  stack: string[];
  mediaPlaceholder: string;
};

type GameProject = {
  title: string;
  arc: string;
  tools: string[];
  details: string;
  projectUrl?: string;
  imagePath?: string;
  imageCaption?: string;
  mediaPlaceholder: string;
};

const softwareCaseStudies: CaseStudy[] = [
  {
    title: 'Food rescue iOS app',
    context: 'University semester project, team of 4.',
    role: 'iOS app contributor across product and implementation.',
    challenge:
      'Create a trustworthy way for people to offer leftover food and connect quickly with people nearby who can use it.',
    outcome:
      'Delivered a native iOS app prototype that framed food sharing as a simple, community-first interaction.',
    stack: ['iOS native', 'Team collaboration', 'University project'],
    mediaPlaceholder: 'Add app screenshots, core flow GIF, and architecture sketch.',
  },
  {
    title: 'Confidential system integration at CGI Germany',
    context: 'Internship in an international team.',
    role: 'Owned test quality improvements for a Java Spring Boot application.',
    challenge:
      'Improve confidence in a system that connected two data ecosystems while preserving delivery speed.',
    outcome:
      'Expanded test coverage, introduced automation, and added coverage reporting insights to make quality visible.',
    stack: ['Java', 'Spring Boot', 'Testing', 'CI insight reporting'],
    mediaPlaceholder: 'Add sanitized pipeline screenshot and redacted test dashboard.',
  },
  {
    title: 'SPoHF insect detection LLM research',
    context: 'Research-focused project.',
    role: 'Built and iterated on an LLM-centered detection approach.',
    challenge: 'Design a practical workflow for insect detection using Python-heavy experimentation.',
    outcome: 'Produced a working research direction and repeatable experimentation pipeline.',
    stack: ['Python', 'ML research', 'Data processing'],
    mediaPlaceholder: 'Add model pipeline diagram and experiment result chart.',
  },
  {
    title: 'Fossil citizen-science photo improvement app',
    context: 'Masters semester 1 research project.',
    role: 'Built application logic to improve quality of submitted fossil photos.',
    challenge:
      'Help non-experts capture more useful, consistent field images that improve downstream scientific value.',
    outcome: 'Shipped an application concept focused on practical capture guidance and photo quality improvement.',
    stack: ['Research software', 'Python', 'User guidance design'],
    mediaPlaceholder: 'Add before/after sample images and short usage walkthrough GIF.',
  },
];

const gameJourney: GameProject[] = [
  {
    title: 'Client game for mental health habits',
    arc: 'Bachelor phase: first shipped game project.',
    tools: ['GDevelop', 'n8n', 'Baserow'],
    details:
      'Built a no-code game for a client who wanted players to learn about mental health and reinforce healthier routines.',
    mediaPlaceholder: 'Add gameplay loop GIF, mission screen, and client brief excerpt.',
  },
  {
    title: 'Ascherwald',
    arc: 'Rapid prototyping phase.',
    tools: ['Game jam workflow', 'Public release on itch.io'],
    details: 'Designed and shipped a playable jam project under tight constraints and published it publicly.',
    projectUrl: 'https://ghostpan.itch.io/ascherwald',
    imagePath: ascherwaldTitle,
    imageCaption: 'Atmospheric title art used for the game page card and external listing.',
    mediaPlaceholder: '',
  },
  {
    title: 'Cats Against Darkness',
    arc: 'Rapid prototyping phase.',
    tools: ['Game jam workflow', 'Public release on itch.io'],
    details: 'Built and published a second jam game with a different style and mechanics direction.',
    projectUrl: 'https://ghostpan.itch.io/cats-against-darkness',
    imagePath: catsAgainstDarknessTitle,
    imageCaption: 'Pixel-art title banner representing the jam tone and combat fantasy.',
    mediaPlaceholder: '',
  },
  {
    title: 'Masters final project: reptile caretaking game',
    arc: 'Current long-form game production.',
    tools: ['Godot', 'Game design systems', 'Web branding'],
    details:
      'Developing a learning-focused game that teaches proper reptile care, plus a dedicated studio website around the project.',
    mediaPlaceholder: 'Add world mockups, system diagrams, and studio website screenshots.',
  },
];

function randomPosition(size: number) {
  return {
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size),
  };
}

function GameLab() {
  const boardSize = 260;
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [target, setTarget] = useState(() => randomPosition(boardSize - 56));
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  const status = useMemo(() => {
    if (timeLeft === 0) {
      return 'Run complete. Reset and try to beat your score.';
    }

    if (running) {
      return 'Click the signal as quickly as you can.';
    }

    return 'Start a round to play.';
  }, [running, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(20);
    setTarget(randomPosition(boardSize - 56));
    setRunning(true);
  };

  const hitTarget = () => {
    if (!running) {
      return;
    }

    setScore((current) => current + 1);
    setTarget(randomPosition(boardSize - 56));
  };

  return (
    <section className="panel game-panel" aria-labelledby="game-lab-title">
      <div className="section-heading">
        <p className="eyebrow">Game dev</p>
        <h2 id="game-lab-title">Playable lab</h2>
      </div>

      <div className="game-shell">
        <div className="game-copy">
          <p>
            Use this area to show that you can build game systems, iterate on mechanics, and care about feel.
          </p>
          <div className="stats">
            <span>Score {score}</span>
            <span>Time {timeLeft}s</span>
          </div>
          <p className="game-status">{status}</p>
          <button className="button button-dark" type="button" onClick={startGame}>
            {running ? 'Restart round' : 'Start round'}
          </button>
        </div>

        <div className="playfield" role="application" aria-label="Simple clicking game">
          <div className="playfield-grid" />
          <button
            type="button"
            className={`target ${running ? 'target-active' : ''}`}
            style={{ left: target.x, top: target.y }}
            onClick={hitTarget}
            aria-label="Hit the signal"
            disabled={!running}
          />
        </div>
      </div>
    </section>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const syncPath = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', syncPath);

    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  const navigateTo = (path: string) => {
    if (path === currentPath) {
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onNavigateHome = () => navigateTo('/');
  const onNavigateGame = () => navigateTo('/game-journey');

  if (currentPath === '/game-journey') {
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
              <article className="journey-card" key={entry.title}>
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
            ))}
          </div>
        </section>

        <div id="playable-lab">
          <GameLab />
        </div>
      </main>
    );
  }

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
            <article className="project-card" key={project.title}>
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
              <div className="media-placeholder">
                <p>Media placeholder</p>
                <span>{project.mediaPlaceholder}</span>
              </div>
            </article>
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

export default App;