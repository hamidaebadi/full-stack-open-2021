const userReducer = (state=null, action) => {
    switch(action.type){
        case 'LOGIN_USER':
            return action.data.user
        
        case 'LOGOUT_USER':
            return null
        
        default:
            return state
    }
}

//action creators
export const loggedInUser = (user) => {
    return{
        type: 'LOGIN_USER',
        data: {user}
    }
}

export const loggedOutUser = () => {
    return{
        type: 'LOGOUT_USER'
    }
}
export default userReducer