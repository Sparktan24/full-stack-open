import { useEffect, useState } from 'react';
import countryService from './services/country';
import Country from './components/Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [notification, setNotification] = useState(null);
  const [CurrentShownCountry, setCurrentShownCountry] = useState(null);

  useEffect(() => {
    countryService.getAllCountries().then((country) => setCountries(country));
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
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
      setCurrentShownCountry(null);
      setNotification(null);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const showCountryHandler = (country) => {
    CurrentShownCountry?.ccn3 === country.ccn3
      ? setCurrentShownCountry(null)
      : setCurrentShownCountry(country);
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
              <button onClick={() => showCountryHandler(country)}>
                {CurrentShownCountry?.ccn3 === country.ccn3 ? 'Hide' : 'Show'}
              </button>
            </div>
          ))}
      <div>
        {CurrentShownCountry && <Country country={CurrentShownCountry} />}
      </div>
    </>
  );
}

export default App;
