import React, { useState } from "react";
import { FaRegTrashAlt } from 'react-icons/fa';
import "./style.css";

export function NoteCard({ notes, onRemove }) {
    const [status, setStatus] = useState(false)

    return (
        <section className='note-card'>
            <header className='note-card_header'>
                <h3 className='note-card_description'>{notes.description}</h3>
            </header>
            <div className='actions-buttons'>
                <label className='container'> 
                    <input
                        type='checkbox'
                        defaultChecked={notes.completed}
                        onChange={() => {setStatus(true)}}
                    />
                    <span className='checkmark'></span>
                </label>
                <button 
                    className='form-delete-input'
                    onClick={() => onRemove(notes.id)}
                >
                    <FaRegTrashAlt/>
                </button>
            </div>

        </section>
    );
}
