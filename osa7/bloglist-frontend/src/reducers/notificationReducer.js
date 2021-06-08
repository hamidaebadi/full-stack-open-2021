const notificationReducer = (state=null, action) => {
    switch(action.type){
        case 'SET_MESSAGE':
            return action.data.content
        case 'CLEAR_MESSAGE':
            state = null
            return state
        default:
            return state
    }
}

//action creators
export const setMessage = (content) => {
    return{
        type: 'SET_MESSAGE',
        data: {content}
    }
}

export const clearMessage = () =>{
    return{
        type: 'CLEAR_MESSAGE'
    }
}

export default notificationReducer