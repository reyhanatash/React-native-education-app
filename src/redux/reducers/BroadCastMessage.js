import {GET_APPROVED_MESSAGE
} from '../action/types';



export default (state ={}, action) => {
    switch (action.type) {
        case GET_APPROVED_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}


