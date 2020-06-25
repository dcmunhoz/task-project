const INITIAL_STATE = {
    shuldLoadTasks: true,
    situations: [],
}

export default function GlobalReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case "LOAD_TASKS":
            return state = { ...state, shuldLoadTasks: action.payload };
        case "SET_SITUATIONS":
            return state = { ...state, situations: [ ...action.payload ] }
        default:
            return state;
    }

}