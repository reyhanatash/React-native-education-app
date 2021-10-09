import {SEND_ANSWER,SEND_ANSWER_SUCCESS,SEND_ANSWER_FAIL
} from '../action/types';



export default (state ="", action) => {
    // if(action.type===SEND_ANSWER){
    // console.warn("shdkasdksadhk",action.payload)}
    switch (action.type) {
        case SEND_ANSWER:
            return state;
        case SEND_ANSWER_SUCCESS:
            console.warn("SUCESS ANSWER TEST",action.payload)
            return action.payload
        case SEND_ANSWER_FAIL:
            console.warn("fail send data",action.error)
            return action.payload
        default:
            return state;
    }
}


