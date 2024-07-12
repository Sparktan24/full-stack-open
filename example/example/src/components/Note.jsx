function Note({ note, toggleImportance }) {
  const label = note.important ? 'make it not important' : 'make important';
  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
}

export default Note;
