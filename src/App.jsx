import { useState, useEffect } from 'react';
import noteService from './services/notes.js';
import Notification from './components/Notification.jsx';
import Footer from './components/Footer.jsx';
import LoginForm from './components/LoginForm.jsx';
import NoteForm from './components/NoteForm.jsx';
import DisplayNotes from './components/DisplayNotes.jsx';

const App = () => {
  const [notesArr, setNotesArr] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const updateNotification = (updater) => {
    updater();
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  useEffect(() => {
    noteService.getAll().then((data) => setNotesArr(data));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {!user && <LoginForm setErrorMessage={setErrorMessage} updateNotification={updateNotification} setUser={setUser} />}
      {user && (
        <>
          <DisplayNotes updateNotification={updateNotification} setErrorMessage={setErrorMessage} setNotesArr={setNotesArr} notesArr={notesArr} />
          <NoteForm updateNotification={updateNotification} setErrorMessage={setErrorMessage} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default App;
