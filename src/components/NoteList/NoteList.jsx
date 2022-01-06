import React from 'react';
import { NoteCard } from '../NoteCard/NoteCard.jsx'

export function NoteList({ myNotes, onRemove }) {
  return (
    <ul className='notes-list'>
        {myNotes.map((note, index) => {
            return (
                <li className='note-list_item' key={index}>
                    <NoteCard notes={note} onRemove={onRemove}/>
                </li>
            );
        })}
    </ul>
  );
}
