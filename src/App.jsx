import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note.jsx";

const App = () => {
  const [notesArr, setNotesArr] = useState([]);
  const [newNote, setNewNote] = useState("I am a new note");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fullfilled");
      setNotesArr(response.data);
    });
  }, []);
  console.log("render", notesArr.length, "notes");

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };
  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notesArr.length + 1),
    };

    setNotesArr([...notesArr, noteObject]);
    setNewNote("");
  };

  const notesToShow = showAll
    ? notesArr
    : notesArr.filter((note) => note.important);
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
          <Note note={note} key={note.id} />
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
