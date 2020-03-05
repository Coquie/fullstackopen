import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Components/Filter";
import Form from "./Components/Form";
import Persons from "./Components/Persons";
import personService from "./Services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data));
  }, []);

  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleFilterChange = event => setFilter(event.target.value);

  const addPerson = event => {
    event.preventDefault();
    if (newName && newNumber) {
      if (persons.find(person => person.name === newName)) {
        window.alert(`${newName} is already in the phonebook`);
      } else {
        const newPerson = {
          name: newName,
          number: newNumber
        };
        personService.create(newPerson).then(personResponse => {
          setPersons(persons.concat(personResponse));
          setNewName("");
          setNewNumber("");
        });
      }
    }
  };

  const deletePerson = ({ name, id }) => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          let personsNew = persons.slice();
          let indexToDelete = personsNew.findIndex(person => person.id === id);
          personsNew.splice(indexToDelete, 1);
          setPersons(personsNew);
        });
    }
  };

  return (
    <div style={{ margin: "2rem", padding: "1rem", border: "1px solid gray" }}>
      <h2>Phonebook</h2>
      <Form
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <div>
        <h2>Numbers</h2>
        <Filter handleFilterChange={handleFilterChange} filter={filter} />
      </div>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
