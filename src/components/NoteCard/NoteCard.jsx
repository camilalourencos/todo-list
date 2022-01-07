import React, { useState } from "react";
import { FaRegTrashAlt, AiOutlineCheckCircle } from 'react-icons/fa';
import "./style.css";

export function NoteCard({ notes, onRemove }) {
    const [status, setStatus] = useState(false)

    return (
        <section className='note-card'>
            <header className='note-card_header'>
                <h3 className='note-card_description'>{notes.description}</h3>
            </header>
            <div className='completed-checkbox'> 
                <input
                    type='checkbox'
                    defaultChecked={notes.completed}
                    className='form-check-input'
                    onChange={() => setStatus(true)}
                />
                <label class='checked'>Completed</label>
            </div>
            <button 
                className='form-delete-input'
                onClick={() => onRemove(notes.id)}
            >
                <FaRegTrashAlt/>
            </button>
            </section>
    );

}
