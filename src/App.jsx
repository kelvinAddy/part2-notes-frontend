import { useState, useEffect } from 'react'
import noteService from './services/notes.js'
import loginService from './services/login.js'
import Notification from './components/Notification.jsx'
import Footer from './components/Footer.jsx'
import NoteForm from './components/NoteForm.jsx'
import NoteList from './components/NoteList.jsx'
import { useNavigate, Routes, Route, Link, useMatch } from 'react-router-dom'
import Home from './components/Home.jsx'
import Note from './components/Note.jsx'

const App = () => {
  const [notesArr, setNotesArr] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const match = useMatch('/notes/:id')
  const navigate = useNavigate()

  const note = match ? notesArr.find((n) => n.id === match.params.id) : null

  useEffect(() => {
    noteService.getAll().then((data) => setNotesArr(data))
  }, [])

  const updateNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const deleteNote = async (id) => {
    try {
      await noteService.remove(id)
      setNotesArr(notesArr.filter((note) => note.id !== id))
      navigate('/notes')
    } catch (error) {
      const serverError = error.response.data.error
      updateNotification(serverError)
    }
  }

  const toggleImportance = async (id, changedNote) => {
    try {
      const data = await noteService.update(id, changedNote)
      setNotesArr(notesArr.map((note) => (note.id === id ? data : note)))
    } catch (error) {
      const serverError = error.response.data.error
      updateNotification(serverError)
    }
  }

  const addNote = async (createdNote) => {
    try {
      const data = await noteService.create(createdNote)
      setNotesArr([...notesArr, data])
    } catch (error) {
      const serverError = error.response.data.error
      updateNotification(serverError)
    }
  }

  const logUserIn = async (userObj) => {
    try {
      const data = await loginService.login(userObj)
      window.localStorage.setItem('loggedInUser', JSON.stringify(data))
      setUser(data)
    } catch (error) {
      const serverError = error.response.data.error
      updateNotification(serverError)
    }
  }

  const userJSON = window.localStorage.getItem('loggedInUser')
  if (!user && userJSON) {
    const userObj = JSON.parse(userJSON)
    setUser(userObj)
  }

  return (
    <>
      <div>
        <Link style={{ padding: 5 }} to="/">
          home
        </Link>
        <Link style={{ padding: 5 }} to="/notes">
          notes
        </Link>
        <Link style={{ padding: 5 }} to="/create">
          new note
        </Link>
      </div>
      {message && <Notification message={message} />}
      <Routes>
        <Route path="/create" element={<NoteForm setUser={setUser} addNote={addNote} />} />
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NoteList notesArr={notesArr} logUserIn={logUserIn} user={user} />} />
        <Route path="/notes/:id" element={<Note note={note} toggleImportance={toggleImportance} deleteNote={deleteNote} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
