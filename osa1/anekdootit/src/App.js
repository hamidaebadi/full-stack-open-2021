import React, {useState} from 'react'
const Header = ({title}) =>{
  return(
    <>
    <h2>{title}</h2>
    </>
  )
}

const AnecdoteDisplay = ({text}) =>{
  return (
    <>
      <p>{text}</p>
    </>
  )
}

const VoteDisplay = ({votes}) =>{
  return(
    <>
    <p>has {votes} votes</p>
    </>
  )
}

const Button = (props) =>{
  return(
    <>
      <button onClick={props.clickHandler}>{props.text}</button>
    </>
  )
}

const App = () =>{
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))
  const [maxVote, setMaxVote] = useState(0)
  const selectAnecodte = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const voteAnecdote = () => {
    votes[selected]+= 1
    setVotes([...votes])
    setMaxVote(votes.indexOf(Math.max(...votes)))
    }

  return(
    <div>
      <Header title='Anecdote of the day' />
      <AnecdoteDisplay text={anecdotes[selected]}/>
      <VoteDisplay votes={votes[selected]} />
      <Button text='Vote' clickHandler={voteAnecdote}/>
      <Button text='Next anecdote' clickHandler={selectAnecodte} />
      <Header title='Anecdote with most votes' />
      <AnecdoteDisplay text={anecdotes[maxVote]} />
      <VoteDisplay votes={votes[maxVote]} />
    </div>
  )
}

export default App