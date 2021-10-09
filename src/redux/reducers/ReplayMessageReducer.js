import {GET_Replay_MESSAGE
} from '../action/types';



export default (state ="", action) => {
    switch (action.type) {
        case GET_Replay_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}
