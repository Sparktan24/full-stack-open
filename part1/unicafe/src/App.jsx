import { useState } from 'react';

function Button({ text, handleClick }) {
  return <button onClick={handleClick}>{text}</button>;
}

function Statistics({ values }) {
  return (
    <div>
      <StatisticLine value={values.good} text="Good" />
      <StatisticLine value={values.neutral} text="Neutral" />
      <StatisticLine value={values.bad} text="Bad" />
      <StatisticLine value={values.total} text="All" />
      <StatisticLine value={values.average} text="Average" />
      <StatisticLine value={values.positive} text="Positive %" />
    </div>
  );
}

function StatisticLine({ value, text }) {
  return (
    <p>
      {text} {value}
    </p>
  );
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
      {good || neutral || bad ? (
        <Statistics values={{ good, neutral, bad, total, average, positive }} />
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
}

export default App;
