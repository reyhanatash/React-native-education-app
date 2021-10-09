import {GET_Course_ID
} from '../action/types';



export default (state ="", action) => {
    switch (action.type) {
        case GET_Course_ID:
            return action.payload;
        default:
            return state;
    }
}
