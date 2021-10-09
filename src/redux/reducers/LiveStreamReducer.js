import {
  CLEAR_LIVE,
  GET_LIVE_TYPE_FAIL,
  GET_LIVE_TYPE_SUCCESS,
  HAS_LIVE,
  HAS_LIVE_FAIL,
  HAS_LIVE_SUCCESS,
  GET_LIVE_TYPE,
} from '../action/types';
import {Strings} from '../../constant/String';

const INITIAL_STATE = {
  data: [],
  HasLoadingLoading: false,
  serverError: false,
  message: '',
  hasLive: false,
  codeFail: -1,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HAS_LIVE:
      return {...state, HasLoadingLoading: true, data: [], message: ''};
    case HAS_LIVE_SUCCESS:
      return {
        ...state,
        HasLoadingLoading: false,
        serverError: false,
        hasLive: action.payload.data.data.length > 0,
        data: action.payload.data.data,
        codeFail: 200,
        message: '',
        expireToken:false
      };
    case HAS_LIVE_FAIL:

      return {
        ...state,
        HasLoadingLoading: false,
        codeFail: action.error.response.status,
        serverError: true,
        expireToken:action.error.response.status===432?true:false
        // message:
        //   action.error.data === 'Network Error'
        //     ? Strings.checkConnection
        //     : action.error.response.status === 432
        //     ? Strings.loginAgain
        //     : Strings.serverError,
      };
    case CLEAR_LIVE:
      return {...state, message: ''};

    default:
      return state;
  }
};
