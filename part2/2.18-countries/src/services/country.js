import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}all`).then((res) => res.data);
  return request;
};

export default { getAllCountries };
