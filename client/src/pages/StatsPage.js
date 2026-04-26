import { useEffect, useState } from "react";
import API from "../api/axios";

export default function StatsPage() {
  const [notes, setNotes] = useState([]);

  const userId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1]),
  ).userId;

  useEffect(() => {
    if (!userId) return;
    API.get(`/notes/${userId}`).then((res) => setNotes(res.data));
  }, [userId]);

  const totalWords = notes.reduce(
    (sum, n) => sum + (n.content?.split(" ").length || 0),
    0,
  );

  return (
    <div style={styles.container}>
      <h1>📊 Usage Stats</h1>

      <div style={styles.card}>
        <h2>Total Notes</h2>
        <p>{notes.length}</p>
      </div>

      <div style={styles.card}>
        <h2>Total Words</h2>
        <p>{totalWords}</p>
      </div>

      <div style={styles.card}>
        <h2>Avg Words / Note</h2>
        <p>{notes.length ? Math.round(totalWords / notes.length) : 0}</p>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 40 },
  card: {
    background: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },
};
