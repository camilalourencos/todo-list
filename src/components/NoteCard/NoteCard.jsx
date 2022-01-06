import React, { useState } from "react";

export function NoteCard({ notes, onRemove }) {
    const [status, setStatus] = useState(false)

    return (
        <section className='note-card'>
            <header className='note-card_header'>
                <h3 className='note-card_description'>{notes.description}</h3>
            </header>
            <label>
                <input
                    type='checkbox'
                    defaultChecked={notes.completed}
                    className='form-check-input'
                    onChange={() => setStatus(true)}
                />
                Completed
            </label>
            <button 
                className='form-delete-input'
                onClick={() => onRemove(notes.id)}
            >
                Delete
            </button>
            </section>
    );

}
