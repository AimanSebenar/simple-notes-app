import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
// State to hold our list of notes
  const [notes, setNotes] = useState([]);
  
  // State to hold the form input values
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // The URL of your local backend
  const API_URL = 'http://localhost:3000/notes';

  // 1. READ: Fetch notes when the component first loads
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // 2. CREATE: Add a new note
  const handleAddNote = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing on submit

    if (!newTitle || !newContent) {
      alert("Please provide both a title and content!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });

      if (response.ok) {
        const addedNote = await response.json();
        // Update the state with the new note so the UI updates instantly
        setNotes([...notes, addedNote]);
        // Clear the form
        setNewTitle('');
        setNewContent('');
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // 3. DELETE: Remove a note by ID
  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Filter out the deleted note from the current state
        setNotes(notes.filter(note => note.id !== id));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="App">
      <h1>My Notes App</h1>

      {/* Form to add a new note */}
      <form onSubmit={handleAddNote} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Note Title" 
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ display: 'block', margin: '10px 0', padding: '8px' }}
        />
        <textarea 
          placeholder="Note Content" 
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '200px', height: '80px' }}
        />
        <button type="submit">Add Note</button>
      </form>

      {/* Display the list of notes */}
      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes yet. Add one above!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleDeleteNote(note.id)} style={{ color: 'red' }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;