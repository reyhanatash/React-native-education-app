import {
    GET_LIVE_TYPE_FAIL,
    GET_LIVE_TYPE_SUCCESS,
    GET_LIVE_TYPE,
    GET_SCHOOLE_ID,
    GET_SCHOOLE_ID_SUCCESS

  } from '../action/types';
  
  const INITIAL_STATE = {
    data: [],
    liveType: '',
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {  
      case GET_LIVE_TYPE_FAIL:
      case GET_LIVE_TYPE:
        return INITIAL_STATE;
      case GET_LIVE_TYPE_SUCCESS:
        console.warn("livetype in reducer",action.payload)
        return {liveType:action.payload.data.data[0].fldVideoType};
      case GET_SCHOOLE_ID:
         return INITIAL_STATE
      case GET_SCHOOLE_ID_SUCCESS:
        return action.payload
      default:
        return state;
    }
  };
  