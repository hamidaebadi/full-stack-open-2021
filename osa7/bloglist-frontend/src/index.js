import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'

//reducers
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import allUserReducer from './reducers/allUserReducer'


const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    allUsers: allUserReducer
})

const store = createStore(reducer)

ReactDOM.render(
    <Router>
    <Provider store={store}>
        <App />
    </Provider>
    </Router>
    ,
 document.getElementById('root'))