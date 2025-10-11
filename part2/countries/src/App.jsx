import { useEffect, useState } from 'react'
import countryServices from './services/countries'

function App() {
  const [countryNames, setCountryNames] = useState(null)
  const [inputCountry, setInputCountry] = useState(null)
  const [countryResults, setCountryResults] = useState(null)
  const [specificCountry, setSpecificCountry] = useState(null)

  useEffect(() => {
    if (countryNames === null) {
      countryServices
      .getAllCountryNames()
      .then(resultingArray => {
        setCountryNames(resultingArray)
      })
    }
    if (countryResults) {
      if (countryResults.length === 1) {
        countryServices
          .getCountryData(countryResults[0].name)
          .then(response => setSpecificCountry(response))
      }
    }
  }, [countryResults])

  const filterResults = (inputFilter) => {
    let filterResult = countryNames.filter(country => country.name.toLowerCase().includes(inputFilter))
    if (filterResult.length > 10) {
      setCountryResults("Too many matches, specify another filter")
    } 
    else if (filterResult.length >= 1) {
      const singleResultFilter = filterResult.filter(country => country.name.toLowerCase() === inputFilter)
      if (singleResultFilter.length === 1) {
        setCountryResults(singleResultFilter)
        return
      }
      setCountryResults(filterResult)
    }
    else {
      setCountryResults(null)
    }
    
    setSpecificCountry(null)
  }

  const displayResults = () => {
    if (countryResults) {
      if (Array.isArray(countryResults)) {
          return countryResults.map(country => <p key={country.key}>{country.name}</p>)
      }
      else {
        return <p>{countryResults}</p> 
      }
    } else {
      return null
    }
  }

  const handleChange = (event) => {
    setInputCountry(event.target.value)
    const lowerCaseTrimmedFilter = event.target.value.toLowerCase().trim()
    if (!lowerCaseTrimmedFilter) {
      setCountryResults(null)
      setSpecificCountry(null)
      return
    }

    filterResults(lowerCaseTrimmedFilter)
  }

  const displaySpecificCountry = () => {
    return (
      <>
        <h1>{specificCountry.name}</h1>
        <p>Capital {specificCountry.capital}</p>
        <p>Area {specificCountry.area}</p>
        <h2>Languages</h2>
        <ul> 
          {Object.values(specificCountry.languages).map((language, index) => <li key={index}>{language}</li>)}
        </ul>
        <img src={specificCountry.flagPngSource} />
      </>
    )
  }
  
  if (countryNames) {
    return (
      <>
        <p>find countries</p>
        <input 
          value={inputCountry ? inputCountry : ""}
          onChange={handleChange}
        />
        { specificCountry ? displaySpecificCountry() : displayResults() }
      </>
    )
  }

  return (
    <>    
    </>
  )
}

export default App
