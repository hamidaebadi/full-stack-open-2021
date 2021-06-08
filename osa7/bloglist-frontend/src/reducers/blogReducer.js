const blogReducer = (state=[], action) => {
    switch(action.type){
        case 'ADD_NEW_BLOG':
            const newBlog = action.data
            return [...state, newBlog]

        case 'UPDATE_BLOG':
            const id = action.data.id
            const updatedState = state.filter(blog => blog.id !== id)
            return [...updatedState, action.data.updatedBlog]

        case 'REMOVE_BLOG':
            const blogIdToRemove = action.data.id
            return state.filter(blog => blog.id !== blogIdToRemove)

        case 'INIT_BLOGS':
            return action.data
        default:
            return state
    }
}


//action creators
export const addNewBlog = (blogObj) => {
    return{
        type: 'ADD_NEW_BLOG',
        data: blogObj
    }
}

export const initilizeBlogs = blogs => {
    return{
        type: 'INIT_BLOGS',
        data: blogs
    }
}

export const updateBlogData = (updatedBlog, id) => {
    return{
        type: 'UPDATE_BLOG',
        data: {
            id,
            updatedBlog
        }
    }
}

export const deleteBlog = id => {
    return{
        type: 'REMOVE_BLOG',
        data:{id}
    }
}
export default blogReducer