const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.partsArr[0][0]} exercises={props.partsArr[0][1]}/>
      <Part part={props.partsArr[1][0]} exercises={props.partsArr[1][1]}/>
      <Part part={props.partsArr[2][0]} exercises={props.partsArr[2][1]}/>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const partsArr = [['Fundamentals of React', 10], ['Using props to pass data', 7], ['State of a component', 14]];
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content partsArr={partsArr} />
      <Total total={partsArr[0][1] + partsArr[1][1] + partsArr[2][1]}/>
    </div>
  )
}

export default App