import { useEffect, useState } from 'react'
import countryServices from './services/countries'

function App() {
  const [countryNames, setCountryNames] = useState(null);

  useEffect(() => {
    countryServices
      .getAllCountryNames()
      .then(resultingArray => setCountryNames(resultingArray))
  }, [])
  
  if (countryNames) {
    return (
      <ul>
        {countryNames.map(country => <h1>{country}</h1>)}
      </ul>
    )
  }

  return (
    <>    
    </>
  )
}

export default App
