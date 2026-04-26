import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ProductivityPage() {
  const [notes, setNotes] = useState([]);

  const userId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1]),
  ).userId;

  useEffect(() => {
    if (!userId) return;
    API.get(`/notes/${userId}`).then((res) => setNotes(res.data));
  }, [userId]);

  const productivityScore = () => {
    let score = 0;

    notes.forEach((n) => {
      if (n.content?.length > 100) score += 10;
      if (n.content?.length > 300) score += 20;
    });

    return score;
  };

  return (
    <div style={styles.page}>
      <h1>⚡ Productivity Dashboard</h1>

      <div style={styles.big}>Score: {productivityScore()}</div>

      <p>Write more structured notes to increase score 🚀</p>
    </div>
  );
}

const styles = {
  page: { padding: 40, textAlign: "center" },
  big: {
    fontSize: 50,
    fontWeight: "bold",
    margin: 20,
  },
};
