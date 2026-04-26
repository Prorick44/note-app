import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/signup", {
        username,
        password,
      });

      alert("Signup successful 🚀");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account ✨</h1>
        <p style={styles.subtitle}>Join and start managing your notes</p>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleSignup} disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
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
    fontFamily: "Arial",
  },

  card: {
    width: "340px",
    background: "white",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    textAlign: "center",
  },

  title: {
    marginBottom: "5px",
    color: "#111",
  },

  subtitle: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  footerText: {
    marginTop: "15px",
    fontSize: "13px",
    color: "#666",
  },

  link: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
