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
  return (
    <div>
      <Part part={props.part[0].name} exercises={props.part[0].exercises} />
      <Part part={props.part[1].name} exercises={props.part[1].exercises} />
      <Part part={props.part[2].name} exercises={props.part[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.count[0].exercises + props.count[1].exercises + props.count[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'half stack application dev',
    parts: [
      {
        name: 'fundamentals of react',
        exercises: 20
      },
      {
        name: 'using props to pass data',
        exercises: 7
      },
      {
        name: 'state of a compement',
        exercises: 14
      }
    ]
    }

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts}/>
      <Total count={course.parts} />
    </div>
  )
}

export default App