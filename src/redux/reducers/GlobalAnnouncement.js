import { object } from 'prop-types';
import {
    LOAD_GLOBAL_ANNOUNCEMENT,LOAD_GLOBAL_ANNOUNCEMENT_SUCCESS,LOAD_ANNOUNCEMENT_FAIL, LOAD_GLOBAL_ANNOUNCEMENT_FAIL
} from '../action/types';



const INITIAL_STATE = {
    data: [], announcementLis: [], courseOffline:[],
    loadingCourse: true,
    loadingOfflineCourse:true,
    message: '',loadingglobalAnnouncement: true, statusAnnouncement: '', statusCourse: '', statusCourseOffline:'',
    animationView:true
};
export default (state ={}, action) => {
    
    switch (action.type) {

        case LOAD_GLOBAL_ANNOUNCEMENT:
             return {...state, loadingAnnouncement: true};
       case LOAD_GLOBAL_ANNOUNCEMENT_SUCCESS:
        //  console.warn("11111111111111", action.payload.data.data)
        return {
            ...state,
            loadingglobalAnnouncement: false,
            announcementLis: action.payload.data.data,
            statusAnnouncement: action.payload.data.message,
            expireToken:false
        };
        case LOAD_GLOBAL_ANNOUNCEMENT_FAIL:
            return {...state,expireToken:action.error.response.status===432?true:false,loadingAnnouncement:false}
        default:
            return state;
    }
}
