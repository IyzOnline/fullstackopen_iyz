import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/"


const getAllCountryNames = () => {
    return axios.
            get(`${baseURL}/all`)
            .then(response => response.data)
            .then(data => data.map(country => {
                return { 
                    name: country.name.common, 
                    key: country.ccn3 ? country.ccn3 : country.cca3 
                }
            }
            ))
}

const getCountryData = (countryName) => {
    return axios
        .get(`${baseURL}/name/${countryName}`)
        .then(response => response.data)
        .then(country => {
            const countryData = {
                name: country.name.common, //string
                capital: country.capital, //array
                area: country.area,
                languages: country.languages, //object
                flagPngSource: country.flags.png, //http source
            }
            return axios
                    .get(`https://api.openweathermap.org/data/2.5/forecast?q=${country.capital}&appid=${api_key}`)
                    .then(response => response.data.list[0])
                    .then((latestInfo) => {
                        return {
                            ...countryData,
                            temperature: (latestInfo.main.temp - 273.15).toFixed(2),
                            weatherIcon: `https://openweathermap.org/img/wn/${latestInfo.weather[0].icon}@2x.png`,
                            windSpeed: latestInfo.wind.speed,
                        }    
                    })
        })
        .catch((error) => console.log(error))
}


export default { getAllCountryNames, getCountryData }
