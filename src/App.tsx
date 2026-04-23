import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';

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
      <>
        <GamePage onNavigateHome={onNavigateHome} />
        <Analytics />
      </>
    );
  }

  return (
    <>
      <HomePage onNavigateGame={onNavigateGame} />
      <Analytics />
    </>
  );
}

export default App;
