import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// The  Authorization: <type> <credentials> pattern was introduced by the W3C in HTTP 1.0, and has been reused in many places since //
// Many web servers support multiple methods of authorization. In those cases sending just the token isn't sufficient. //
// Bearer distinguishes the type of Authorization you're using, so it's important //

const setToken = newToken => {
  token = `bearer ${newToken}`
}

// Get all blogs
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// Create a new blog
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// Update a blog information
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

// Remove blog
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response.status
}

export default { getAll, create, update, setToken, remove }