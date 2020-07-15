const INITIAL_STATE = {
    show: false,
    title: "Oooops",
    message: ""
}

export default function ModalReducer(state = INITIAL_STATE, action = {}){
    
    switch(action.type){
        case "SHOW_MODAL_MESSAGE":
            return state = { ...state, show: true, message: action.payload.message, title: action.payload.title  }
        case "CLOSE_MODAL_MESSAGE":
            return state  = {...state, show: false }
        default:
            return state;
    }
}