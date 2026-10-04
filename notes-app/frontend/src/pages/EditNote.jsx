import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getNote, updateNote } from "../services/noteService";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getNote(id)
      .then((data) => {
        const note = data.note || data;
        setFormData({ title: note.title || "", content: note.content || "" });
      })
      .catch((requestError) => {
        setError(requestError.response?.data?.message || "Unable to load note");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await updateNote(id, formData);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update note");
    }
  };

  return (
    <>
      <Navbar />
      <main className="note-page">
        {loading ? (
          <p>Loading note...</p>
        ) : error && !formData.title ? (
          <p className="error">{error}</p>
        ) : (
          <form className="note-form" onSubmit={handleSubmit}>
            <h2>Edit Note</h2>
            {error && <p className="error">{error}</p>}
            <label htmlFor="title">Title</label>
            <input id="title" name="title" value={formData.title} onChange={handleChange} required />
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows="8" required />
            <div className="form-actions">
              <button type="submit">Update Note</button>
              <button type="button" className="cancel-btn" onClick={() => navigate("/dashboard")}>Cancel</button>
            </div>
          </form>
        )}
      </main>
    </>
  );
}

export default EditNote;