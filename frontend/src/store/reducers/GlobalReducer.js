const INITIAL_STATE = {
    shuldLoadTasks: true,
    shuldLoadCards: true
}

export default function GlobalReducer(state = INITIAL_STATE, action){

    switch(action.type){
        case "LOAD_TASKS":
            return state = { ...state, shuldLoadTasks: action.payload };
        case "LOAD_CARDS":
            return state = { ...state, shuldLoadCards: action.payload }
        default:
            return state;
    }

}