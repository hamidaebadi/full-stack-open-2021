import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
const UserList = () => {
    const allUsers = useSelector(state => state.allUsers)
    return(
        <div>
            <h2>Users</h2>
            <ul>{allUsers.map(user => 
            <Link to={`/users/${user.id}`} key={user.id}>
                <li> {user.name} {user.blogs.length} </li>
            </Link>
            )}</ul>
        </div>
    )
}

export default UserList