import {
  CLEAR_MESSAGE_LOGIN,
  CLEAR_MESSAGE_TOKEN,
  GET_VOD_MODE,
  GET_VOD_MODE_SUCCESS,
  LOADING_LOGIN,
  LOGIN_REQUESTED,
  LOGIN_REQUESTED_FAIL,
  LOGIN_REQUESTED_SUCCESS,
} from '../action/types';
import {Strings} from '../../constant/String';

const INITIAL_STATE = {
  data: [],
  loadingLogin: false,
  errorMessageLogin: '',
  message: '',
  vodMode: -1,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      console.warn("!!!!!!!!!!!!!!!!!login",action.payload)
      return {...state, loadingLogin: true, message: ''};

    case LOGIN_REQUESTED_FAIL:
      console.warn("!!!!!!!!!!!!!!!!!login fail",action.payload)
      return {
        ...state,
        errorMessageLogin: Strings.serverError,
        loadingLogin: false,
        message: 'لطفا نام کاربری و رمز عبور را صحیح  وارد کنید',
      };

    case LOGIN_REQUESTED_SUCCESS:
      console.warn("!!!!!!!!!!!!!!!!!login success",action.payload)
      return {
        ...state,
        loadingLogin: false,
        errorMessageLogin: action.payload.message,
        data: action.payload.data,
        message: '',
      };

    case CLEAR_MESSAGE_LOGIN:
      return {...state, message: ''};
    case CLEAR_MESSAGE_TOKEN:
      return {...state, data: []};

    case GET_VOD_MODE:
      return {...state};
    case GET_VOD_MODE_SUCCESS:
      return {...state, vodMode: action.payload.data.data};
    default:
      return state;
  }
};
