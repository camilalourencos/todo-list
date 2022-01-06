import React, { useState } from "react";

export function NewNoteForm({ createNote }) {
  const [noteDescription, setNoteDescription] = useState('');
  const [noteCompleted, setNoteCompleted] = useState(false)

  return (
    <form onSubmit={() => submitNote()}>
      <textarea
        rows={15}
        placeholder="Type your to-do note"
        className="form-note_input"
        value={noteDescription}
        onChange={(event) => setNoteDescription(event.target.value)}
      />
      <button
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
