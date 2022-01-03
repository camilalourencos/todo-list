import React from 'react';
import { NoteCard } from '../NoteCard/NoteCard.jsx'

export function NoteList(props) {
  return (
    <ul className='notes-list'>
        {props.myNotes.map((note, index) => {
            return (
                <li className='note-list_item' key={index}>
                    <NoteCard notes={note} />
                </li>
            );
        })}
    </ul>
  );
}
