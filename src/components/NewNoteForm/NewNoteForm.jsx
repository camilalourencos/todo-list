import React, { useState } from "react";

export function NewNoteForm(props) {
  const [note, setNote] = useState({ description: "" });

  return (
    <form onSubmit={() => submitNote()}>
      <textarea
        rows={15}
        placeholder="Type your to-do note"
        className="form-note_input"
        value={props.note}
        onChange={(event) => setNote(event.target.value)}
      />
      <button
        onClick={submitNote}
      >
        Create to-do entry
      </button>
    </form>
  );

  function submitNote(event) {
    event.preventDefault();
    props.createNote(note);
  }
}
