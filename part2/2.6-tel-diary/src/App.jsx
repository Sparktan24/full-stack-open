import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/person';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((personsRes) => setPersons(personsRes));
    /* axios.get('http://localhost:3001/persons').then((res) => {
      setPersons(res.data);
    }); */
  }, []);

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
    } else if (!newName || !newNumber) {
      alert('Name and number should contain data');
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((newPerson) => {
        setNewName('');
        setNewNumber('');
        setPersons(persons.concat(newPerson));
      });
      /* console.log('enters');
      console.log(personObject);
      setNewName('');
      setNewNumber('');
      setPersons(persons.concat(personObject)); */
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
