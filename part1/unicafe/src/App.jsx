import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Button onClick={handleGoodCount} text={"good"}/>
      <Button onClick={handleNeutralCount} text={"neutral"}/>
      <Button onClick={handleBadCount} text={"bad"}/>
    </>
  )
}

export default App