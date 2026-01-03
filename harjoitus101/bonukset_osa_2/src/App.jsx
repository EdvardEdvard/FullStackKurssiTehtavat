import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'


//komponentit
const MappedNotes = ({ notes }) => (
  notes.map(note => <li key={note.id}>{note.content}</li>)
)

const consolePrints = ({ notes }) => {
  console.log(getNoteIds(notes))
  console.log(getNoteContents(notes))
}

//handlerit
const handleAddNote = ({ event, noteValue, noteList, setNoteList, setNoteValue }) => {
  event.preventDefault()
  console.log('button clicked', event.target)

  const noteObject = {
    content: noteValue,
    important: Math.random() > 0.5,
    id: String(noteList.length + 1),
  }

  setNoteList(noteList.concat(noteObject))
  setNoteValue('')
}


const handleNoteChange = ({ event, setNoteValue }) => {
  console.log(event.target.value)
  setNoteValue(event.target.value)
}


//funktiot + promiset
const getNoteIds = notes => notes.map(note => note.id);
const getNoteContents = notes => notes.map(note => note.content);
const notesToShow = (notes, showAll) => showAll ? notes : notes.filter(note => note.important)
const getAllFromUrl = url => (console.log(url), axios.get(url))
const logFullResponse = axiosPromise => axiosPromise.then(httpResponse => console.log(httpResponse))
const logResponseData = axiosPromise => axiosPromise.then(httpResponse => console.log(httpResponse.data))
const getDataFromResponse = axiosPromise => axiosPromise.then(httpResponse => httpResponse.data)



const App = (props) => {
  
  const [notesJSON, setNotesJSON] = useState([])
  const [notes, setNotes] = useState(props.notes) //notes main.jsx:stä
  const [newNote, setNewNote] = useState('a new note...') 
  const [newNoteJSON, setNewNoteJSON] = useState('a new noteJSON...') 
   const [showAll, setShowAll] = useState(true)
  
  const visibleNotesJSX = notesToShow(notes, showAll)
  const visibleNotesJSON = notesToShow(notesJSON, showAll)

  consolePrints({ notes })

  useEffect(() => {   // Fetch notes once on mount
    console.log('effect 1st part')
    const notesPromise = getAllFromUrl('http://localhost:3002/notes')
    logFullResponse(notesPromise)
    logResponseData(notesPromise)

    console.log('effect 2nd part')
    const notesPromise2 = getAllFromUrl('http://localhost:3002/notes')
    getDataFromResponse(notesPromise2).then(data => {console.log('render', data.length, 'notes')
    setNotesJSON(data)
    })
  }, [])  // empty array → runs only once

  //const promiseFoobar = fetchDataFromUrl('http://localhost:3002/foobar')
  //logFullAxiosResponse(promiseFoobar)
  //logAxiosResponseData(promiseFoobar)

  //notes.map pitää lisätä key=note.id koska uusilla elementeillä pitää olla uniikki avain (key nimienn atribuutti)
  return (
    <div>
      <h1>Notes</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all' }
          </button>
        </div>  
      <ul>
        <p> Notes iterated in a dum way:: notes[parameter].content</p>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
        <p> Notes iterater in a smart way:: mapped from jsx.file</p>
        <MappedNotes notes={visibleNotesJSX} />
      </ul>
      <form onSubmit={(event) => handleAddNote({ event, noteValue: newNote, noteList: notes, setNoteList: setNotes, setNoteValue: setNewNote })}>
        <input value={newNote} onChange={(event) => handleNoteChange({ event, setNoteValue: setNewNote })}/>
        <button type="submit">save</button>
      </form>   
      <ul>
        <p> Notes iterater in a smart way:: mapped from JSON.file</p>
        <MappedNotes notes={visibleNotesJSON} />
      </ul>
      <form onSubmit={(event) => handleAddNote({ event, noteValue: newNoteJSON, noteList: notesJSON, setNoteList: setNotesJSON, setNoteValue: setNewNoteJSON })}>
        <input value={newNoteJSON} onChange={(event) => handleNoteChange({ event, setNoteValue: setNewNoteJSON })}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App