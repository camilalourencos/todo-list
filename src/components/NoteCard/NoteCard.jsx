import React, { useState } from "react";

export function NoteCard(props) {
    const [status, setStatus] = useState(props.notes.completed)

    return (
        <section className='note-card'>
            <header className='note-card_header'>
                <h3 className='note-card_description'>{props.notes.description}</h3>
            </header>
            <label>
                <input
                    type='checkbox'
                    defaultChecked={props.notes.completed}
                    className='form-check-input'
                    onChange={() => setStatus(true)}
                />
                Completed
            </label>
            </section>
    );

}
