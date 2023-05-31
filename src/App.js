import './App.css';
import { useState } from 'react';

let notes_var = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

const NewNoteContainer = ({newNote, important, newNoteState, importantState, addNewNote}) => {
  

  return (
    <div className='new-note-container'>
      <form onSubmit={(e) => addNewNote(e)}>
        <input type='text' value={newNote} onChange={(e) => newNoteState(e.target.value)}></input>
        <br></br>
        <label for='important-input'>important</label>
        <input type='checkbox' name = 'important-input' checked={important} onChange={(e) => importantState(e.target.checked)}></input>
        <br></br>
        <input type='submit'></input>
      </form>
    </div>
  )
}

const Note = ({note, updateNote, deleteNote}) => {
  
  const [content, contentState] = useState(note.content);
  const [important, importantState] = useState(note.important);
  const id = note.id;
  const originalContent = note.content;
  const originalImportantState = note.important;

  return (
    <div id={id} className='note-container'>
      <input type='text' value={content} onChange={(e) => contentState(e.target.value)}></input>
      <br></br> 
      <input type='checkbox' name={`${id}-important`} checked={important} onChange={(e) => importantState(e.target.checked)}></input>
      <label for={`${id}-important`}>important</label>
      <br></br>
      <button disabled={content === originalContent && important === originalImportantState} onClick={() => updateNote(id, content, important)}>Save Changes</button>
      <br></br>
      <button onClick={() => deleteNote(id)}>Delete</button>
    </div>
  )

}

const NotesContainer = ({notes, updateNote, deleteNote}) => {
  return (
    <div className='notes-container'>
      {
        notes.map((note) => 
          {
            return <Note note={note} updateNote = {updateNote} deleteNote = {deleteNote}></Note>
          }
        )
      }
    </div>
  );
}

const generateID = (notes) => {
  if(!notes){
    return 1
  }
  const maxID = Math.max(...notes.map(note => note.id))
  return maxID + 1
}

function App() {
  const [notes, notesState] = useState(notes_var);
  const [newNote, newNoteState] = useState("");
  const [important, importantState] = useState(false);

  const addNewNote = (e) => {
    e.preventDefault()
    const noteObj = {
      content : newNote,
      important: important,
      id : generateID(notes)
    }

    notesState(notes=> notes.concat(noteObj));
    newNoteState("");
    importantState(false);
  
  }

  const updateNote = (id, newContent, newImportant) => {
    const noteObj = {
      content : newContent,
      important: newImportant,
      id : id
    }

    notesState(notes => notes.map(note => note.id === id ? noteObj : note))

  }

  const deleteNote = (id) => {
    notesState(notes => notes.filter(note => note.id !== id))
  }

  return (
    <div className="App">
      <header className="App-header">
        <NewNoteContainer newNote={newNote} important={important} newNoteState={newNoteState} importantState={importantState} addNewNote={addNewNote} ></NewNoteContainer>
        <NotesContainer notes = {notes} updateNote={updateNote} deleteNote={deleteNote}></NotesContainer>
      </header>
    </div>
  );
}

export default App;
