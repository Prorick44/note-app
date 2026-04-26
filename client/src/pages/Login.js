import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({ username, password });
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        <input
          placeholder="username"
          style={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.btn} onClick={handleLogin}>
          Login
        </button>
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
    background: "#f3f4f6",
  },
  card: {
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
