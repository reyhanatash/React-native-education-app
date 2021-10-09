import { act } from 'react-test-renderer';
import {LOAD_MESSAGE_SUCCESS,LOAD_MESSAGE,LOAD_MESSAGE_FAIL,GET_TOKEN,CHECK_HubCONNECTION_FAIL,CHECK_HubCONNECTION_SUCCESS,CHECK_HubCONNECTION_SERVER_ERROR,CONNECT_Var,CHECK_HubCONNECTION
} from '../action/types';



export default (state =[], action) => {
 
    // console.warn("~~~~~~~~~~~~~~~~~~~~~~~data message from api",action)
    switch (action.type) {
        case LOAD_MESSAGE:
        return {...state}
        case LOAD_MESSAGE_SUCCESS:
            console.warn("~~~~~~~~~~~~~~~~~~~~~~~data message from api",action.payload)
            return action.payload;
         case LOAD_MESSAGE_FAIL :
            console.warn("~~~~~~~~~~~~~~~~~~~~~~~data message from api fail",action.payload)
        // case CHECK_HubCONNECTION_SERVER_ERROR:
        //     return action.payload
        default:
            return state;
    }
}


