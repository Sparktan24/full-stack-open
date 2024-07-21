import { useEffect, useState } from 'react';
import countryService from './services/country';

function Country({ country }) {
  return (
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
  );
}
function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [showCountry, setShowCountry] = useState(null);
  const [singleCountry, setSingleCountry] = useState([]);
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
      setShowButton(true);
      setFilteredCountries(filterCountry);
      setNotification(null);
    } else {
      setFilteredCountries(filterCountry);
      //setShowButton(false);
      setShowCountry(null);
      setSingleCountry([]);
      setNotification(null);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const showCountryHandler = (e, country) => {
    if (singleCountry.ccn3 === country.ccn3 && showCountry) {
      setShowCountry(null);
    } else {
      setShowCountry(country.ccn3);
      setSingleCountry(country);
    }
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
            <Country key={country.ccn3} country={country} />
          ))
        : filteredCountries.map((country) => (
            <div key={country.ccn3}>
              {country.name.common}
              {showButton && (
                <button onClick={(e) => showCountryHandler(e, country)}>
                  {showCountry === country.ccn3 ? 'Hide' : 'Show'}
                </button>
              )}
            </div>
          ))}
      <div>{showCountry && <Country country={singleCountry} />}</div>
    </>
  );
}

export default App;
