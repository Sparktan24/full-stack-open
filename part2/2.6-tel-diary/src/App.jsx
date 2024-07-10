import { useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const isRepeatedPerson = persons.find((person) => person.name === newName);
    if (isRepeatedPerson) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setNewName('');
      setNewNumber('');
      setPersons(persons.concat(personObject));
    }
  };

  const handleFilterOnName = (e) => {
    const filterName = e.target.value.toLowerCase();
    const filteredPersons = persons.filter((person) => {
      return person.name.toLowerCase().includes(filterName);
    });
    filterName ? setFilteredPersons(filteredPersons) : setFilteredPersons([]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleFilterOnName={handleFilterOnName}
        filteredPersons={filteredPersons}
      />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
}

export default App;
