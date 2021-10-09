import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import reducers from '../redux/reducers';
import ReduxThunk from 'redux-thunk'
import {LOGOUT} from '../redux/action/types'

const configureStore = () => {

  const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      state = undefined;
    }
  
    return reducers(state, action);
  };
  const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL:'https://jabiz.famiran.com',
    responseType:'json',
  //  baseURL:'https://api.famiran.com',
  // baseURL:'http://192.168.1.21:27916',

    withCredentials: true,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
    }
  });
  const store = createStore(rootReducer,{},applyMiddleware(axiosMiddleware(client),ReduxThunk));
  return {store}
}
export default configureStore;
