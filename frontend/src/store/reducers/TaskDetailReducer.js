const INITIAL_STATE = {
    show_modal: false,
}

export default function TaskDetailReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case "SHOW_TASK_DETAIL_MODAL":
            return state = { ...state, show_modal: action.payload }
        default:
            return state;
    }
}