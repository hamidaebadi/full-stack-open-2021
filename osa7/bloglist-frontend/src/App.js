import React, {useEffect } from 'react'
import {Switch, Link, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

//reducers
import {initilizeBlogs} from './reducers/blogReducer'
import {loggedInUser, loggedOutUser} from './reducers/userReducer'
import {initilizeUsers} from './reducers/allUserReducer'

import BlogForm from './components/BlogForm'
import Togglable from './components/Togglabe'
import LoginForm from './components/LoginForm'
import Home from './components/views/Home'
import UserList from './components/views/UserList'
import BlogDetail from './components/views/BlogDetail'

//services
import blogService from './services/blogs'
import userService from './services/userServices'
import User from './components/views/User'

//styled components
import {Wrapper} from './styles.js'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const allUser = useSelector(state => state.allUsers)


  //get user data from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      dispatch(loggedInUser(user))
    }
  }, [])

  //initilize all blogs from database
  useEffect(async() => {
    const blogs = await blogService.getAll()
    dispatch(initilizeBlogs(blogs))
  }, [])


//initilize all users from database
useEffect(() => {
  userService.getAllUsers().then(result => {
   dispatch(initilizeUsers(result))
 })
 
},[])


  //function to handle logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(loggedOutUser())
  }
  //if user is not signed in
  if(user === null){
    return(
      <div>
          <LoginForm />
      </div>
    )
  }

  //signed in user will see this

  if(blogs.length > 0){
    return (
      <Wrapper>
        <h2>blogs</h2>
        <Link to='/blogs'>Blogs</Link>
        <Link to='/users'>Users</Link>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <br />
        <Switch>
          <Route path='/users/:id'>
            {allUser ? <User user={allUser}/>: null}
          </Route>
          <Route path='/users'>
            <UserList />
          </Route>
          <Route path='/blogs/:id'>
            <BlogDetail user={user} blogs={blogs}/>
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Wrapper>
    )
  }
  return(
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <br />
      <Togglable buttonLable='Add new blog'>
        <BlogForm />
      </Togglable>
      <br />
       No blog
    </div>
  )
}

export default App