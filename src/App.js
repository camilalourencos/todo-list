/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState, useRef } from 'react';
import api from './services/api.js';
import { NewNoteForm } from './components/NewNoteForm/NewNoteForm.jsx';
import { NoteList } from './components/NoteList/NoteList.jsx'
import "./assets/App.css";

function App() {

  const [myNotes, setMyNotes] = useState([])
  const prevNotesRef = useRef()

  useEffect(() => {
    prevNotesRef.current = myNotes
  })

  const prevNotes = prevNotesRef.current;

  useEffect(() => {
    if(prevNotes !== myNotes){
      getNote ()
    }
  }, [getNote])
  
  return ( 
    <div className="home-list">
      <NewNoteForm createNote={handleCreateNote}/>
      {renderNoteList ()}
    </div>
  );

  function renderNoteList () {
    if (myNotes && myNotes.length){
      return <NoteList myNotes={myNotes} onRemove={deleteNote}/>
    } else {
      return null
    }
  }

  function getNote () {
    api 
      .get('/tasks')
      .then((response) => setMyNotes(response.data))
      .catch((error) => { 
        console.error('deu ruim no get ' + error);
        setMyNotes([])
      });
  }

  function handleCreateNote(newNote) {
    api
     .post('/tasks', newNote)
       .then((response) => setMyNotes([...myNotes, response.data]))
       .catch(error => {
        console.error('deu ruim no post ' + error);
      });  
  }
  
  function deleteNote (id) {
    api
      .delete('/tasks/'+ id)
        .then(() => { myNotes.splice(0,1); setMyNotes(myNotes) }  
        )
  }
}

export default App;
