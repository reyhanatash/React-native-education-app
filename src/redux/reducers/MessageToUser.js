import {
    Send_Message_To_Users
} from '../action/types';



export default (state ={}, action) => {
    
    switch (action.type) {
        case Send_Message_To_Users:
            return action.payload;
        default:
            return state;
    }
}
