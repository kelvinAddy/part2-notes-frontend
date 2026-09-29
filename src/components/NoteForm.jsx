import noteService from '../services/notes';

const NoteForm = ({
  setErrorMessage,
  updateNotification,
  setNotesArr,
  notesArr,
  noteFormRef,
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
        console.log(e);
        setErrorMessage(e.response.data.error);
      });
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
