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

export default Country;
