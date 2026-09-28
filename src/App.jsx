import { useState, useEffect } from 'react';
import noteService from './services/notes.js';
import Notification from './components/Notification.jsx';
import Footer from './components/Footer.jsx';
import NoteForm from './components/NoteForm.jsx';
import DisplayNotes from './components/DisplayNotes.jsx';
import ToggleLable from './components/ToggleLable.jsx';
import LoginForm from './components/LoginForm.jsx';

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
      {!user && (
        <ToggleLable buttonLabel="login">
          <LoginForm
            setErrorMessage={setErrorMessage}
            updateNotification={updateNotification}
            setUser={setUser}
          />
        </ToggleLable>
      )}
      <DisplayNotes
        updateNotification={updateNotification}
        setErrorMessage={setErrorMessage}
        setNotesArr={setNotesArr}
        notesArr={notesArr}
      />
      {user && (
        <ToggleLable buttonLabel="new note">
          <NoteForm
            updateNotification={updateNotification}
            setErrorMessage={setErrorMessage}
          />
        </ToggleLable>
      )}

      <Footer />
    </div>
  );
};

export default App;
