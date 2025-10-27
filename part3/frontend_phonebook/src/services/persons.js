import axios from 'axios'
const baseURL = '/api/persons'

const getPersons = () => {
    return axios.get(baseURL).then(response => response.data)
}

const createPerson = newPerson => {
    return axios.post(baseURL, newPerson).then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`${baseURL}/${id}`).then(response => response.data)
}

const updatePerson = (id, editedPerson) => {
    return axios.put(`${baseURL}/${id}`, editedPerson)
        .then(response => {
            console.log(response)
            return response.data
        })
}

export default { getPersons, createPerson, deletePerson, updatePerson }