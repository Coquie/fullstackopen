import React from "react";

const Persons = ({ persons, filter, deletePerson }) => {
  return persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => (
      <div key={person.id} style={{display: "flex", alignItems: "center"}}>
        <h4 style={{paddingRight: "0.5rem"}}>
          {person.name}: {person.number}
        </h4>
        <button onClick={() => deletePerson(person)}>delete</button>
      </div>
    ));
};

export default Persons;
