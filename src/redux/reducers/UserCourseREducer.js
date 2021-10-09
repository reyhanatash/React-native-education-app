import {
    CLEAR_DATA, GET_COURSE, GET_COURSE_FAIL, GET_COURSE_SUCCESS,
    LOAD_ANNOUNCEMENT, LOAD_ANNOUNCEMENT_FAIL,
    LOAD_ANNOUNCEMENT_SUCCESS,
    LOAD_GLOBAL_ANNOUNCEMENT,LOAD_GLOBAL_ANNOUNCEMENT_FAIL,LOAD_GLOBAL__ANNOUNCEMENT_SUCCESS,
    LOAD_COURSE,
    LOAD_COURSE_FAIL,
    LOAD_COURSE_SUCCESS,
    ANIMATION_VIEW,
} from '../action/types';
import {Strings} from '../../constant/String';

const INITIAL_STATE = {
    data: [], announcementLis: [], courseOffline:[],
    loadingCourse: true,
    loadingOfflineCourse:true,
    message: '',loadingAnnouncement: true, statusAnnouncement: '', statusCourse: '', statusCourseOffline:'',
    animationView:true
};

export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case LOAD_COURSE:
            return {...state, loadingCourse: true};
        case LOAD_COURSE_SUCCESS:
            if (action.payload.data.data[0].message === undefined) {
                return {
                    ...state,
                    loadingCourse: false,
                    data: action.payload.data.data,
                    statusCourse: action.payload.data.message,
                };
            }
            else
                return {...state,loadingCourse: false};
        case LOAD_COURSE_FAIL:
            return {...state, loadingCourse: false, message:action.error.data==='Network Error'? Strings.checkConnection :Strings.serverError,expireToken:action.error.response.status===432 ? true:false};
        
    //    case LOAD_GLOBAL_ANNOUNCEMENT:
    //        return{...state, loadingAnnouncement: true}

        case LOAD_ANNOUNCEMENT:
            return {...state, loadingAnnouncement: true};

        case LOAD_ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                loadingAnnouncement: false,
                announcementLis: action.payload.data.data,
                statusAnnouncement: action.payload.data.message,
            };

        case LOAD_ANNOUNCEMENT_FAIL:
            console.warn("%%%%%%%%%%%%%%%%%%%%%%token",action.error.response.status)
            return {expireToken:action.error.response.status===432 ? true:false};
         case   GET_COURSE_FAIL:
            return {...state, loadingAnnouncement: false, message:action.error.data==='Network Error'? Strings.checkConnection : Strings.serverError};


        case GET_COURSE:
            return {...state, loadingOfflineCourse: true};

        case GET_COURSE_SUCCESS:
            return {
                ...state,
                loadingOfflineCourse: false,
                courseOffline: action.payload.data.data !== undefined   ? action.payload.data.data !==null? action.payload.data.data: [] :[],
                statusCourseOffline: action.payload.data.message,
            };

        case GET_COURSE_FAIL:
           
            return {...state, loadingOfflineCourse: false, message: action.error.data==='Network Error'? Strings.checkConnection :Strings.serverError};


        case CLEAR_DATA:
            return {...state, announcementLis: [], loadingAnnouncement: true};

            case ANIMATION_VIEW:
                return{...state,animationView:!state.animationView}
        default:
            return state;
    }
}
