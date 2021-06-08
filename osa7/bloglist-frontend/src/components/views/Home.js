import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'


import BlogForm from '../BlogForm'
import Blog from '../Blog'
import Togglable from '../Togglabe'

const Home = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
    
    return(
        <div>
        <Togglable buttonLable='Add new blog'>
          <BlogForm />
        </Togglable>
        <br />
        {
          blogs.sort((a, b) => a.likes > b.likes? -1 : 1).map(blog =>
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <Blog  blog={blog} />
            </Link>
          )}
        </div>
    )
}

export default Home