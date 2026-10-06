import axios from 'axios'

const baseUrl = '/api/notes'

const extractToken = () => {
  const userJSON = window.localStorage.getItem('loggedInUser')
  const userObj = JSON.parse(userJSON)
  const token = `Bearer ${userObj.token}`
  return token
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = { headers: { Authorization: extractToken() } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const newUrl = `${baseUrl}/${id}`
  const config = { headers: { Authorization: extractToken() } }
  console.log(config)
  const response = await axios.put(newUrl, newObject, config)
  return response.data
}

const remove = async (id) => {
  const newUrl = `${baseUrl}/${id}`
  const config = { headers: { Authorization: extractToken() } }
  await axios.delete(newUrl, config)
}

export default {
  getAll,
  create,
  update,
  remove,
}
