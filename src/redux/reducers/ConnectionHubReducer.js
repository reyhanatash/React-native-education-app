import {
    CONNECT_Var
} from '../action/types';




export default (state ="", action) => {
    switch (action.type) {
        case CONNECT_Var:
           return  action.payload 
        default:
            return state;
    }
}

