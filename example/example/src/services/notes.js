import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

const getAll = () => {
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  };
  const request = axios
    .get(baseUrl)
    .then((res) => res.data.concat(nonExisting));

  //return request.then(response => response.data)
  /* console.log(
    axios
      .get(baseUrl)
      .then((res) => res.data)
      .then((notes) => console.log(notes)),
  ); */
  //return axios.get(baseUrl).then((res) => res.data);
  return request;
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => res.data);
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const res = await request;
  return res.data;
};

export default { getAll, create, update };
