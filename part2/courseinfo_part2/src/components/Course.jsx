const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <p><b>total of {course.parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercises</b></p>
    </div>
  )
}

export default Courses