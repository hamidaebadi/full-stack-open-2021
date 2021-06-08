import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import blogService from '../services/blogs'
import {addNewBlog} from '../reducers/blogReducer'



const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  //function to handle creation of a new blog post
  const addBlog = async event => {
    event.preventDefault()
    const newObj = { title, author, url }
    blogService.setToken(user.token)
    const addedBlog = await blogService.addNew(newObj)
    dispatch(addNewBlog(addedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
        <form onSubmit={addBlog}>
          <h2>Create new</h2>
          <div>
          title: <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} id='title'/>
          </div>
          <div>
          author: <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} id='author'/>
          </div>
          <div>
          url: <input type='text' value={url}  onChange={({ target }) => setUrl(target.value)} id='url'/>
          </div>
          <button type='submit' id='saveBlogBtn'> create </button>
        </form>
  )
}

export default BlogForm