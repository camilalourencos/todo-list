import React, { useState } from 'react';
import { NewNoteForm } from './components/NewNoteForm/NewNoteForm.jsx';
import { NoteList } from './components/NoteList/NoteList.jsx'

function App() {

  const [myNotes, setMyNotes] = useState ([ 
    {
      "description": "Sleep",
      "completed": false
    }
  ])

  function handleCreateNote(description, completed) {
    const newNote = { description, completed };
    setMyNotes([...myNotes, newNote]);
  }

  return ( 
    <div className="App">
      <NewNoteForm createNote={handleCreateNote}/>
      {renderNoteList ()}
      
    </div>
  );

  function renderNoteList () {
    if (myNotes && myNotes.length){
      return <NoteList myNotes={myNotes}/>
    } else {
      return null
    }
  }
}

export default App;
