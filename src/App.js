/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState, useRef } from 'react';
import api from './services/api.js';
import { NewNoteForm } from './components/NewNoteForm/NewNoteForm.jsx';
import { NoteList } from './components/NoteList/NoteList.jsx'
import "./assets/App.css";

function App() {

  const [myNotes, setMyNotes] = useState([])

  useEffect(() => {
      getNote ()
  }, [])
  
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
      .then((response) => {setMyNotes(response.data) })
      .catch((error) => { 
        console.error('deu ruim no get ' + error);
        setMyNotes([])
      });
  }

  function handleCreateNote (newNote) {
    api
     .post('/tasks', newNote)
       .then((response) => setMyNotes([...myNotes, response.data]))
       .catch(error => {
        console.error('deu ruim no post ' + error);
      });  
  }
  
  function deleteNote (id) {
    const index = myNotes.findIndex((note) => note.id === id )
    const deleted = myNotes.splice(index, 1)

    api
      .delete(`/tasks/${id}`)
        .then(() => { setMyNotes([...myNotes]) }  
        )
  }

  function editNote (id, editedNote) {  
    //console.log(editedNote)
    api
      .put(`/tasks/${id}`, editedNote)
        //.then((response) => {console.log(response.data)})
        .catch(error => {
        console.error('deu ruim no edit ' + error);
      });  
  }
}

export default App;
