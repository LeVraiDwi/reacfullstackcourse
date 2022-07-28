import { useState } from 'react'

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

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Tab = (props) => {
  let all = props.good + props.neutral + props.bad
  if (props.good || props.neutral || props.bad) {
    return (
      <table>
        <tbody>
          <StatisticsLine text='good' value={props.good}/>
          <StatisticsLine text='neutral' value={props.neutral}/>
          <StatisticsLine text='bad' value={props.bad}/>
          <StatisticsLine text='all' value={props.good + props.neutral + props.bad}/>
          <StatisticsLine text='average' value={(props.good - props.bad) / all}/>
          <StatisticsLine text='positive' value={(props.good / all) * 100 + ' %'} />
        </tbody>
      </table>
    )
  }
  else {
    return (
      <p>No feedback given</p>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.eventhandle}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  return (
    <div>
      <div>
        <Header course='Give feedback' />
        <Button eventhandle={ () => setGood(good + 1) } text='good'/>
        <Button eventhandle={ () => setNeutral(neutral + 1) } text='neutral'/>
        <Button eventhandle={ () => setBad(bad + 1) } text='bad'/>
      </div>
      <div>
        <Header course='Statistics'/>
        <Tab good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App