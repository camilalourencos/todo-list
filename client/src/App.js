/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from 'react';
import api from './services/api.js';
import { NewNoteForm } from './components/NewNoteForm/NewNoteForm.jsx';
import { NoteList } from './components/NoteList/NoteList.jsx'
import { HomePage } from './components/HomePage/HomePage.jsx'
import "./assets/App.css";

function App() {

  const [myNotes, setMyNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    getNote()
  }, [user])

  return (
    <>
      {isLoggedIn ?
        <>
          <header className='header'>
            <button className='logout-button' onClick={() => signOut()}>Logout</button>
          </header>
          <div Link to={'/Notes'} className="home-list">
            <NewNoteForm createNote={createNote} myNotes={myNotes} userLogin={user} />
            {renderNoteList()}
          </div></>
        :
        <HomePage Link to={'/'} signIn={signIn} signUp={signUp} />
      }
    </>

  );

  function renderNoteList() {
    if (myNotes && myNotes.length) {
      return <NoteList myNotes={myNotes} onRemove={deleteNote} onEdit={editNote} />
    } else {
      return null
    }
  }


  // ------------- TASKS ------------- 
  function getNote() {
    api
      .get(`/tasks/${user}`)
      .then((response) => { setMyNotes(response.data); console.log(user); })
      .catch((error) => {
        console.error('deu ruim no get ' + error);
        setMyNotes([])
      });
  }

  function createNote(newNote) {
    api
      .post('/tasks', newNote)
      .then((response) => {
        setMyNotes([...myNotes, response.data]);
        console.log(response.data);
      })
      .catch(error => {
        console.error('deu ruim no post ' + error);
      });
  }

  function deleteNote(id) {
    const notDeleted = myNotes.filter((note) => note.id !== id)
    api
      .delete(`/tasks/${id}`)
      .then(() => { setMyNotes([...notDeleted]) }
      )
  }

  function editNote(id, editedNote) {
    api
      .put(`/tasks/${id}`, editedNote)
      .then((response) => { console.log(response.data) })
      .catch(error => {
        console.error('deu ruim no edit ' + error);
      });
  }

  // ------------- LOGIN ------------- 
  function signUp(username, password, login) {
    api.post('/users', {
      username, password, login
    }).then((response) => { console.log(response.data) })
      .catch(error => {
        console.error('deu ruim ao criar user ' + error);
      });

  }

  function signIn(login, password) {
    //const user = { login, password };
    api.post('/auth/login', login, password)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data.login);
        setIsLoggedIn(true);
      })
  }

  function signOut() {
    api.post('/auth/logout')
      .then(() => {
        setIsLoggedIn(false);
        setUser({});
        localStorage.clear();
        alert("signout")
      })
      .catch(error => {
        console.error('it was not possible to logout ' + error);
      });
  }
}

export default App;
