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

  const handleChange = (event) => {

  }
  
  if (countryNames) {
    return (
      <>
        <p>find countries</p>
        <input 
          value={inputCountry ? inputCountry : ""}
          onChange={handleChange}
        />
      </>
    )
  }

  return (
    <>    
    </>
  )
}

export default App
