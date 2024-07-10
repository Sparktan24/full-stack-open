function Filter({ handleFilterOnName, filteredPersons }) {
  return (
    <div>
      filter shown with <input onChange={handleFilterOnName} />
      <div>
        {filteredPersons.map((person, i) => (
          <div key={i}>{person.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
