interface NavBarLink {
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface NavBarProps {
  links: NavBarLink[];
  switchChecked: boolean;
  onSwitch: () => void;
}

export function NavBar({ links, switchChecked, onSwitch }: NavBarProps) {
  return (
    <header className="nav" aria-label="Primary navigation">
      <div className="nav-brand">
        <span className="nav-title">Megan Spielberg</span>
      </div>

      <nav className="nav-links" aria-label="Main menu">
        {links.map((link) => {
          const className = link.isActive ? 'nav-link nav-link-active' : 'nav-link';

          if (link.href) {
            return (
              <a key={link.label} className={className} href={link.href}>
                {link.label}
              </a>
            );
          }

          return (
            <button key={link.label} className={className} type="button" onClick={link.onClick}>
              {link.label}
            </button>
          );
        })}
      </nav>

      <button
        className="nav-switch"
        type="button"
        role="switch"
        aria-checked={switchChecked}
        aria-label="Switch between software and game pages"
        onClick={onSwitch}
      >
        <span className="nav-switch-text">Software</span>
        <span className="nav-switch-track" aria-hidden="true">
          <span className="nav-switch-thumb" />
        </span>
        <span className="nav-switch-text">Game</span>
      </button>
    </header>
  );
}