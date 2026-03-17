import { Link, useLocation } from "react-router-dom";
import InstallButton from "./InstallButton.jsx";

export default function Header({ theme, onToggleTheme }) {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="header">
      <Link to="/" className="brand">
        <strong>FileShare</strong>
      </Link>

      <div className="nav">
        {isLanding ? (
          <>
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </>
        )}

        <button className="button secondary" onClick={onToggleTheme}>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <InstallButton />
      </div>
    </div>
  );
}
