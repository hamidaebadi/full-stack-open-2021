import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({user}) => {
    const foundedUser = user.find(user=>user.id === useParams().id)
    console.log(user)
    if(!foundedUser){
        return null
    }
    return(
        <div>
            <h3>{foundedUser.name}</h3>
            <h4>Added Blogs</h4>
            {foundedUser.blogs.map(blog => <p key={blog.title}>{blog.title}</p>)}
        </div>
    )
}

export default User