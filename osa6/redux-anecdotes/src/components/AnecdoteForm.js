import React from 'react'
import {useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
  const handleForm = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You've created following anecode: ${content}`, 5))
  }
    
return(
    <>
    <h2>create new</h2>
      <form onSubmit={handleForm}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </>
)
}

export default AnecdoteForm