import { useEffect, useState } from 'react'
import getAllCountries from './services/countries.jsx'
import CountriesList from './components/CountriesList.jsx'
import Filter from './components/Filter.jsx'
import CountryInfo from './components/CountryInfo.jsx'
import getCapitalWeather from './services/weather.jsx'


//handlerit tässä
const handleChange = (event, setter, resetSelected) => (setter(event.target.value), resetSelected?.(null));

//funktiot tässä
const getFilteredCountries = (countries, value) => countries.filter(c => c.name.common.toLowerCase().includes(value.toLowerCase()))


function App() {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [weather, setWeather] = useState(null);

  const filteredCountries = getFilteredCountries(countries, filter)

    useEffect(() => {
      getAllCountries().then(data => setCountries(data));
    }, []);

    
    useEffect(() => {
      if (!selected?.capitalInfo?.latlng) return;

      const [lat, lon] = selected.capitalInfo.latlng;

      getCapitalWeather(lat, lon)
        .then(data => setWeather(data))
    }, [selected]);

  return (
    <div>
      <Filter filter={filter} handleFilterChange={(event) => handleChange(event, setFilter, setSelected)} />  
      <CountryInfo country={selected} weather={weather} /> {/* Render CountryInfo when selected has a value. Otherwise (null). */}
      <CountriesList countries={filteredCountries} filter={filter} setSelected={setSelected}/>
    </div>
  );
}


export default App
