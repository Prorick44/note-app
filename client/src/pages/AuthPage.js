import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Welcome 👋</h1>
        <p>Please login or create an account</p>

        <div style={styles.btnGroup}>
          <button style={styles.login} onClick={() => navigate("/login")}>
            Login
          </button>

          <button style={styles.signup} onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  btnGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    justifyContent: "center",
  },
  login: {
    padding: "10px 20px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  signup: {
    padding: "10px 20px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
