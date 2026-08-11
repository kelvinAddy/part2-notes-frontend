import { useState, useEffect } from "react";
import Note from "./components/Note.jsx";
import noteService from "./services/notes.js";

const App = () => {
  const [notesArr, setNotesArr] = useState([]);
  const [newNote, setNewNote] = useState("I am a new note");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await noteService.getAll();
      setNotesArr(data);
    })();
  }, []);

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    (async () => {
      const data = await noteService.create(noteObject);
      setNotesArr([...notesArr, data]);
      setNewNote("");
    })();
  };

  const notesToShow = showAll
    ? notesArr
    : notesArr.filter((note) => note.important);

  const toggleImportance = (id) => {
    const note = notesArr.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    (async () => {
      try {
        const data = await noteService.update(id, changedNote);
        setNotesArr(notesArr.map((note) => (note.id === id ? data : note)));
      } catch (e) {
        alert(`${e} occured`);
        setNotesArr(notesArr.filter((note) => note.id !== id));
      }
    })();
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note note={note} key={note.id} toggleImportance={toggleImportance} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
