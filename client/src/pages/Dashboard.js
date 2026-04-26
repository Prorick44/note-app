import { useEffect, useState } from "react";
import API from "../api/axios";
import { getToken } from "../utils/auth";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [content, setContent] = useState("");

  // SAFE TOKEN PARSE
  const token = getToken();

  let userId = null;
  try {
    userId = token ? JSON.parse(atob(token.split(".")[1])).userId : null;
  } catch (err) {
    console.log("Invalid token");
  }

  // READ NOTES
  useEffect(() => {
    if (!userId) return;

    const fetchNotes = async () => {
      try {
        const res = await API.get(`/notes/${userId}`);
        setNotes(res.data);
      } catch (err) {
        console.log("Fetch error:", err.message);
      }
    };

    fetchNotes();
  }, [userId]);

  // CREATE NOTE
  const createNote = async () => {
    try {
      const res = await API.post("/notes", {
        userId,
        title: "New Note",
        content: "",
      });

      setNotes((prev) => [res.data, ...prev]);
      setSelectedId(res.data._id);
      setContent("");
    } catch (err) {
      console.log("Create error:", err.message);
    }
  };

  // SELECT NOTE
  const selectNote = (note) => {
    setSelectedId(note._id);
    setContent(note.content || "");
  };

  // SAVE NOTE
  const saveNote = async () => {
    try {
      const res = await API.put(`/notes/${selectedId}`, {
        content,
      });

      setNotes((prev) =>
        prev.map((n) => (n._id === selectedId ? res.data : n)),
      );
    } catch (err) {
      console.log("Save error:", err.message);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);

      setNotes((prev) => prev.filter((n) => n._id !== id));

      if (selectedId === id) {
        setSelectedId(null);
        setContent("");
      }
    } catch (err) {
      console.log("Delete error:", err.message);
    }
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h3>📝 Notes</h3>

        <button style={styles.addBtn} onClick={createNote}>
          + New Note
        </button>

        {notes.map((note) => (
          <div key={note._id} style={styles.noteItem}>
            <span
              onClick={() => selectNote(note)}
              style={{ cursor: "pointer" }}
            >
              {note.title}
            </span>

            <button onClick={() => deleteNote(note._id)} style={styles.delBtn}>
              ❌
            </button>
          </div>
        ))}
      </div>

      {/* EDITOR */}
      <div style={styles.editor}>
        {selectedId ? (
          <>
            <h3>Edit Note</h3>

            <textarea
              style={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button onClick={saveNote} style={styles.saveBtn}>
              💾 Save
            </button>
          </>
        ) : (
          <h3>Select a note</h3>
        )}
      </div>
    </div>
  );
}

/* ✅ USED STYLES (no ESLint error anymore) */
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "250px",
    background: "#111",
    color: "white",
    padding: "15px",
  },

  editor: {
    flex: 1,
    padding: "20px",
  },

  addBtn: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
  },

  noteItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
    borderBottom: "1px solid #333",
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
    padding: "10px",
  },

  saveBtn: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
