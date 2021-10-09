export const CLEAR_PAYLOAD = 'clear_payload';
export const CLEAR_SERVER_ERROR = 'clear-server-error';
export const SERVER_ERROR = 'server-error';

//connection types

export const CHECK_CONNECTION_ATTEMPT = 'check_connection_attempt';
export const CHECK_CONNECTION_SUCCESS = 'check_connection_success';
export const CHECK_CONNECTION_FAIL = 'check_connection_fail';
export const CHECK_CONNECTION_SERVER_ERROR = 'check_connection_server_error';
export const CLEAR_CHECK_CONNECTION = 'clear_check_connection';

export const LOGIN_REQUESTED = 'login_request';
export const LOGIN_REQUESTED_SUCCESS = 'login_request_SUCCESS';
export const LOGIN_REQUESTED_FAIL = 'login_request_FAIL';
export const LOGOUT = 'logout';

export const GRAND_TYPE = 'password';

export const GET_VOD_MODE = 'get_vod_mode';
export const GET_VOD_MODE_SUCCESS = 'get_vod_mode_SUCCESS';
export const GET_VOD_MODE_FAIL = 'get_vod_mode_FAIL';

///load courses
export const LOAD_COURSE = 'load_course';
export const LOAD_COURSE_SUCCESS = 'load_course_SUCCESS';
export const LOAD_COURSE_FAIL = 'load_course_FAIL';

export const LOAD_ANNOUNCEMENT = 'load_announcement';
export const LOAD_ANNOUNCEMENT_SUCCESS = 'load_announcement_SUCCESS';
export const LOAD_ANNOUNCEMENT_FAIL = 'load_announcement_FAIL';
export const LOAD_GLOBAL_ANNOUNCEMENT='load_global_announcement';
export const LOAD_GLOBAL_ANNOUNCEMENT_SUCCESS='load_global_announcement_SUCCESS';
export const LOAD_GLOBAL_ANNOUNCEMENT_FAIL='load_global_announcement_FAIL';

//load fields in profile

export const LOAD_FIELD = 'load_field';
export const LOAD_FIELD_SUCCESS = 'load_field_SUCCESS';
export const LOAD_FIELD_FAIL = 'load_field_FAIL';

//load profiles

export const LOAD_PROFILE = 'load_profile';
export const LOAD_PROFILE_SUCCESS = 'load_profile_SUCCESS';
export const LOAD_PROFILE_FAIL = 'load_profile_FAIL';

//LOAD MESSSAGE
export const LOAD_MESSAGE = 'LOAD_MESSAGE';
export const LOAD_MESSAGE_SUCCESS = 'LOAD_MESSAGE_SUCCESS';
export const LOAD_MESSAGE_FAIL = 'LOAD_MESSAGE_FAIL';

/**********save profile ********/

export const EDIT_PROFILE = 'edit_profile';
export const EDIT_PROFILE_SUCCESS = 'edit_profile_SUCCESS';
export const EDIT_PROFILE_FAIL = 'edit_profile_FAIL';


/**********stream video********/

export const HAS_LIVE = 'has_live';
export const HAS_LIVE_SUCCESS = 'has_live_SUCCESS';
export const HAS_LIVE_FAIL = 'has_live_FAIL';
export const CLEAR_LIVE = 'clear_live';

export const CLEAR_DATA = 'clear_data';
export const CLEAR_MESSAGE_PROFILE = 'clear_message_profile';
export const CLEAR_MESSAGE_LOGIN = 'clear_message_LOGIN';
export const CLEAR_MESSAGE_TOKEN = 'clear_message_TOKEN';

export const GET_LIVE_TYPE = 'get_Live_type';
export const GET_LIVE_TYPE_SUCCESS = 'get_Live_type_SUCCESS';
export const GET_LIVE_TYPE_FAIL = 'get_Live_type_FAIL';

/*********************offline course****************************/

export const GET_COURSE = 'get_course';
export const GET_COURSE_SUCCESS = 'get_course_SUCCESS';
export const GET_COURSE_FAIL = 'get_course_FAIL';

export const ANIMATION_VIEW = 'animation_view';



/*********************censure****************************/

export const SEND_CENSURE = 'send_censure';
export const SEND_CENSURE_SUCCESS = 'send_censure_SUCCESS';
export const SEND_CENSURE_FAIL = 'send_censure_FAIL';

/**********************TOKEN******************************/


export const GET_TOKEN ="GET_TOKEN";


/***************************connect to hub(live chat**********************/
export const CHECK_HubCONNECTION = "CHECK_HubCONNECTION";
export const CHECK_HubCONNECTION_SUCCESS = "CHECK_HubCONNECTION_SUCCESS";
export const CHECK_HubCONNECTION_FAIL = "CHECK_HubCONNECTION_FAIL";
export const bCHECK_HubCONNECTION_SERVER_ERROR = "CHECK_HubCONNECTION_SERVER_ERROR"
export const Send_Message_To_Admin="Send_Message_To_Admin"


/****************************notification***********************************/

export const GET_NOTIFICATION = 'get_notification';
export const CLEAR_NOTIFICATION = 'clear_notification';
export const CONNECT_Var='CONNECT_Var';


