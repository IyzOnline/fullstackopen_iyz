import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const responseHandler = response => response.data

const getAll = () => {
    return axios.get(baseUrl).then(responseHandler)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(responseHandler)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(responseHandler)
}
 
export default {
    getAll,
    create,
    update
}