import Person from './Person';

function Persons({ persons, handleDelete }) {
  return (
    <div>
      {persons.map((person, i) => (
        <div key={i}>
          <Person name={person.name} number={person.number} />
          <button onClick={() => handleDelete(person.id, person.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Persons;
