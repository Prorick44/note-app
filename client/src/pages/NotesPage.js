import { useEffect, useState } from "react";
import API from "../api/axios";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [selected, setSelected] = useState(null);

  const userId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1]),
  ).userId;

  useEffect(() => {
    if (!userId) return;
    API.get(`/notes/${userId}`).then((res) => setNotes(res.data));
  }, [userId]);

  const createNote = async () => {
    const res = await API.post("/notes", {
      userId,
      title: "Untitled",
      content: "",
    });

    setNotes([res.data, ...notes]);
  };

  const selectNote = (n) => {
    setSelected(n);
    setText(n.content);
  };

  const saveNote = async () => {
    const res = await API.put(`/notes/${selected._id}`, {
      content: text,
    });

    setNotes(notes.map((n) => (n._id === selected._id ? res.data : n)));
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    setNotes(notes.filter((n) => n._id !== id));
  };

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>📝 Notes</h2>
        <button onClick={createNote} style={styles.btn}>
          + New
        </button>

        {notes.map((n) => (
          <div key={n._id} style={styles.item}>
            <span onClick={() => selectNote(n)}>{n.title}</span>
            <button onClick={() => deleteNote(n._id)}>🗑</button>
          </div>
        ))}
      </div>

      {/* EDITOR */}
      <div style={styles.editor}>
        {selected ? (
          <>
            <h2>Edit Note</h2>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={styles.textarea}
            />
            <button onClick={saveNote} style={styles.save}>
              Save
            </button>
          </>
        ) : (
          <h2>Select a note</h2>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", height: "100vh" },
  sidebar: { width: 260, background: "#111", color: "white", padding: 20 },
  editor: { flex: 1, padding: 30 },
  item: { display: "flex", justifyContent: "space-between", padding: 8 },
  btn: { marginBottom: 10 },
  textarea: { width: "100%", height: "70vh" },
  save: { marginTop: 10 },
};
