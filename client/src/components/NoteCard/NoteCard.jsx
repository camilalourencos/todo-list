import React, { useEffect, useState } from "react";
import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';
import "./style.css";

export function NoteCard({ notes, onRemove, onEdit }) {
    const [status, setStatus] = useState(notes.status)
    const [editable, setEditable] = useState(false)
    const [noteText, setNoteText] = useState(notes.description)
    const noteID = notes.id

    useEffect(() => {
        //console.log(notes);
        setStatus(notes.satus);
        //console.log(notes.status);
        setEditable(false);
        setNoteText(notes.description);
    }, [notes])

    return (
        <section className='note-card'>
            <header className='note-card_header'>
                <span className='note-card_description'>
                    {renderText()}
                </span>
            </header>
            <div className='actions-buttons'>
                <label className='container'>
                    <input
                        type='checkbox'
                        value={status}
                        defaultChecked={status}
                        //checked={status}
                        onChange={(event) => {
                            //event.stopPropagation();
                            //setStatus(!status);   
                            //console.log(event.target.checked);
                            // setStatus(event.target.checked);
                            updateStatus(event.target.checked);
                        }}
                    />
                    <span className='checkmark'></span>
                </label>
                <button
                    className='form-delete-input'
                    onClick={() => onRemove(noteID)}
                >
                    <FaRegTrashAlt />
                </button>
                <button
                    className='form-edit-input'
                    onClick={() => { setEditable(true) }}
                >
                    <FaPencilAlt />
                </button>
            </div>

        </section>
    );

    function renderCurrentText() {
        return <h3>{noteText}</h3>
    }

    function renderEditArea() {
        return (
            <form className='form-edit'>
                <textarea
                    className="form-edit_input"
                    value={noteText}
                    onChange={(event) => setNoteText(event.target.value)}
                />
                <button
                    className="form-edit_submit"
                    onClick={(event) => {
                        event.preventDefault();
                        updateNote();
                        setEditable(false);
                    }}
                >
                    Save
                </button>
            </form>
        )
    }

    function renderText() {
        if (!editable) {
            return renderCurrentText();
        } else {
            return renderEditArea();
        }
    }

    function updateNote() {
        onEdit(noteID, { ...notes, description: noteText });
    }

    function updateStatus(event) {
        setTimeout(() => {
            setStatus(!status);
            onEdit(noteID, { ...notes, completed: event });
        }, 100)

    }
}
