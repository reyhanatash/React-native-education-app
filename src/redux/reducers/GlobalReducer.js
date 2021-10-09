import {
    CHECK_CONNECTION_ATTEMPT,
    CHECK_CONNECTION_FAIL,
    CHECK_CONNECTION_SERVER_ERROR,
    CHECK_CONNECTION_SUCCESS, CLEAR_CHECK_CONNECTION, CLEAR_PAYLOAD, 
    SEND_CENSURE, SEND_CENSURE_SUCCESS, SEND_CENSURE_FAIL,
     GET_NOTIFICATION,
     CLEAR_NOTIFICATION,
     GET_DETAIL_EXAM,
     GET_DETAIL_EXAM_FAIL,
     GET_DETAIL_EXAM_SUCCESS,
     GET_EXAM,GET_EXAM_SUCCESS,
     GET_EXAM_FAIL,
     ANSWER_QUESTION,
     ANSWER_QUESTION_SUCCESS,
     ANSWER_QUESTION_FAIL,
     CHECK_EXAM_AVAILABALE,
     CHECK_EXAM_AVAILABALE_SUCCESS,
     CHECK_EXAM_AVAILABALE_FAIL,
     GET_QUIZ_RESULT_SUCCESS,
     GET_QUIZ_RESULT,
     GET_QUIZ_RESULT_FAIL,
     CHECK_HubCONNECTION_SUCCESS,
     CHECK_HubCONNECTION_FAIL,
     LOAD_MESSAGE,
     LOAD_MESSAGE_FAIL,
     LOAD_MESSAGE_SUCCESS,
     SEND_DELETE_MESSAGE_SUCCESS,
     SEND_DELETE_MESSAGE,
     SEND_DELETE_MESSAGE_FAIL,
     Change_live_Type,
     Change_live_Type_FAIL,
     Change_live_Type_SUCCESS,
     UPLOAD_HOMEWORK_SUCCESS,
     UPLOAD_HOMEWORK,
     UPLOAD_HOMEWORK_FAIL,
     save_Answer_Question,
     save_Answer_Question_SUCCESS,
     save_Answer_Question_FAIL,
     DELETE_ANSWER_QUESTION_SUCCESS,
     DELETE_ANSWER_QUESTION,
     DELETE_ANSWER_QUESTION_FAIL,
     LOAD_EXAM_DATA,
     LOAD_EXAM_DATA_SUCCESS,
     LOAD_EXAM_DATA_FAIL,
     GET_Result_EXAMCARD,
     GET_Result_EXAMCARD_SUCCESS,
     GET_Result_EXAMCARD_FAIL

} from '../action/types';


