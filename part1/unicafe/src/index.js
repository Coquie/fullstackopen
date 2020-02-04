import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const percentGood = (good / total) * 100;

  return (
    <table>
      <tbody>
        <Stats text="good" amount={good} />
        <Stats text="neutral" amount={neutral} />
        <Stats text="bad" amount={bad} />
        <Stats text="total" amount={total} />
        <Stats text="average" amount={Math.round(average * 100) / 100} />
        <Stats
          text="positive"
          amount={Math.round(percentGood * 100) / 100 + "%"}
        />
      </tbody>
    </table>
  );
};

const Stats = ({ text, amount }) => (
  <tr>
    <td>{text}</td>
    <td>{amount}</td>
  </tr>
);

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>Statistics</h2>
      {good || bad || neutral ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <h5>No feedback given</h5>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
