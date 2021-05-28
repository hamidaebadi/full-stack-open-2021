import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'


const Anecdote = ({anecdote, handleVote}) => {
    return(
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleVote} value={anecdote.id}>vote</button>
          </div>
        </div>
      )}


const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const regex = new RegExp(state.filter, 'i')
    const filtered = state.filter.length === 0 ? state.anecdotes : state.anecdotes.filter(c => c.content.match(regex))
    return filtered
  })
  const dispatch = useDispatch()

  return(
    <>
    {anecdotes.sort((a, b) => a.votes > b.votes ? -1 : 1).map(anecdote => 
    <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => {
      console.log(anecdote)
      dispatch(voteAnecdote(anecdote))
      dispatch(setNotification(`You've voted '${anecdote.content}'`, 5))
    }}/>
    )}
  </>
  )
}

export default AnecdoteList