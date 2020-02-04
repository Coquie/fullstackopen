import React, { useState } from "react";
import ReactDOM from "react-dom";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const votesCopy = [...votes];

  const updateVotes = () => {
    votesCopy[selected] = votesCopy[selected] + 1;
    setVotes(votesCopy);
  };

  const maxVote = Math.max(...votesCopy);
  const indexMax = anecdotes.findIndex((anecdote, index) => votesCopy[index] == maxVote);

  return (
    <div>
        <h2>Anecdote of the day</h2>
      <h4>
        {anecdotes[selected]}: {votesCopy[selected]} votes
      </h4>
      <div>
        <button onClick={() => setSelected(getRandomInt(anecdotes.length))}>
          Next
        </button>
        <button onClick={updateVotes}>Vote</button>
      </div>
      <h2>Most voted anecdote</h2>
      <h4>
          {anecdotes[indexMax]}
      </h4>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
