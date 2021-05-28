
const notificationReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_MESSAGE':
            return action.data.content
        case 'CLEAR_MESSAGE':
            return null
        default:
            return state
    }
}


//action creators
export const setNotification = (content, time) => {
    return dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            data: {content}
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR_MESSAGE'
            })
        }, 1000*time)
    }
}

export default notificationReducer