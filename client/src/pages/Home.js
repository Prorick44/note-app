import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

export default function Home() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const logged = isLoggedIn();

    if (!logged) {
      navigate("/auth");
    } else {
      setAuth(true);
    }
  }, [navigate]);

  if (!auth) return null;

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>📝 Notes App</h2>

        <button style={styles.logoutBtn} onClick={() => logout()}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.hero}>
        <h1>Welcome Back 👋</h1>
        <p>Your notes dashboard is ready.</p>

        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <h3>📌 Create Notes</h3>
            <p>Write and save your important ideas.</p>
            <button style={styles.btn}>Open</button>
          </div>

          <div style={styles.card}>
            <h3>📂 My Notes</h3>
            <p>View all your saved notes.</p>
            <button style={styles.btn}>View</button>
          </div>

          <div style={styles.card}>
            <h3>⚡ Productivity</h3>
            <p>Track your daily tasks.</p>
            <button style={styles.btn}>Go</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    fontFamily: "Arial",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "rgba(0,0,0,0.2)",
    alignItems: "center",
  },

  logo: {
    margin: 0,
  },

  logoutBtn: {
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  },

  hero: {
    textAlign: "center",
    padding: "40px",
  },

  cardGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "40px",
    flexWrap: "wrap",
  },

  card: {
    background: "white",
    color: "#333",
    padding: "20px",
    borderRadius: "12px",
    width: "220px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },

  btn: {
    marginTop: "10px",
    padding: "8px 12px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
