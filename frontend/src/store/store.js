import { createStore, combineReducers } from 'redux';

import ModalReducer from './reducers/ModalReducer';
import LoadingReducer from './reducers/LoadingReducer';
import UserReducer from './reducers/UserReducer';
import TaskDetailReducer from './reducers/TaskDetailReducer';

export function store(){
    return createStore(combineReducers({
        modal: ModalReducer,
        loading: LoadingReducer,
        user: UserReducer,
        task: TaskDetailReducer
    }));
}