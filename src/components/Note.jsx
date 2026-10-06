import { useParams } from 'react-router-dom'

const Note = ({ note, deleteNote, toggleImportance }) => {
  const id = useParams().id

  if (!note) return

  const label = note.important ? 'make not important' : 'make important'

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note')) {
      deleteNote(id)
    }
  }

  const handleImportance = () => {
    const changedNote = { ...note, important: !note.important }
    toggleImportance(id, changedNote)
  }

  return (
    <li className="note">
      {note.content}
      <button onClick={handleImportance}>{label}</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default Note
