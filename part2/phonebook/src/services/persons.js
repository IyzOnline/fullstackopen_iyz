import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getPersons = () => {
    return axios.get(baseURL).then(response => response.data)
}

const createPerson = newPerson => {
    return axios.post(baseURL, newPerson).then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`${baseURL}/${id}`).then(response => response.data)
}

export default { getPersons, createPerson, deletePerson }