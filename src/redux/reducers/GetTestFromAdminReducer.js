import {GET_ADMIN_TEST
} from '../action/types';



export default (state =[], action) => {

    switch (action.type) {
        case GET_ADMIN_TEST:
            return action.payload;
        default:
            return state;
    }
}
