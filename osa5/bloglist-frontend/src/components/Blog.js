import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [fullView, setFullView] = useState(false)
  const [shorView, setShortView] = useState(true)

  Blog.propTypes = {
    blog: PropTypes.array.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: shorView? '':'none'
  }
  const blogStyleFullview = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: fullView? '':'none'
  }

  const toggleVisibility = () => {
    setFullView(!fullView)
    setShortView(!shorView)
  }

  //update likes
  const updateLike = () => {
    const newBlogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user.id
    }

    updateBlog(newBlogObj, blog.id)
  }

  //remove blog from database
  const removeBlog = () => {
    const blogToRemove = blog.id
    const msg = `Remove blog ${blog.title} by ${blog.author}? `
    if (window.confirm(msg)){
      deleteBlog(blogToRemove)
    }
  }

  const addRemoveButton = () => <button onClick={removeBlog}>Remove</button>
  return(
    <div className='blogParent'>
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={blogStyleFullview} className='fullView'>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button onClick={updateLike} id='likeBtn'>Like</button></p>
        <p>{blog.user.name}</p>
        {blog.user.username === user.username && addRemoveButton()}
      </div>
    </div>
  )}

export default Blog