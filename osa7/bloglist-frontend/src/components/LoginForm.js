import React, {useState} from 'react'
import Notification from './Notification'
import {useDispatch, useSelector} from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'

import {setMessage, clearMessage} from '../reducers/notificationReducer'
import {loggedInUser} from '../reducers/userReducer'


const LoginForm = (props) => {
    const message = useSelector(state => state.notification)
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //handle login on submit
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
          dispatch(loggedInUser(user))
          setUsername('')
          setPassword('')
    
        }catch(exception){
          dispatch(setMessage('Wrong username or password'))
          setTimeout(() => {
            dispatch(clearMessage())
          }, 4000)
        }
      }
    
    return(
        <div>
        <Notification message={message}/>
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

export default LoginForm