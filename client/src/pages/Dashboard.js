import { useEffect, useState } from "react";
import API from "../api/axios";
import { getToken } from "../utils/auth";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);

  const userId = JSON.parse(atob(getToken().split(".")[1])).userId;

  // load notes
  useEffect(() => {
    API.get(`/notes/${userId}`).then((res) => {
      setNotes(res.data);
    });
  }, []);

  // create note
  const createNote = async () => {
    const res = await API.post("/notes", {
      userId,
      title: "New Note",
      content: "",
    });

    setNotes([...notes, res.data]);
  };

  // update note
  const updateNote = async (value) => {
    const updated = await API.put(`/notes/${selected._id}`, {
      ...selected,
      content: value,
    });

    setSelected(updated.data);

    setNotes((prev) =>
      prev.map((n) => (n._id === updated.data._id ? updated.data : n)),
    );
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h3>📄 Notes</h3>

        <button onClick={createNote} style={styles.addBtn}>
          + New Note
        </button>

        {notes.map((note) => (
          <div
            key={note._id}
            style={styles.noteItem}
            onClick={() => setSelected(note)}
          >
            {note.title}
          </div>
        ))}
      </div>

      {/* EDITOR */}
      <div style={styles.editor}>
        {selected ? (
          <>
            <h2>{selected.title}</h2>

            <textarea
              style={styles.textarea}
              value={selected.content}
              onChange={(e) => updateNote(e.target.value)}
            />
          </>
        ) : (
          <h2>Select a note</h2>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },

  sidebar: {
    width: "250px",
    background: "#1f1f1f",
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
  },

  noteItem: {
    padding: "8px",
    cursor: "pointer",
    borderBottom: "1px solid #333",
  },

  textarea: {
    width: "100%",
    height: "80vh",
    fontSize: "16px",
  },
};
