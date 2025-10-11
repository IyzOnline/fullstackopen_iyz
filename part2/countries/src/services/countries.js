import axios from 'axios'
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/"

const getAllCountryNames = () => {
    return axios.
            get(`${baseURL}/all`)
            .then(response => response.data)
            .then(data => data.map(country => {
                return { 
                    name: country.name.common, 
                    key: country.ccn3
                }
            }
            ))
}

const getCountryData = (countryName) => {
    return axios.
        get(`${baseURL}/name/${countryName}`)
        .then(response => response.data)
        .then(country => {
            return {
                name: country.name.common, //string
                capital: country.capital, //array
                area: area, //number
                languages, //object
                flagPngSource: country.flags.png, //http source
            }
        })
}

export default { getAllCountryNames, getCountryData }