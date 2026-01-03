import CountryInfo from "./CountryInfo";

const CountriesList = ({ countries, filter, setSelected}) => {

  if (!countries) return null;
  if (!filter) return <div>Type something to filter countries</div>;
  if (countries.length === 0) return <div>No countries found</div>;
  if (countries.length > 10) return <div>Too many matches</div>;
  if (countries.length === 1) return <CountryInfo country={countries[0]} />;


  return (
    <div>
        {countries.map((country, index) => (
          <li key={index}>
            {country.name.common}
            <button onClick={() => setSelected(country)}>Show</button>
          </li>
        ))}
    </div>
  );
};

export default CountriesList;
