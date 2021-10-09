import {
    GET_SCHOOLE_ID,
    GET_SCHOOLE_ID_SUCCESS
  } from '../action/types';
  
  const INITIAL_STATE = {
    data: [],
    // liveType: '',
  };
  
  export default (state = [], action) => {
    switch (action.type) {  
      case GET_SCHOOLE_ID:
         return INITIAL_STATE
      case GET_SCHOOLE_ID_SUCCESS:
        return action.payload
      default:
        return state;
    }
  };
  