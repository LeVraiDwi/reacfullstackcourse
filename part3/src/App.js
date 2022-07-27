const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  const parts = props.part

  return (
    <div>
      {parts.map(parts =>
        <Part key={parts.id} part={parts.name} exercises={parts.exercises}/>
      )}
    </div>
  )
}

const Total = (props) => {
  const parts = props.parts
  return (
    <p>Number of exercises {parts.reduce((sum, parts) => sum + parts.exercises, 0)}</p>
  )
}

const Course = (props) => {
  const course = props.course
  return (
    <div>
      {course.map((course, i) =>
      <div key={i}>
        <Header course={course.name}/>
        <Content part={course.parts}/>
        <Total parts={course.parts}/>
      </div>
      )}
    </div>
  )
}

const App = () => {
  const course = [
    {
      id: 1,
      name: 'half stack application dev',
      parts: [
        {
          name: 'fundamentals of react',
          exercises: 20,
          id: 1
        },
        {
          name: 'using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'state of a compement',
          exercises: 14,
          id: 3
        }
      ],
    },
    {
      id: 2,
      name: 'mon cour qui est en plus',
      parts: [
        {
          name: 'top trop cool',
          exercises: 23,
          id: 1,
        },
        {
          name: 'wououhh',
          exercises: 22,
          id:2,
        },
      ],
    },
  ]

  return <Course course={course}/>
}

export default App