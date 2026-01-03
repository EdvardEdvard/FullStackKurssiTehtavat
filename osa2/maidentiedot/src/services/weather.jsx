// services/weatherService.js
import axios from "axios";

const getCapitalWeather = (lat, lon) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
.then(res => res.data);
};

export default getCapitalWeather;
