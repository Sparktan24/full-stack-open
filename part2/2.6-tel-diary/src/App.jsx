import { useState } from 'react';

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
      //console.log(person.name, e.target.value);
      return person.name.toLowerCase().includes(filterName);
    });
    filterName ? setFilteredPersons(filteredPersons) : setFilteredPersons([]);
    console.log(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilterOnName} />
      </div>
      <div>
        {filteredPersons.map((person, i) => (
          <div key={i}>{person.name}</div>
        ))}
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person, i) => (
        <div key={i}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
}

export default App;
