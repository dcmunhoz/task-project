const INITIAL_STATE = {
    username: "",
    fullname: "",
    id_user: ""
}

export default function UserReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case "SET_USER_DATA":
            return state = {...state, ...action.payload}
        default:
            return state;
    }
}