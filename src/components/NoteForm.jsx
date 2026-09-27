import { useState } from 'react';

const NoteForm = () => {
  const [newNote, setNewNote] = useState('');

  const addNote = async (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    try {
      const data = await noteService.create(noteObject);
      setNotesArr([...notesArr, data]);
      setNewNote('');
    } catch (e) {
      updateNotification(() => {
        setErrorMessage(e.response.data.error);
      });
    }
  };
  return (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={({ target }) => target.value} />
      <button type="submit">Save</button>
    </form>
  );
};

export default NoteForm;
