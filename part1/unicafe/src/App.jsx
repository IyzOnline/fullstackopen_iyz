import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({ values }) => {
  const total = values.reduce((acc, cur) => acc + cur, 0)
  return (
    <div>
      <h1>Statistics</h1>
      <p>good {values[0]}</p>
      <p>neutral {values[1]}</p>
      <p>bad {values[2]}</p>
      <p>all {total}</p>
      <p>average {total / values.length}</p>
      <p>positive {values[0] / (total ? total : 1)} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodCount = () => setGood(good + 1)
  const handleNeutralCount = () => setNeutral(neutral + 1)
  const handleBadCount = () => setBad(bad + 1)

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGoodCount} text={"good"}/>
      <Button onClick={handleNeutralCount} text={"neutral"}/>
      <Button onClick={handleBadCount} text={"bad"}/>
      <Statistics values={[good, neutral, bad]}/>
    </>
  )
}

export default App