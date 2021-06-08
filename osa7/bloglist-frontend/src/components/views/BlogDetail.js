import React, { useState } from 'react'
import blogService from '../../services/blogs'
import {useDispatch} from 'react-redux'
import {updateBlogData, deleteBlog} from '../../reducers/blogReducer'
import { useParams, Redirect } from 'react-router-dom'

const BlogDetail = ({ blogs, user }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const foundedBlog = blogs.find(blog=>blog.id === useParams().id)
  if(!foundedBlog){
    return(<Redirect to='/blogs'/>)
  }
  //update likes
  const updateLike = async(e) => {
    const newBlogObj = {
      title: foundedBlog.title,
      author: foundedBlog.author,
      url: foundedBlog.url,
      likes: foundedBlog.likes+1,
      user: foundedBlog.user.id
    }
    const id = e.target.value
    const updatedBlog = await blogService.update(newBlogObj, id)
    dispatch(updateBlogData(updatedBlog, id))
  }

  //remove blog from database
  const removeBlog = async() => {
    const blogToRemove = foundedBlog.id
    const msg = `Remove blog ${foundedBlog.title} by ${foundedBlog.author}? `
    if (window.confirm(msg)){
        blogService.setToken(user.token)
        await blogService.removeBlog(blogToRemove)
        dispatch(deleteBlog(blogToRemove))
    }
  }

  //add comment
  const addComment = async(e)=>{
    e.preventDefault()
    const blogId = e.target.addBtn.value
    const blogUpdated = await blogService.comment(blogId, comment)
    console.log(blogUpdated)
    dispatch(updateBlogData(blogUpdated, blogId))
  }

  const addRemoveButton = () => <button onClick={removeBlog}>Remove</button>
  return(
    <div >
      <h2>
        {foundedBlog.title} {foundedBlog.author}
      </h2>
      <div>
        <p>{foundedBlog.url}</p>
        <p>likes: {foundedBlog.likes} <button onClick={updateLike} value={foundedBlog.id}>Like</button></p>
        <p>Added by {foundedBlog.user.name}</p>
        <h4>Comments</h4>
        <form onSubmit={addComment}>
          <input type='text' required value={comment} onChange={(e)=>setComment(e.target.value)}/>
          <button type='submit' name='addBtn' value={foundedBlog.id}>Add comment</button>
        </form>
        <br />
        {foundedBlog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
        <br />
        {foundedBlog.user.username === user.username && addRemoveButton()}
      </div>
    </div>
  )}

export default BlogDetail