const INITIAL_STATE = {data: [], checkConnectionLoading: false, serverError: false,
    loadingCensure:false,censureResult:[], notification:''};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECK_CONNECTION_ATTEMPT:
            return {...state, checkConnectionLoading: true, data:[]};
        case CHECK_CONNECTION_SUCCESS:
            return {...state, data: action.payload, checkConnectionLoading: false};
        case CHECK_CONNECTION_FAIL:
            return {...state, data: action.payload,checkConnectionLoading: false};
        case CHECK_CONNECTION_SERVER_ERROR:
            return {...state, data:action.payload, checkConnectionLoading: false, serverError: true};
        case CLEAR_CHECK_CONNECTION:
            return {...state, data:action.payload, checkConnectionLoading: false, serverError: false};
        case CLEAR_PAYLOAD:
            return {...state, data: [], checkConnectionLoading: false, censureResult:[]};
        case SEND_CENSURE:
              return  {...state, loadingCensure:true}
        case SEND_CENSURE_SUCCESS:
                  return {...state, loadingCensure:false,censureResult:action.payload.data}
        case SEND_CENSURE_FAIL:
                      return {...state, loadingCensure:false}
        case GET_NOTIFICATION:
            return{...state,notification:action.payload}
            case CLEAR_NOTIFICATION:
                return{...state,notification:''}
        case GET_DETAIL_EXAM:
            return{...state}
         case GET_DETAIL_EXAM_SUCCESS:
             return{...state,ExamDetail:action.payload.data,LoadDetailExam:true}
         case GET_DETAIL_EXAM_FAIL:
             return{...state,LoadDetailExam:false}
        case GET_EXAM:
            return{...state}
        case GET_EXAM_SUCCESS:
            return {...state,loadexam:true,examData:action.payload}
        case GET_EXAM_FAIL:
            return{...state,loadexam:false}
        case ANSWER_QUESTION:
            return {...state}
        case ANSWER_QUESTION_SUCCESS:
            return {...state,postanswer:true,answerQuestion:action.payload}
        case ANSWER_QUESTION_FAIL:
                return {...state,postanswer:false,answerQuestion:action.payload}
       case CHECK_EXAM_AVAILABALE:
           return {...state}
       case CHECK_EXAM_AVAILABALE_SUCCESS:
            return {...state,CheckAvailabale:action.payload,quizavail:true}
        case CHECK_EXAM_AVAILABALE_FAIL:
                return {...state,CheckAvailabale:action.payload,quizavail:false}
        case GET_QUIZ_RESULT:
            return {...state}
        case GET_QUIZ_RESULT_SUCCESS:
            return {...state,QuizResult:action.payload,loadResult:true}
        case GET_QUIZ_RESULT_FAIL:
            return{...state,loadResult:false}
        case SEND_DELETE_MESSAGE_SUCCESS:
            console.warn("deleeteeeeeeeeeee",action.payload)
            return {...state,deletedMessage:action.payload,deleted:true}
            case SEND_DELETE_MESSAGE_FAIL:
                return {...state,deletedMessage:action.payload,deleted:false}

        case Change_live_Type:
            return{...state,changeServer:true}
        case Change_live_Type_SUCCESS:
            console.warn("************changeeeeeee video type",action.payload.data.data[0].status)
            return {...state,changeServer:true,dataChangeServer:action.payload.data.data[0].status}
        case  UPLOAD_HOMEWORK:
            return {...state,Upload:true}
        case  UPLOAD_HOMEWORK_SUCCESS:
            console.warn("action.payload home work",action.payload)
            return {...state,Upload:true,UploadHomework:action.payload}
        case  UPLOAD_HOMEWORK_FAIL:
            console.warn("home work fail",action.payload)
             return {...state,Upload:false,UploadHomework:action.payload}
        case  save_Answer_Question:
            return {...state,SaveAnswer:true}
        case  save_Answer_Question_SUCCESS:
            console.warn("@@@answer question result",action.payload)
             return {...state,SaveAnswer:true,AnswerExam:action.payload}
        case  save_Answer_Question_FAIL:
            console.warn("@@@answer question result fail",action.payload)
              return {...state,SaveAnswer:false,AnswerExam:action.payload}
        case DELETE_ANSWER_QUESTION:
            return {...state,deleteAnswer:true}
        case DELETE_ANSWER_QUESTION_SUCCESS:
            console.warn("@@@adelete answeer",action.payload)
            return {...state,deleteAnswer:true,deleteData:action.payload}
        case DELETE_ANSWER_QUESTION_FAIL:
                console.warn("@@@adelete answeer",action.payload)
                return {...state,deleteAnswer:true,deleteData:action.payload}
       case LOAD_EXAM_DATA:
        // console.warn("@@@load exam",action.payload)
        return {...state,examdata:true}
        case LOAD_EXAM_DATA_SUCCESS:
            console.warn("@@@load exam",action.payload)
            return {...state,examdata:true,ComprehensiveExam:action.payload}
        case GET_Result_EXAMCARD:
            console.warn("@@@exam result",action.payload)
            return {...state,examstatus:true}
       case GET_Result_EXAMCARD_SUCCESS:
            console.warn("@@@exam result success",action.payload)
            return {...state,examstatus:true,azmoonjame:action.payload}
       case GET_Result_EXAMCARD_FAIL:
                console.warn("@@@load exam fail",action.payload)
                return {...state,examstatus:false}
        default:
            return state;
    }
}
