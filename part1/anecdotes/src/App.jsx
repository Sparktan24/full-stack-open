import { useState } from 'react';

function App() {
  const [selected, setSelected] = useState(0);
  const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  const [votes, setVotes] = useState(points);
  const [mostVoted, setMostVoted] = useState('');
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const handleClick = () => {
    const randomGenerator = Math.floor(anecdotes.length * Math.random());
    setSelected(randomGenerator);
  };

  const handleVote = () => {
    const newVotes = { ...votes };
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const hasMostVotes = () => {
    const newVotes = { ...votes };
    //console.log(newVotes.length);
    let max = 0;
    let index = 0;
    for (const element in newVotes) {
      let aux = newVotes[element];
      if (max < aux) {
        max = aux;
        index = parseInt(element);
      }
      //console.log(`${element}: ${newVotes[element]}`);
    }
    setMostVoted(anecdotes[index]);
    console.log(anecdotes[index]);
    //console.log('index', index);
    //console.log('max', max);
    //console.log(newVotes[index]);
    //console.log(newVotes[max]);
    console.log(newVotes);
    //newVotes.sort((a, b) => b - a);
    //console.log(newVotes);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <p>Has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      {/* {console.log(votes)} */}
      <button onClick={handleClick}>Next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <button onClick={hasMostVotes}>Show most voted</button>
      {mostVoted}
    </>
  );
}

export default App;
