import { useState } from 'react';
import noteService from '../services/notes';
import Note from '../components/Note';

const DisplayNotes = ({
  notesArr,
  setNotesArr,
  setErrorMessage,
  updateNotification,
}) => {
  const [showAll, setShowAll] = useState(true);

  const deleteNote = async (id) => {
    if (window.confirm(`Are you sure you want to delete this note`)) {
      try {
        noteService.remove(id);
        setNotesArr(notesArr.filter((note) => note.id !== id));
      } catch (error) {
        updateNotification(() => {
          setErrorMessage(error.response.data.error);
          setNotesArr(notesArr.filter((note) => note.id !== id));
        });
      }
    }
  };

  const toggleImportance = async (id) => {
    const note = notesArr.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    try {
      const data = await noteService.update(id, changedNote);
      setNotesArr(notesArr.map((note) => (note.id === id ? data : note)));
    } catch (e) {
      updateNotification(() => {
        setErrorMessage(
          `'${changedNote.content}' was already removed from the server`,
        );
        setNotesArr(notesArr.filter((note) => note.id !== id));
      });
    }
  };

  const notesToShow = showAll
    ? notesArr
    : notesArr.filter((note) => note.important);

  return (
    <>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            note={note}
            key={note.id}
            toggleImportance={toggleImportance}
            deleteNote={deleteNote}
          />
        ))}
      </ul>
    </>
  );
};

export default DisplayNotes;
