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
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data;
  })
}

// Create a new blog 
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config) 
  return response.data
}

// Update a blong information
const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }