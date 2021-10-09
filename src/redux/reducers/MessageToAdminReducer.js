import {
    Send_Message_To_Admin
} from '../action/types';



export default (state ={}, action) => {
    
    switch (action.type) {
        // case Send_Message_To_Admin:
        //     return action.payload;
        default:
            return state;
    }
}
