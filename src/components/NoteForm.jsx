import noteService from '../services/notes';

const NoteForm = ({
  setErrorMessage,
  updateNotification,
  setNotesArr,
  notesArr,
  noteFormRef,
  setUser,
}) => {
  const addNote = async (formData) => {
    const noteObject = {
      content: formData.get('note'),
      important: true,
    };

    try {
      noteFormRef.current.toggleVisibility();
      const data = await noteService.create(noteObject);
      setNotesArr([...notesArr, data]);
    } catch (e) {
      updateNotification(() => {
        setErrorMessage(e.response.data.error);
      });
      if (e.response.data.error.includes('token expired')) {
        setUser(null);
        window.localStorage.clear();
      }
    }
  };
  return (
    <form action={addNote}>
      <input name="note" type="text" />
      <button type="submit">Save</button>
    </form>
  );
};

export default NoteForm;
