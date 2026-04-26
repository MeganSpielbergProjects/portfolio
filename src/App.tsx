import { useEffect, useRef, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';

const GLITCH_OUT_MS = 190;
const GLITCH_IN_MS = 240;

function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [displayPath, setDisplayPath] = useState(() => window.location.pathname);
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const outTimerRef = useRef<number | null>(null);
  const inTimerRef = useRef<number | null>(null);

  const clearTransitionTimers = () => {
    if (outTimerRef.current !== null) {
      window.clearTimeout(outTimerRef.current);
      outTimerRef.current = null;
    }

    if (inTimerRef.current !== null) {
      window.clearTimeout(inTimerRef.current);
      inTimerRef.current = null;
    }
  };

  useEffect(() => {
    const syncPath = () => {
      clearTransitionTimers();

      const nextPath = window.location.pathname;
      setCurrentPath(nextPath);
      setDisplayPath(nextPath);
      setTransitionPhase('idle');
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', syncPath);

    return () => {
      window.removeEventListener('popstate', syncPath);
      clearTransitionTimers();
    };
  }, []);

  useEffect(() => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>('.page section.panel'));

    if (!panels.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      panels.forEach((panel) => {
        panel.classList.remove('panel-reveal');
        panel.classList.add('is-visible');
        panel.style.removeProperty('--reveal-delay');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    panels.forEach((panel, index) => {
      panel.classList.add('panel-reveal');
      panel.classList.remove('is-visible');
      panel.style.setProperty('--reveal-delay', `${Math.min(index * 70, 280)}ms`);
      observer.observe(panel);
    });

    return () => observer.disconnect();
  }, [displayPath]);

  const navigateTo = (path: string) => {
    if (path === currentPath || transitionPhase !== 'idle') {
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayPath(path);
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    clearTransitionTimers();
    setTransitionPhase('out');

    outTimerRef.current = window.setTimeout(() => {
      setDisplayPath(path);
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTransitionPhase('in');

      inTimerRef.current = window.setTimeout(() => {
        setTransitionPhase('idle');
        inTimerRef.current = null;
      }, GLITCH_IN_MS);

      outTimerRef.current = null;
    }, GLITCH_OUT_MS);
  };

  const onNavigateHome = () => navigateTo('/');
  const onNavigateGame = () => navigateTo('/game-journey');

  const shellClassName = transitionPhase === 'idle' ? 'app-shell' : `app-shell app-transition-${transitionPhase}`;

  return (
    <div className={shellClassName}>
      {displayPath === '/game-journey' ? (
        <GamePage onNavigateHome={onNavigateHome} />
      ) : (
        <HomePage onNavigateGame={onNavigateGame} />
      )}
    </div>
  );
}

export default App;
