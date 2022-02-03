import React from 'react';
import { NoteCard } from '../NoteCard/NoteCard.jsx'
import "./style.css";

export function NoteList({ myNotes, onRemove, onEdit }) {
  return (
    <ul className='notes-list'>
        {myNotes.map((note, index) => {
            return (
                <li className='note-list_item' key={index}>
                    <NoteCard notes={note} onRemove={onRemove} onEdit={onEdit} />
                </li>
            );
        })}
    </ul>
  );
  
}
