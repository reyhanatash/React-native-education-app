import {
    CLEAR_MESSAGE_PROFILE,
    EDIT_PROFILE, EDIT_PROFILE_FAIL, EDIT_PROFILE_SUCCESS,
    LOAD_FIELD,
    LOAD_FIELD_FAIL,
    LOAD_FIELD_SUCCESS,
    LOAD_PROFILE,
    LOAD_PROFILE_FAIL,
    LOAD_PROFILE_SUCCESS,
} from '../action/types';
import {Strings} from '../../constant/String';

const INITIAL_STATE = {
    fieldList: [],
    profileInfo: [],
    loading: false,
    message: '',
};
export default (state = INITIAL_STATE, action) => {
   
    switch (action.type) {
        case LOAD_FIELD:
        case EDIT_PROFILE:
            return {...state, loading: true};
        case  LOAD_FIELD_SUCCESS:
         
            return {...state, loading: false, fieldList: action.payload.data.data};
        case LOAD_FIELD_FAIL:      
            return {...state, loading: false, message: action.error.data==='Network Error'? Strings.checkConnection :Strings.serverError};
        case LOAD_PROFILE_FAIL:
            console.warn("action.error.response.status",action.error.response.status)
            return {...state, loading: false, message: action.error.data==='Network Error'? Strings.checkConnection :Strings.serverError,expireToken:action.error.response.status===432?true:false};
        case LOAD_PROFILE:
            return {...state, loading: true};
        case LOAD_PROFILE_SUCCESS:
            return {...state, loading: false, profileInfo: action.payload.data.data[0]};
        case EDIT_PROFILE_SUCCESS:
            console.warn("action paload user profile info",action.payload)
            return {...state, loading: false, message: Strings.editProfileDone};
        case EDIT_PROFILE_FAIL:
            console.warn("action paload user profile info",action.error)
            return {...state,loading: false , message:action.error.data==='Network Error'? Strings.checkConnection : Strings.serverError,expireToken:action.error.response.status===432?true:false};
            case CLEAR_MESSAGE_PROFILE:
            return {...state,loading: false , message: ""};
        default:
            return state;
    }
}
