import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo} onClick={() => navigate("/")}>
        🧠 SaaS Notes
      </h2>

      <div style={styles.right}>
        {loggedIn ? (
          <button style={styles.btn} onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <button style={styles.btn} onClick={() => navigate("/login")}>
              Login
            </button>

            <button
              style={styles.btnPrimary}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "rgba(0,0,0,0.25)",
    backdropFilter: "blur(10px)",
    color: "white",
  },

  logo: {
    cursor: "pointer",
  },

  right: {
    display: "flex",
    gap: "10px",
  },

  btn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "rgba(255,255,255,0.2)",
    color: "white",
  },

  btnPrimary: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#4f46e5",
    color: "white",
  },
};
