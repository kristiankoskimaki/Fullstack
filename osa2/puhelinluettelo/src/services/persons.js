import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deleteEntry = idToDelete => {
    return axios.delete(baseUrl + '/' + idToDelete)
}

const updateNumber = (idToUpdate, newObject) => {
    return axios.put(baseUrl + '/' + idToUpdate, newObject)
}

export default { getAll, create, deleteEntry, updateNumber }