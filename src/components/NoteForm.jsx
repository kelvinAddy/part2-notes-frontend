const NoteForm = ({ addNote }) => {
  const handleNoteCreation = async (formData) => {
    const createdNote = {
      content: formData.get('note'),
      important: true,
    }
    addNote(createdNote)
  }
  return (
    <div>
      <h2>Create a new note</h2>
      <form action={handleNoteCreation}>
        <input name="note" type="text" />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default NoteForm
