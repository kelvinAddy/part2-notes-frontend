import { useState } from 'react'
import { Link } from 'react-router-dom'
import ToggleLable from './ToggleLable'
import LoginForm from './LoginForm'

const NoteList = ({ notesArr, user, logUserIn }) => {
  const [showAll, setShowAll] = useState(true)

  const notesToShow = notesArr.filter((n) => (showAll ? n : n.important))
  return (
    <div>
      <h1>Notes</h1>
      {!user && (
        <ToggleLable buttonLabel="login">
          <LoginForm logUserIn={logUserIn} />
        </ToggleLable>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'important' : 'all'}</button>
      </div>

      <ul>
        {notesToShow.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NoteList
