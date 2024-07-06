import { useState } from 'react';

function Display({ score, text }) {
  return (
    <p>
      {text} {score}
    </p>
  );
}

function Button({ text, handleClick }) {
  return <button onClick={handleClick}>{text}</button>;
}
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total;
  const positive = (good * 100) / total;
  const setToValue = (e) => {
    const btnName = e.target.innerText;
    if (btnName === 'Good') setGood(good + 1);
    if (btnName === 'Neutral') setNeutral(neutral + 1);
    if (btnName === 'Bad') setBad(bad + 1);
  };

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={(e) => setToValue(e)} text="Good" />
      <Button handleClick={(e) => setToValue(e)} text="Neutral" />
      <Button handleClick={(e) => setToValue(e)} text="Bad" />

      <h1>Statistics</h1>
      <Display score={good} text="Good" />
      <Display score={neutral} text="Neutral" />
      <Display score={bad} text="Bad" />
      <Display score={total} text="All" />
      <p>Average {average}</p>
      <p>Positive {positive}%</p>
    </>
  );
}

export default App;
