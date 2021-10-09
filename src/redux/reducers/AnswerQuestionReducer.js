import {GET_ANSWER_TEST
} from '../action/types';

export default (state =[], action) => {
    if(action.type===GET_ANSWER_TEST){
    console.warn("hi",action.payload)}
    switch (action.type) {
        case GET_ANSWER_TEST:
            return action.payload;
        default:
            return state;
    }
}


