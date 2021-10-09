import {GET_DELETE_MESSAGEID
} from '../action/types';



export default (state ="", action) => {
    switch (action.type) {
        case GET_DELETE_MESSAGEID:
            return action.payload;
        default:
            return state;
    }
}
