import React from "react";

const Part = ({ part }) => (
  <h5>
    <b>{part.name}</b> - {part.exercises} exercises
  </h5>
);

export default Part;
