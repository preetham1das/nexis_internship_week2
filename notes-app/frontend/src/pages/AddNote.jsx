import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createNote } from "../services/noteService";
import "../styles/NoteForm.css";

function AddNote() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      await createNote(formData);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="note-page">
        <div className="note-editor-heading">
          <h1>Create a note</h1>
          <p>Start with a title, then write down what matters.</p>
        </div>
        <form className="note-form" onSubmit={handleSubmit}>
          {error && <p className="error" role="alert">{error}</p>}
          <div className="note-field">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" placeholder="Give your note a title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="note-field note-content-field">
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" placeholder="Write your note..." value={formData.content} onChange={handleChange} rows={12} required />
          </div>
          <div className="note-form-footer">
            <span className="note-character-count" aria-live="polite">
              {formData.content.length} characters
            </span>
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => navigate("/dashboard")}>Cancel</button>
              <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save note"}</button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default AddNote;