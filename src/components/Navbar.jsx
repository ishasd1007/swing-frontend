import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ onLoginClick }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">
      <h2 className="logo">SwingForGood</h2>

      <div className="nav-right">
        {user ? (
          <div
            className="profile-circle"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        ) : (
          <button
            className="nav-btn"
            onClick={() =>
              onLoginClick ? onLoginClick() : navigate("/login")
            }
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;