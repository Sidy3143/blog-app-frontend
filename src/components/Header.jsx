import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, isAdmin } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const admin = isAdmin();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  }

  const getInitial = () => {
    if (admin) return "A";
    return "U";
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="logo">
          My Blog
        </Link>

        <div className="header-right">
          {loggedIn ? (
            <div className="admin-section">
              {admin && <span className="admin-badge">Admin</span>}
              <div className="avatar" title={admin ? "Admin user" : "Logged in"}>
                {getInitial()}
              </div>
              <button className="btn danger small" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <nav className="header-auth-links">
              <Link className="btn secondary" to="/login">
                Login
              </Link>
              <Link className="btn" to="/signup">
                Sign up
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
