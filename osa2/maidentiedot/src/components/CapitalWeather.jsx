// CapitalWeather.jsx
const CapitalWeather = ({ weather, capital }) => {
  if (!weather) return <p>Loading weather...</p>;

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default CapitalWeather;
