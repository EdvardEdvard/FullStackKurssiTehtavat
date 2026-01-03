import axios from "axios";

const COUNTRIES_API_BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () =>
  axios.get(`${COUNTRIES_API_BASE_URL}/all`)
    .then((response) => response.data);

export default getAllCountries;