import React, { useState } from 'react'

const Button = (props) => {
  return (
      <button onClick={props.handleClick}>{props.name}</button>
  )
}

const Statistics = (props) => {
  const sum = props.good + props.neutral + props.bad
  const average = (sum === 0) ? 0 : (props.good - props.bad) / sum;
  const positive = (sum === 0) ? 0 : (props.good / sum) * 100
  
  if (sum === 0) return ( <div><h1>statistics</h1>No feedback given</div> )
  return (
    <div>
     <h1>statistics</h1>
     <table><tbody>
      <StatisticsLine text="good" value={props.good}/>
      <StatisticsLine text="neutral" value={props.neutral}/>
      <StatisticsLine text="bad" value={props.bad}/>
      <StatisticsLine text="all" value={sum}/>
      <StatisticsLine text="average" value={average}/>
      <StatisticsLine text="positive" value={positive + '%'}/>
      </tbody></table>
    </div>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td> {text}: </td>
      <td> {value} </td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //an event handler must be a function, trying to use code directly causes infinite recursion
  const handleSetGood = () => { setGood(good + 1) }
  const handleSetNeutral = () => { setNeutral(neutral + 1) }
  const handleSetBad = () => { setBad(bad + 1) }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleSetGood} name="good"/>
      <Button handleClick={handleSetNeutral} name="neutral"/>
      <Button handleClick={handleSetBad} name="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App