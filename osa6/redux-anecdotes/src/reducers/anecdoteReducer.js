import anecdoteServices from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type){
    case 'VOTE':
      const changedAnecdote = action.data.updatedAnecdote
      return state.map(anec => anec.id !== action.data.id? anec : changedAnecdote )

    case 'ADD_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTE':
      return action.data
    default:
      return state
  }
}


export const voteAnecdote = (anecdote) => {
  const id = anecdote.id
  const newObj = {...anecdote, votes: anecdote.votes+1 }
  return async dispatch => {
    const updatedAnecdote = await anecdoteServices.updateLike(id, newObj)
    dispatch({
      type: 'VOTE',
      data: {id, updatedAnecdote}
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const createdAnecdote = await anecdoteServices.createAnecdote(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: createdAnecdote
    })
  }
}

export const initilizeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}
export default reducer