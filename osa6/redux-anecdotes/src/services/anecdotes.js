import axios from 'axios'
const baseURL = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)


const getAll = async() => {
    const response = await axios.get(baseURL)
    return response.data
}

const createAnecdote = async(content) => {
    const newObj = {content, votes:0, id: getId()}
    const response = await axios.post(baseURL, newObj)
    return response.data
}

const updateLike = async(id, newObj) => {
    const response = await axios.put(`${baseURL}/${id}`, newObj)
    return response.data
}

export default {getAll, createAnecdote, updateLike}