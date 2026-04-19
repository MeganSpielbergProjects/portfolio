import { useEffect, useMemo, useState } from 'react';
import { randomPosition } from '../utils';

export function GameLab() {
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
