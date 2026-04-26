import { useEffect, useState } from "react";
import API from "../api/axios";
import { getToken } from "../utils/auth";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [content, setContent] = useState("");

  const token = getToken();
  const userId = token ? JSON.parse(atob(token.split(".")[1])).userId : null;

  // READ
  useEffect(() => {
    if (!userId) return;

    API.get(`/notes/${userId}`).then((res) => {
      setNotes(res.data);
    });
  }, [userId]);

  // CREATE
  const createNote = async () => {
    const res = await API.post("/notes", {
      userId,
      title: "New Note",
      content: "",
    });

    setNotes([res.data, ...notes]);
    setSelectedId(res.data._id);
    setContent("");
  };

  // SELECT
  const selectNote = (note) => {
    setSelectedId(note._id);
    setContent(note.content);
  };

  // UPDATE
  const saveNote = async () => {
    const res = await API.put(`/notes/${selectedId}`, {
      content,
    });

    setNotes((prev) => prev.map((n) => (n._id === selectedId ? res.data : n)));
  };

  // DELETE
  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);

    setNotes((prev) => prev.filter((n) => n._id !== id));

    if (selectedId === id) {
      setSelectedId(null);
      setContent("");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* SIDEBAR */}
      <div style={{ width: 250, background: "#222", color: "white" }}>
        <button onClick={createNote}>+ New</button>

        {notes.map((n) => (
          <div key={n._id} style={{ display: "flex" }}>
            <div onClick={() => selectNote(n)}>{n.title}</div>

            <button onClick={() => deleteNote(n._id)}>X</button>
          </div>
        ))}
      </div>

      {/* EDITOR */}
      <div style={{ flex: 1, padding: 20 }}>
        {selectedId ? (
          <>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: "100%", height: 400 }}
            />

            <button onClick={saveNote}>Save</button>
          </>
        ) : (
          <h3>Select a note</h3>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", height: "100vh" },

  sidebar: {
    width: "250px",
    background: "#1f1f1f",
    color: "white",
    padding: "15px",
  },

  editor: { flex: 1, padding: "20px" },

  addBtn: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },

  noteItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
    borderBottom: "1px solid #333",
    cursor: "pointer",
  },

  delBtn: {
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  textarea: {
    width: "100%",
    height: "80vh",
    fontSize: "16px",
  },

  saveBtn: {
    marginTop: "10px",
    padding: "10px",
    background: "#4f46e5",
    color: "white",
    border: "none",
  },
};
