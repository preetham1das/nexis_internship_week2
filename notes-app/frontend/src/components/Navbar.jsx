import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="logo">Notes App</Link>
      <div className="nav-links">
        <Link to="/dashboard">My Notes</Link>
        <Link to="/add-note">Add Note</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;