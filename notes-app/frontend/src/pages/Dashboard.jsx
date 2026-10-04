import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { deleteNote, getNotes } from "../services/noteService";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNotes()
      .then((data) => setNotes(Array.isArray(data) ? data : data.notes || []))
      .catch((requestError) => {
        setError(requestError.response?.data?.message || "Unable to load notes");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    try {
      await deleteNote(id);
      setNotes((previousNotes) => previousNotes.filter((note) => note._id !== id));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to delete note");
    }
  };

  return (
    <>
      <Navbar />
      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>My Notes</h1>
            <p>Organize your thoughts in one place.</p>
          </div>
          <button onClick={() => navigate("/add-note")}>+ Add Note</button>
        </div>
        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Loading notes...</p>
        ) : error ? null : notes.length === 0 ? (
          <div className="empty-state">
            <h3>No notes yet</h3>
            <p>Create your first note to get started.</p>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default Dashboard;