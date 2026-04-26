import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome Back 👋</h1>
        <p style={styles.subtitle}>Your SaaS dashboard is ready</p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>📝 Notes</h3>
            <p>Create and manage notes</p>
            <button style={styles.btn} onClick={() => navigate("/notes")}>
              Open
            </button>
          </div>

          <div style={styles.card}>
            <h3>📊 Analytics</h3>
            <p>Track usage stats</p>
            <button style={styles.btn} onClick={() => navigate("/stats")}>
              View
            </button>
          </div>

          <div style={styles.card}>
            <h3>⚡ Productivity</h3>
            <p>Boost workflow</p>
            <button
              style={styles.btn}
              onClick={() => navigate("/productivity")}
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    color: "white",
    textAlign: "center",
  },

  title: {
    fontSize: "40px",
  },

  subtitle: {
    opacity: 0.8,
  },

  grid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
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
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
