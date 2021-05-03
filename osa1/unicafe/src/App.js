import React, {useState} from 'react'
//header component
const Header = ({title}) =>{
  return(
    <>
      <h2>{title}</h2>
    </>
  )
}

const Button = ({text, clickHandler}) => {
  return(
    <>
      <button onClick={clickHandler}>{text}</button>
    </>
  )
}
const StatisticLine = (props) => {
  return(
    <>
    <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  )
}
const Statistics = (props)=> {
  if (props.data.all === 0){
    return(
      <>
      <p>No feedback given</p>
      </>
    )
  }
  return(
    <>
    <table>
      <tbody>
        <StatisticLine text='Good' value={props.data.good}/>
        <StatisticLine text='Neutral' value={props.data.neutral}/>
        <StatisticLine text='Bad' value={props.data.bad}/>
        <StatisticLine text='All' value={props.data.all}/>
        <StatisticLine text='Average' value={props.data.state.average}/>
        <StatisticLine text='Positive' value={props.data.state.positive}/>
      </tbody>
    </table>
    </>
  )
}

const App = () =>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

const feedback = (option) =>{
  switch(option){
    case 'good':
      return goodFeedback
    case 'neutral':
      return neutralFeedback
    case 'bad':
      return badFeedback
    default:
      return
  }
}
const goodFeedback = () =>{
  setGood(good+1)
  setAll(all.concat(1))
  setAverage(((good+1)-bad)/(all.length+1))
  setPositive((good+1)/(all.length+1)*100)
}
const neutralFeedback = () =>{
  setNeutral(neutral+1)
  setAll(all.concat(0))
  setAverage((good-bad)/(all.length+1))
  setPositive(good/(all.length+11)*100)
}

const badFeedback = () =>{
  setBad(bad+1)
  setAll(all.concat(-1))
  setAverage((good-(bad+1))/(all.length+1))
  setPositive((good/(all.length+1))*100)
}


  const data = {
    'good': good,
    'neutral': neutral,
    'bad': bad,
    'all' : all.length,
    'state': {
      'average': average,
      'positive': positive
    }
  }
  return(
    <div>
      <Header title='Give Feedback'/>
      <Button text='Good' clickHandler={feedback('good')}/>
      <Button text='Neutral' clickHandler={feedback('neutral')}/>
      <Button text='Bad' clickHandler={feedback('bad')}/>
      <Header title='Statistics' />
      <Statistics data={data}/>
    </div>
  )
}

export default App;
