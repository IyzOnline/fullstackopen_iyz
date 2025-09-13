import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ values }) => {
  const total = values.reduce((acc, cur) => acc + cur, 0)
  return (
      <div>
        <h1>Statistics</h1>
        {
          total === 0 ? (
            <p>No feedback</p>
          ) : (
            <>
              <StatisticLine text={"good"} value={values[0]}/>
              <StatisticLine text={"neutral"} value={values[1]}/>
              <StatisticLine text={"bad"} value={values[2]}/>
              <StatisticLine text={"all"} value={total}/>
              <StatisticLine text={"average"} value={total / values.length}/>
              <StatisticLine text={"positive"} value={values[0] / (total ? total : 1)}/>
            </>
          )
        }
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