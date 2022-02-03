import React, { useState } from "react";
import "./style.css";

export function NewNoteForm({ createNote,  }) {
  const [noteDescription, setNoteDescription] = useState('');
  const [noteCompleted, setNoteCompleted] = useState(false)

  return (
    <section className='form'> 
      <form className='form-note' >
        <textarea
          rows={5}
          placeholder="Type your to-do note"
          className="form-note_input"
          value={noteDescription}
          onChange={(event) => {setNoteDescription(event.target.value) }}
        />
        <button
          className="form-note_submit"
          disabled={!noteDescription.length}
          onClick={(event) => {event.preventDefault(); submitNote()}}
        >
          Add
        </button>
      </form>
    </section>

  );

  function submitNote() {
    createNote({ description: noteDescription, completed: noteCompleted });
    setNoteDescription('')
    
  }
}
