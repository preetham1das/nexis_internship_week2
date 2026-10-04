import { Link } from "react-router-dom";

function NoteCard({ note, onDelete }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-card-actions">
        <Link to={`/edit-note/${note._id}`} className="edit-btn">Edit</Link>
        <button className="delete-btn" onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;