import { createStore, combineReducers } from 'redux';

import ModalReducer from './reducers/ModalReducer';

export function store(){
    return createStore(combineReducers({
        modal: ModalReducer
    }));
}