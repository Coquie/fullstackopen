import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState();

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data));
  }, []);

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const getDetail = country => (
    <>
      <h2>{country.name}</h2>
      <h4>Capital city: {country.capital}</h4>
      <h4>Population: {country.population}</h4>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} height="150" alt="flag" />
    </>
  );

  const listCountries = () => {
    if (search) {
      let list = countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
      );
      if (list.length > 10) return "Too many countries";
      else if (list.length > 1) {
        return (
          <ul>
            {list.map((country, i) => (
              <li style={{ margin: "0.5rem" }} key={country.alpha3Code}>
                {country.name}{" "}
                <button onClick={() => setDetail(getDetail(country))}>
                  show
                </button>
              </li>
            ))}
          </ul>
        );
      } else if (list.length === 1) {
        return getDetail(list[0]);
      } else return "No such country";
    }
  };

  return (
    <div>
      find countries: <input value={search} onChange={handleSearch} />
      <div>{listCountries()}</div>
      {detail}
    </div>
  );
};

export default App;
