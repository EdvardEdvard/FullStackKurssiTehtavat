import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {                               // Fetch all persons from server 
  const request = axios.get(baseUrl)                 // Return the data from the response
  return request.then(response => response.data)     // Promise resolving to persons array
}

const create = (personObject) => {                   // Create a new person on the server             
  const request = axios.post(baseUrl, personObject)  // Return the data from the response
  return request.then(response => response.data)     // Promise resolving to created person object
}

const deleteResource = (id) => {                      // Delete a person by id from the server         
  const request = axios.delete(`${baseUrl}/${id}`)    // Return the data from the response
  return request.then(response => response.data)      // Promise resolving to deleted person object
}

const update = (id, newObject) => {                         // Update a person's details on the server                   
  const request = axios.put(`${baseUrl}/${id}`, newObject)  // Return the data from the response
  return request.then(response => response.data)            // Promise resolving to updated person object     
}

export default { getAll, create, deleteResource, update }


