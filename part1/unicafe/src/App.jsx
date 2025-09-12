import { useState } from 'react'

const Button = ({ onClick, text }) => {
  <button onClick={onClick}>
    {text}
  </button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      
    </div>
  )
}

export default App