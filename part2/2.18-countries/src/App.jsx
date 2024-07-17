import { useEffect, useState } from 'react';
import countryService from './services/country';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [notification, setNotification] = useState(null);
  //const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
  useEffect(() => {
    countryService.getAllCountries().then((country) => setCountries(country));
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    console.log(query.toLowerCase());
    const filterCountryName = query.toLowerCase();
    const filterCountry = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filterCountryName),
    );
    if (filterCountry.length > 10) {
      setFilteredCountries([]);
      setNotification('too many matches, specify another filter');
    } else if (filterCountry.length <= 10 && filterCountry.length > 1) {
      setFilteredCountries(filterCountry);
      setNotification(null);
    } else {
      setFilteredCountries(filterCountry);
      setNotification(null);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <form onSubmit={onSearch}>
        <label htmlFor="countries-input">Find countries</label>
        <input
          value={query}
          onChange={handleInputChange}
          name="countries"
          id="countries-input"
        />
      </form>
      <div>{notification}</div>

      {filteredCountries.length === 1
        ? filteredCountries.map((country) => (
            <div key={country.ccn3}>
              <h1>{country.name.common}</h1>
              <p>Capital {country.capital}</p>
              <p>Area {country.area}Km2</p>
              <h2>Languages:</h2>
              <ul>
                {Object.values(country.languages).map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
              <img src={country.flags.png} alt={country.flags.alt} />
            </div>
          ))
        : filteredCountries.map((country) => (
            <div key={country.ccn3}>
              {country.name.common}
              {console.log(filteredCountries.length)}
            </div>
          ))}
    </>
  );
}

export default App;
