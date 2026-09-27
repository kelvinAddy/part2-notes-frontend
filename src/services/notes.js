import axios from 'axios';

const baseUrl = '/api/notes';
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const newUrl = `${baseUrl}/${id}`;
  const response = await axios.put(newUrl, newObject);
  return response.data;
};

const remove = async (id) => {
  const newUrl = `${baseUrl}/${id}`;
  axios.delete(newUrl);
};

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
};
