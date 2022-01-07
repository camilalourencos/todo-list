import React, { useState } from "react";
import "./style.css";

export function NewNoteForm({ createNote }) {
  const [noteDescription, setNoteDescription] = useState('');
  const [noteCompleted, setNoteCompleted] = useState(false)

  return (
    <form className='form-note' onSubmit={() => submitNote()}>
      <textarea
        rows={5}
        placeholder="Type your to-do note"
        className="form-note_input"
        value={noteDescription}
        onChange={(event) => setNoteDescription(event.target.value)}
      />
      <button
        className="form-note_input form-note_submit"
        disabled={noteDescription.length === 0 ? 1 : 0}
        onClick={(event) => {event.preventDefault(); submitNote()}}
      >
        Create to-do entry
      </button>
    </form>
  );

  function submitNote() {
    createNote({description: noteDescription, completed: noteCompleted});
    setNoteDescription('')
  }
}
