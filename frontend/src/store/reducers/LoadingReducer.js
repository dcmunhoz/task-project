const INITIAL_STATE = {
    show: false
}

export default function LoadingReducer(state = INITIAL_STATE, action){

    switch(action.type){
        case "SHOW_LOADING_SCREEN":
            return state = { show: true };
        case "HIDE_LOADING_SCREEN":
            return state = { show: false };
        default:
            return state;
    }

}