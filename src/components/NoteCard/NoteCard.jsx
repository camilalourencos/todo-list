import React, { useState } from "react";
import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';
import "./style.css";

export function NoteCard({ notes, onRemove, onEdit }) {
    const [status, setStatus] = useState(notes.completed)
    const [editable, setEditable] = useState(false)
    const [noteText, setNoteText] = useState(notes.description)

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
                        defaultChecked={notes.completed}
                        onChange={(event) => {
                            setStatus(event.target.checked);
                            updateNote(); 
                            console.log(notes.completed)}}
                    />
                    <span className='checkmark'></span>
                </label>
                <button 
                    className='form-delete-input'
                    onClick={() => {onRemove(notes.id); console.log(notes.id)}}
                >
                    <FaRegTrashAlt/>
                </button>
                <button 
                    className='form-edit-input'
                    onClick={() => setEditable(true)}
                >
                    <FaPencilAlt/>
                </button>
            </div>

        </section>
    );   

    function renderCurrentText () {
        return <h3>{noteText}</h3>
    }

    function renderEditArea () {
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

    function renderText () {
        if(!editable){
            return renderCurrentText();
        } else {
            return renderEditArea();
        }
    }

    function updateNote() { 
        onEdit(notes.id, {id: notes.id, description: noteText, completed: status});
    }
}
