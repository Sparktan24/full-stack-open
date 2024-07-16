function PersonForm({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" style={{ background: '#abfcab' }}>
          add
        </button>
      </div>
    </form>
  );
}

export default PersonForm;
