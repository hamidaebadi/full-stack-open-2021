import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglabe'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(async() => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  //function to handle login
  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      //set token available for user
      blogService.setToken(user.token)

      //set data to local storage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')

    }catch(exception){
      setErrorMessage('Wrong username or password!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  //function to handle logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

  }

  const addBlog = async(newObj) => {
    const addedBlog = await blogService.addNew(newObj)
    setBlogs(blogs.concat(addedBlog))
  }

  const updateBlog = async(newObj, id) => {
    const updatedBlog = await blogService.update(newObj, id)
    const updatedBlogList = blogs.filter(blog => blog.id !== id)
    setBlogs(updatedBlogList.concat(updatedBlog))
  }

  const deleteBlog = async(id) => {
    blogService.setToken(user.token)
    await blogService.removeBlog(id)
    const blogsUpdated = blogs.filter(blog => blog.id !== id)
    setBlogs(blogsUpdated)
  }

  //if user is not signed in
  if(user === null){
    return(
      <div>
        <Notification message={errorMessage}/>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} id='username'/>
          </div>
          <div>
            Password <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} id='pass'/>
          </div>
          <button type='submit' id='login-btn'> Login </button>
        </form>
      </div>
    )
  }

  //signed in user will see this
  if(blogs.length > 0){
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <br />
        <Togglable buttonLable='Add new blog'>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        <br />
        {
          blogs.sort((a, b) => a.likes > b.likes? -1 : 1).map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} deleteBlog={deleteBlog} />
          )}
      </div>
    )
  }
  return(
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <br />
      <Togglable buttonLable='Add new blog'>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <br />
       No blog
    </div>
  )
}

export default App