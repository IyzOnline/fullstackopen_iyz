import axios from 'axios'
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAllCountryNames = () => {
    return axios.get(baseURL).then(response => response.data).then(data => data.map(country => country.name.common))
}

export default { getAllCountryNames }