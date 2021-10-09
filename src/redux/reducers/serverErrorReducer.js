import {
    SERVER_ERROR,
    CLEAR_SERVER_ERROR, CLEAR_PAYLOAD,
} from '../action/types';

const INITIAL_STATE = {data: [], serverErrorLoading: false, serverError: false};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SERVER_ERROR:
            return {...state, data: action.payload, serverError: true};
        case CLEAR_SERVER_ERROR:
            return {...state, data: action.payload, serverError: false,};
        case CLEAR_PAYLOAD:
            return {...state, data: []};
        default:
            return state;
    }
}
