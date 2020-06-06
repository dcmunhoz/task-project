const INITIAL_STATE = {
    authenticatedUser:{
        username: "",
        fullname: "",
        id_user: ""
    }, usersList:[
        
    ]
    
}

export default function UserReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case "SET_USER_DATA":
            return state = {
                ...state, 
                authenticatedUser:{
                    ...action.payload
                }
            }
        case "SET_USERS_LIST":
            return state = {
                ...state,
                usersList: [
                    ...action.payload
                ]
            }
        default:
            return state;
    }
}