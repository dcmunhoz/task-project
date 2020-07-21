const INITIAL_STATE = {
    qttAllMine: 0,
    qttToday: 0,
    qttNextSeven: 0,
    qttLate: 0,
    qttNewTasks: 0,
    qttAllTasks: 0,
    qttNoMember: 0,
    qttDeleted: 0,
    qttConcluded: 0
}

export default function SidebarFilterReducer(state = INITIAL_STATE, action){

    switch(action.type){
        case 'SET_FILTERS_QTT':
            return state = { ...action.payload }
        default:
            return state; 
    }

}