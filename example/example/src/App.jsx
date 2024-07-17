import { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMesage] = useState('some error happened...');

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
    //axios.get('http://localhost:3001/notes').then((res) => setNotes(res.data));
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    //id: notes.length + 1, //server creates own id
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
    /* axios
      .post('http://localhost:3001/notes', noteObject)
      .then((res) => console.log(res));
    //setNotes(notes.concat(noteObject));
    axios.get('http://localhost:3001/notes').then((res) => {
      setNotes(res.data);
    });
    setNewNote(''); */
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMesage(
          `Note "${note.content}" was already removed from server`,
        );
        setTimeout(() => {
          setErrorMesage(null);
        }, 5000);

        setNotes(notes.filter((n) => n.id !== id));
      });
    /* axios.put(url, changeNote).then((res) => {
      setNotes(notes.map((note) => (note.id !== id ? note : res.data)));
    }); */
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
}

export default App;
