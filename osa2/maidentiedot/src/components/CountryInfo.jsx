import CapitalWeather from "./CapitalWeather";

const CountryInfo = ({ country, weather }) => {
  if (!country) return null; 

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>{country.capital[0]}<br />{country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((lang, i) => <li key={i}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <CapitalWeather weather={weather} capital={country.capital[0]} />
    </div>
  );
};




export default CountryInfo;