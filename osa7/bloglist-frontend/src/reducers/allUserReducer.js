const allUserReducer = (state=[], action) => {
    switch(action.type){
        case "INIT_USERS":
            return action.data.users
        default:
            return state
    }
}

export const initilizeUsers = (users) => {
    return{
        type: 'INIT_USERS',
        data: {users}
    }
}

export default allUserReducer