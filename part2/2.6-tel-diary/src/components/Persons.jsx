import Person from './Person';

function Persons({ persons }) {
  return (
    <div>
      {persons.map((person, i) => (
        <div key={i}>
          <Person name={person.name} number={person.number} />
        </div>
      ))}
    </div>
  );
}

export default Persons;
