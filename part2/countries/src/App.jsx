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

  return (
    <>    
    </>
  )
}

export default App
