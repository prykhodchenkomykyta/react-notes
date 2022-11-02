import React from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NoteList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const [notes, setNotes] = React.useState([
  {
    id: nanoid(),
    text: 'This is my first note', 
    date: '30/10/2022',
  },
  {
    id: nanoid(),
    text: 'This is my second note',
    date: '13/07/2022',
  },
  {
    id: nanoid(),
    text: 'This is my third note',
    date: '19/01/2022',
  },
    {
    id: nanoid(),
    text: 'This is my fourth note',
    date: '09/00/2022',
  },
  ]);

  const [searchText, setSearchText] = React.useState('');

  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );

    if(savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data', 
      JSON.stringify(notes)
    );
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

    const deleteNote = (id) => {
      const newNotes = notes.filter((note) => note.id !== id);
      setNotes(newNotes);
    };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
        <Header handleToggleDarkMode={ setDarkMode } />
        <Search handleSearchNote={ setSearchText } />
        <NotesList 
          notes={ notes.filter((note) => 
            note.text.toLowerCase().includes(searchText.toLowerCase()))} 
          handleAddNote={ addNote } 
          handleDeleteNote={ deleteNote }
        />
      </div>
    </div>
  )
}

export default App;