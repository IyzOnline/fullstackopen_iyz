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
    } 
    else if (filterResult.length > 1) {
      const singleResultFilter = filterResult.filter(country => country.name.toLowerCase() === inputFilter)
      if (singleResultFilter.length === 1) filterResult = singleResultFilter
      setCountryResults(filterResult)
    }
    else if (filterResult.length === 1) {
      setCountryResults([filterResult[0]])
    }
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
        { countryResults 
          ? Array.isArray(countryResults) ? countryResults.map(country => <p key={country.key}>{country.name}</p>) : <p>{countryResults}</p> 
          : null }
      </>
    )
  }

  return (
    <>    
    </>
  )
}

export default App
