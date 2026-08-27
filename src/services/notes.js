import axios from "axios";

const baseUrl = "/api/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  const nonExisting = {
    id: 1000,
    content: "This note does not exist",
    important: true,
  };
  return (await response.data).concat(nonExisting);
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = async (id, newObject) => {
  const newUrl = `${baseUrl}/${id}`;
  const response = await axios.put(newUrl, newObject);
  return response.data;
};

export default {
  getAll,
  create,
  update,
};
