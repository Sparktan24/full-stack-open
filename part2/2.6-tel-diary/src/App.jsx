import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/person';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    personService.getAll().then((personsRes) => setPersons(personsRes));
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();

    const isRepeatedPersonObj = persons.find(
      (person) => person.name === newName,
    );
    const isSameNumber = persons.find((person) => person.number === newNumber);

    if (!newName || !newNumber) {
      alert('Name and number should contain data');
    } else if (isRepeatedPersonObj && isSameNumber) {
      alert(`${newName} is already added to phonebook with same number`);
    } else if (isRepeatedPersonObj && !isSameNumber) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        updatePerson(isRepeatedPersonObj);
        updateMessage(`Updated ${isRepeatedPersonObj.name}`);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((newPerson) => {
        setNewName('');
        setNewNumber('');
        setPersons(persons.concat(newPerson));
        updateMessage(`Added ${newPerson.name}`);
      });
    }
  };

  const updateMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
      setError(false);
    }, 5000);
  };

  const updatePerson = (isRepeatedPersonObj) => {
    const personObject = { ...isRepeatedPersonObj, number: newNumber };
    personService
      .updatePerson(personObject.id, personObject)
      .then((updatedPerson) => {
        setNewName('');
        setNewNumber('');
        setPersons(
          persons.map((person) =>
            person.id !== personObject.id ? person : updatedPerson,
          ),
        );
        //personService.getAll().then((personsRes) => setPersons(personsRes));
      })
      .catch(() => {
        setError(true);
        updateMessage(
          `${personObject.name} was already removed from the server`,
        );
        setPersons(persons.filter((person) => person.id !== personObject.id));
      });
  };

  const handleFilterOnName = (e) => {
    const filterName = e.target.value.toLowerCase();
    const filteredPersons = persons.filter((person) => {
      return person.name.toLowerCase().includes(filterName);
    });
    filterName ? setFilteredPersons(filteredPersons) : setFilteredPersons([]);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}`)) {
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} error={error} />
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
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
