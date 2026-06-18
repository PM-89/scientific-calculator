import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h2>Scientific Calculator</h2>

      {location.pathname === "/" ? (
        <Link to="/history" className="nav-btn">
          History
        </Link>
      ) : (
        <Link to="/" className="nav-btn">
          Calculator
        </Link>
      )}
    </nav>
  );
}

export default Navbar;