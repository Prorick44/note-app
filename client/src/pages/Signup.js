import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", {
        username,
        password,
      });

      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
