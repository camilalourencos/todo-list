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
      <NewNoteForm createNote={handleCreateNote} myNotes={myNotes}/>
      {renderNoteList ()}
    </div>
  );

  function renderNoteList () {
    if (myNotes && myNotes.length){
      return <NoteList myNotes={myNotes} onRemove={deleteNote} onEdit={editNote} />
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
       .then((response) => {setMyNotes([...myNotes, response.data]); console.log(response.data)})
       .catch(error => {
        console.error('deu ruim no post ' + error);
      });  
  }
  
  function deleteNote (id) {
    api
      .delete(`/tasks/${id}`)
        .then(() => { myNotes.splice(0,1); setMyNotes(myNotes)}  
        )
  }

  function editNote (id, editedNote) {  
    api
      .put(`/tasks/${id}`, editedNote)
        //.then((response) => {console.log(response.data)})
        .catch(error => {
        console.error('deu ruim no edit ' + error);
      });  
  }
}

export default App;