/*******************************BroadcastMessage*************************************/
export const GET_APPROVED_MESSAGE="GET_APPROVED_MESSAGE";


/************************************DELETED MESSAGE********************************************/
export const GET_DELETE_MESSAGEID="GET_DELETE_MESSAGEID";
export const GET_Replay_MESSAGE="GET_Replay_MESSAGE";


/*************************Message To Users****************************************************/
export const Send_Message_To_Users="Send_Message_To_Users";

/***************************Get Test From Admin*********************************************/
export const GET_ADMIN_TEST="GET_ADMIN_TEST";
/*******************************SEND ANSWER TEST********************************************/

export const SEND_ANSWER="SEND_ANSWER";
export const SEND_ANSWER_SUCCESS='SEND_ANSWER_SUCCESS'
export const SEND_ANSWER_FAIL="SEND_ANSWER_FAIL"

/****************************get answer Test************************************************/

export const GET_ANSWER_TEST="GET_ANSWER_TEST"

/*************************************REFRESH PAGE********************************* */

export const REFRESH_PAGE="REFRESH_PAGE"
export const GET_STREAM='GET_STREAM'


/******************************get schoolID********************************** */
export const GET_SCHOOLE_ID='GET_SCHOOLE_ID'
export const GET_SCHOOLE_ID_SUCCESS='GET_SCHOOLE_ID_SUCCESS'

/****************************CourseId************************************/
export const GET_Course_ID='GET_Course_ID'

/********************************EXAM**********************************/
export const GET_DETAIL_EXAM='GET_DETAIL_EXAM'
export const GET_DETAIL_EXAM_SUCCESS='GET_DETAIL_EXAM_SUCCESS'
export const GET_DETAIL_EXAM_FAIL='GET_DETAIL_EXAM_FAIL'
export const GET_EXAM='GET_EXAM'
export const GET_EXAM_SUCCESS='GET_EXAM_SUCCESS'
export const GET_EXAM_FAIL='GET_EXAM_FAIL'
export const ANSWER_QUESTION='ANSWER_QUESTION'
export const ANSWER_QUESTION_SUCCESS='ANSWER_QUESTION_SUCCESS'
export const ANSWER_QUESTION_FAIL='ANSWER_QUESTION_FAIL'
export const CHECK_EXAM_AVAILABALE='CHECK_EXAM_AVAILABALE'
export const CHECK_EXAM_AVAILABALE_FAIL='CHECK_EXAM_AVAILABALE_FAIL'
export const CHECK_EXAM_AVAILABALE_SUCCESS='CHECK_EXAM_AVAILABALE_SUCCESS'
export const GET_QUIZ_RESULT_SUCCESS="GET_QUIZ_RESULT_SUCCESS"
export const GET_QUIZ_RESULT_FAIL="GET_QUIZ_RESULT_FAIL"
export const GET_QUIZ_RESULT="GET_QUIZ_RESULT"


/***********************delete message from admin***************************/

export const SEND_DELETE_MESSAGE_SUCCESS="SEND_DELETE_MESSAGE_SUCCESS"
export const SEND_DELETE_MESSAGE="SEND_DELETE_MESSAGE"
export const SEND_DELETE_MESSAGE_FAIL="SEND_DELETE_MESSAGE_FAIL"


/*************************CHNAGE SERVER********************* */

export const Change_live_Type="Change_live_Type"
export const Change_live_Type_FAIL="Change_live_Type_FAIL"
export const Change_live_Type_SUCCESS="Change_live_Type_SUCCESS"

/*********************UPLOAD HOMEWORK***************************/

export const UPLOAD_HOMEWORK="UPLOAD_HOMEWORK"
export const UPLOAD_HOMEWORK_SUCCESS="UPLOAD_HOMEWORK_SUCCESS"
export const UPLOAD_HOMEWORK_FAIL="UPLOAD_HOMEWORK_FAIL"

/**************************SAVE ANSWER QUESTIONS******************/
export const save_Answer_Question="save_Answer_Question"
export const save_Answer_Question_SUCCESS="save_Answer_Question_SUCCESS"
export const save_Answer_Question_FAIL="save_Answer_Question_FAIL"

/*************************DELETE ANSWER QUESTION*********************/

export const DELETE_ANSWER_QUESTION_SUCCESS="DELETE_ANSWER_QUESTION_SUCCESS"
export const DELETE_ANSWER_QUESTION="DELETE_ANSWER_QUESTION"
export const DELETE_ANSWER_QUESTION_FAIL="DELETE_ANSWER_QUESTION_FAIL"

/**************************LOAD EXAM DATA***********************/

export const LOAD_EXAM_DATA="LOAD_EXAM_DATA"
export const LOAD_EXAM_DATA_SUCCESS="LOAD_EXAM_DATA_SUCCESS"
export const LOAD_EXAM_DATA_FAIL="LOAD_EXAM_DATA_FAIL"

/***********************AZMOON JAME*************************** */

export const GET_Result_EXAMCARD="GET_Result_EXAMCARD"
export const GET_Result_EXAMCARD_FAIL="GET_Result_EXAMCARD_FAL"
export const GET_Result_EXAMCARD_SUCCESS="GET_Result_EXAMCARD_SUCCESS"

