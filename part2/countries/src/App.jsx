import { useEffect, useState } from 'react'
import countryServices from './services/countries'

function App() {
  const [countryNames, setCountryNames] = useState(null)
  const [inputCountry, setInputCountry] = useState(null)
  const [countryResults, setCountryResults] = useState(null)

  useEffect(() => {
    if (countryNames === null) {
      countryServices
      .getAllCountryNames()
      .then(resultingArray => {
        console.log(resultingArray)
        setCountryNames(resultingArray)
      })
    }
  }, [])

  const filterResults = (inputFilter) => {
    let filterResult = countryNames.filter(country => country.name.toLowerCase().includes(inputFilter))
    if (filterResult.length > 10) {
      setCountryResults("Too many matches, specify another filter")
      return
    } 
    else if (filterResult.length > 1) {
      const singleResultFilter = filterResult.filter(country => country.name.toLowerCase() === inputFilter)
      if (singleResultFilter.length === 1) {
        setCountryResults(singleResultFilter)
        return
      }
      setCountryResults(filterResult)
    }
  }

  const displayResults = () => {
    if (countryResults) {
      if(Array.isArray(countryResults)){
        if (countryResults.length === 1) {
          return displaySingleResult(countryResults[0].name)
        } else {
          return countryResults.map(country => <p key={country.key}>{country.name}</p>)
        }
      }
      else {
        return <p>{countryResults}</p> 
      }
    } else {
      return null
    }
  }

  const displaySingleResult = (name) => {
    countryServices
      .getCountryData(name)
      .then(country => {
        return (
          <>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <ul>
              Languages 
              {country.languages.map(language => <li>{language}</li>)}
            </ul>
            <img src={country.flagPngSource} />
          </>
        )
      })
      
  }

  const handleChange = (event) => {
    setInputCountry(event.target.value)
    const lowerCaseTrimmedFilter = event.target.value.toLowerCase().trim()
    if (!lowerCaseTrimmedFilter) {
      setCountryResults(null)
      return
    }

    filterResults(lowerCaseTrimmedFilter)
  }
  
  if (countryNames) {
    return (
      <>
        <p>find countries</p>
        <input 
          value={inputCountry ? inputCountry : ""}
          onChange={handleChange}
        />
        { displayResults() }
      </>
    )
  }

  return (
    <>    
    </>
  )
}

export default App
