import axios from 'axios';

import {
  CHECK_CONNECTION_ATTEMPT,
  CHECK_CONNECTION_FAIL,
  CHECK_CONNECTION_SERVER_ERROR,
  CHECK_CONNECTION_SUCCESS,
  CLEAR_CHECK_CONNECTION,
  CLEAR_DATA,
  CLEAR_SERVER_ERROR,
  EDIT_PROFILE,
  GET_COURSE,
  GRAND_TYPE,
  HAS_LIVE,
  LOAD_ANNOUNCEMENT,
  LOAD_COURSE,
  LOAD_FIELD,
  LOAD_PROFILE,
  LOGIN_REQUESTED,
  ANIMATION_VIEW,
  SEND_CENSURE,
  CHECK_HubCONNECTION,
  CHECK_HubCONNECTION_SUCCESS,
  CHECK_HubCONNECTION_SERVER_ERROR,
  Send_Message_To_Admin,
  CONNECT_Var,
  SEND_ANSWER,
  GET_NOTIFICATION,
  GET_VOD_MODE,
  GET_LIVE_TYPE,
  LOAD_GLOBAL_ANNOUNCEMENT,
  GET_SCHOOLE_ID,
  GET_STREAM,
  GET_Course_ID,
  GET_DETAIL_EXAM,
  ANSWER_QUESTION,
  CHECK_EXAM_AVAILABALE,
  GET_EXAM,
  LOAD_MESSAGE,
 GET_QUIZ_RESULT,
 LOAD_MESSAGE_FAIL,
 LOAD_MESSAGE_SUCCESS,
 SNED_DELETE_MESSAGEID,
 save_Answer_Question,
 Change_live_Type,
 UPLOAD_HOMEWORK,
 DELETE_ANSWER_QUESTION,
 LOAD_EXAM_DATA,
 GET_Result_EXAMCARD
} from './types';
import NetInfo from "@react-native-community/netinfo";
import { getAsyncStorage } from '../../store/AsyncStorageFunction';
import {headerCreation} from '../../store/HeaderCreation';
import {removeAsyncStorage} from '../../store/AsyncStorageFunction';
import {LOGOUT} from "../../redux/action/types";
import {setRoot} from '../../navigation/Navigation';
import {Screens} from '../../constant/String';
import messaging from '@react-native-firebase/messaging';
import * as signalR from '@microsoft/signalr'; 
import { func } from 'prop-types';

const qs = require('querystring');

export const clearServerError = () => async dispatch => {
  dispatch({
    type: CLEAR_SERVER_ERROR,
    payload: null,
  });
};

export const checkConnection = () => async dispatch => {
  dispatch({
    type: CHECK_CONNECTION_ATTEMPT,
  });
  const unsubscribe = NetInfo.addEventListener(state => {
    if(state.isConnected===true){
    dispatch({
              type: CHECK_CONNECTION_SUCCESS,
              payload: 200,
            });}else{
              dispatch({
                        type: CHECK_CONNECTION_FAIL,
                        payload: 400,
                      });
            }

  });
  // axios
  //   .get('https://www.google.com/', {
  //     headers: null,
  //   })
  //   .then((response)=> {

  //     if (response.status === 200) {
  //       dispatch({
  //         type: CHECK_CONNECTION_SUCCESS,
  //         payload: response.status,
  //       });
  //     } else {
  //       dispatch({
  //         type: CHECK_CONNECTION_FAIL,
  //         payload: 400,
  //       });
  //     }
  //   })
  //   .catch((error)=> {

  //     dispatch({
  //       type: CHECK_CONNECTION_SERVER_ERROR,
  //       payload: 500,
  //     });
  //   });
};

export const clearCheckConnection = () => async dispatch => {
  dispatch({
    type: CLEAR_CHECK_CONNECTION,
    payload: null,
  });
};

export function token(mobile, _password,firebase) {
  return {
    type: LOGIN_REQUESTED,
    payload: {
      request: {
        url: `/token`,
        method: 'POST',
        data: qs.stringify({
          grant_type: 'password',
          UserName: mobile,
          Password: _password,
          ClientId: -1,
          firebase:firebase
        }),
      },
    },
  };
}

export function loadCourser(userId) {
  return async dispatch => {
    dispatch({
      type: LOAD_COURSE,
      payload: {
        request: {
          url: '/api/course/loadUserCourse',
          method: 'POST',
          headers: await headerCreation(1),
          data: {
            UserId: userId,
          },
        },
      },
    });
  };
}

export function getAnnouncement(CourseId) {
  return async dispatch => {
    dispatch({
      type: LOAD_ANNOUNCEMENT,
      payload: {
        request: {
          url: '/api/notify/getAnnouncement',
          method: 'POST',
          headers: await headerCreation(1),
          data: {
            CourseId: CourseId,
          },
        },
      },
    });
  };
}


export function getGlobalAnnoncement(CourseId) {
  return async dispatch => {
    dispatch({
      type: LOAD_GLOBAL_ANNOUNCEMENT,
      payload: {
        request: {
          url: 'api/notify/getAnnouncements',
          method: 'Get',
          headers: await headerCreation(1),
          // data: {
          //   CourseId: CourseId,
          // },
        },
      },
    });
  };
}

export function loadAudience(AudienceId) {
  return async dispatch => {
    dispatch({
      type: LOAD_FIELD,
      payload: {
        request: {
          url: '/api/user/loadAudience',
          method: 'POST',
          headers: await headerCreation(1),
          data: {
            AudienceId: AudienceId,
          },
        },
      },
    });
  };
}

export function loadInfo() {
  return async dispatch => {
    dispatch({
      type: LOAD_PROFILE,
      payload: {
        request: {
          url: '/api/user/loadInfo',
          method: 'GET',
          headers: await headerCreation(1),
        },
      },
    });
  };
}

export function saveInfo(data) {
  console.warn("sassssssssssssssssssssssssssssss",data)
  return async dispatch => {
    dispatch({
      type:EDIT_PROFILE,
      payload: {
        request: {
          url:'/api/user/saveInfo',
          method: 'POST',
          headers: await headerCreation(1),
          data: data,
        },
      },
    });
  };
}

export function userLiveList() {
  return async dispatch => {
    dispatch({
      type: HAS_LIVE,
      payload: {
        request: {
          url: 'api/course/userLiveList',
          method: 'GET',
          headers: await headerCreation(2),
        },
      },
    });
  };
}

export function clearData(type) {
  return async dispatch => {
    dispatch({
      type: type,
    });
  };
}

export function getCourseOffline(id) {
  return async dispatch => {
    dispatch({
      type: GET_COURSE,
      payload: {
        request: {
          url: '/api/course/sessionLoad',
          method: 'POST',
          headers: await headerCreation(1),
          data: {CourseId: id},
        },
      },
    });
  };
}

export function animationView() {
  return async dispatch => {
    dispatch({
      type: ANIMATION_VIEW,
    });
  };
}

export function sendCensure(text) {
  return async dispatch => {
    dispatch({
      type: SEND_CENSURE,
      payload: {
        request: {
          url: '/api/lms/saveSuggestion',
          method: 'POST',
          headers: await headerCreation(1),
          data: {text: text},
        },
      },
    });
  };
}
export const getConnection = connection => async dispatch => {
  dispatch({
    type: CONNECT_Var,
    payload: connection,
  });
};

//  export const SendAnswerQusestion = (data) => async dispatch => {  
//         Token = await getAsyncStorage('token');    
//         console.warn("token", Token)
//         axios.post('https://jabiz.famiran.com/api/course/testAnswer', data,{
//          headers: {
//             'Authorization':'Bearer ' + Token,
//              'Content-Type':'application/json'   
//           },      
//           })
//           .then((response)=> {
//               dispatch({
//                   type:"SEND_ANSWER",
//                   payload:response.data.data[0].message
//               })
//             console.warn("responseanswer",response);
//           }) .catch( (error)=> {
//             console.warn("erroeeeeeeeeer",error);
//           });

// }

export function SendAnswerQusestion(data) {
  console.warn("data in answer test",data)
  return async dispatch => {
    dispatch({
      type:SEND_ANSWER,
      payload: {
        request: {
          url:'/api/course/testAnswer',
          method:'POST',
          headers: await headerCreation(1),
          data:data
        },
      },
    });
  };
}


export const getMessageJoin = (
 token,
 role,
 type,
 code,
 connection,
name
) => async dispatch => {
  console.warn("starteeeeeeeeeeeedddddddddd",connection)
  // console.warn("hiiiiiiiiiiiiiiiiiiiiii",code)
  // start function
  const environment = "https://Signalr.tamland.ir/"
  let token=await getAsyncStorage('jwt')

  connection.start().then(() => {
    console.warn("starteeeeeeeeeeeedddddddddd",code)
    connection.invoke('Join',Number(code))
      .then(directResponse => {
        console.warn('success join', directResponse);
      })
      .catch( (err)=> {
        
        return console.warn("+++++++++++++++++++fail hubconnection",err.toString());
      })
  });

  // proxy.on('sendAllMessages', messages => {
  //   console.warn("all message",messages);
  //   var SERVERMessage = JSON.parse(messages);
  //   dispatch({
  //     type: CHECK_HubCONNECTION_SUCCESS,
  //     payload: SERVERMessage,
  //   });
  // });

  connection.connectionSlow(() => {
    console.warn(
      'We are currently experiencing difficulties with the connection.',
    );
  });

  connection.error(error => {
    const errorMessage = error.message;
    let detailedError = '';
    if (error.source && error.source._response) {
      detailedError = error.source._response;
    }
    if (
      detailedError ===
      'An SSL error has occurred and a secure connection to the server cannot be made.'
    ) {
    }
  });
}
  export const ReloadgetMessage = proxy => async dispatch => {
    // proxy.on('sendAllMessages', messages => {
    //   var SERVERMessage = JSON.parse(messages);
    //   dispatch({
    //     type: CHECK_HubCONNECTION_SUCCESS,
    //     payload: SERVERMessage,
    //   });
    // });
  };


  export function TOAdmin(data,token,env) {
    // console.warn("dataaaaaaaaaaaa in send user message",data)
    axios.post(`${env}/api/Chat/UserSendMessage?authToken=${token}`,data,{       
      headers:{
        
        'content-type':'application/json', 
      }
    }
    ).then((response)=> {
      console.warn("$$$$$$$$$$$data in response send message",response)
    // await  setMessagetoadmin(response.data) 
    })
    .catch((error)=> {
      console.warn("!!!!!!!!!!!!!!!#############fail",error)
    });

  }
 

  export function BroadCastMessage (
    data,
    env,
    token
    
  )  {

    axios.post(`${env}/api/Chat/BroadCastMessage?authToken=${token}`,data,{       
      headers:{
        
        'content-type': 'application/json', 
      }
    }
    ).then((response)=> {
      // console.warn("$$$$$$$$$$$data in response approbed",response)
    // await  setMessagetoadmin(response.data) 
    })
    .catch((error)=> {
      console.warn("!!!!!!!!!!!!!!!#############fail",error)
    });
   
  };

  export function DeleteMessage  (
  data,
   token,
   env
  ) {
// console.warn("url in delete message",`${env}/api​/Chat​/DeleteMessage?authToken=${token}`,data,)
    axios.post(`${env}/api/Chat/DeleteMessage?authToken=${token}`,data,{       
      headers:{       
        'content-type': 'application/json', 
      }
    }
    ).then((response)=> {
      // console.warn("$$$$$$$$$$$data in response deltet message",response)
    // await  setMessagetoadmin(response.data) 
    })
    .catch((error)=> {
      console.warn("!!!!!!!!!!!!!!!#############fail",error)
    });
     
    }; 
  

  export const ReplayMessage = (
    sendMessageToUser,
    MessageId,
    Message,
    id,
    code,
    proxy,
  ) => async dispatch => {
    console.warn(
      'dsdfsdfs',
      sendMessageToUser,
      MessageId,
      Message,
      '',
      code,
      proxy,
    );
    proxy
      .invoke(sendMessageToUser, MessageId, Message, '', code)
      .done(directResponse => {
        console.warn('replay MESSAGE', directResponse);
      })
      .fail(e => {
        console.warn('fail REPLAY message', e);
      });
  };

  export const SendMessageTOUser = (
    sendMessageTOUsers,
    Message,
    MessageId,
    code,
    proxy,
  ) => async dispatch => {
    proxy
      .invoke(sendMessageTOUsers, Message, MessageId, code)
      .done(directResponse => {
        console.warn('SEND MESSAGE TO USERS', directResponse);
      })
      .fail(e => {
        console.warn('fail SEND MESSAGE TO USERS', e);
      });
  };




/************************notification handler***************/

export function getNotification(payload) {
  return async dispatch => {
    dispatch({
      type: GET_NOTIFICATION,
      payload:pay
    });
  };
}

/************************get video type**************/
export function getVodMode() {
  return async dispatch => {
    dispatch({
      type: GET_VOD_MODE,
      payload: {
        request: {
          url: '/api/lms/getVodMode',
          method: 'GET',
          headers: await headerCreation(1),
          // data: {text: text},
        },
      },
    });
  };
}

/************************get live type**************/
export function getCourseStream(id) {
  console.log('ther isssssssssssssssssssssssssssss',id)
  return async dispatch => {
    dispatch({
      type: GET_LIVE_TYPE,
      payload: {
        request: {
          url: '/api/course/GetCourseStream/'+id,
          method: 'GET',
          headers: await headerCreation(1),
        
        },
      },
    });
  };
}

/*****************************getschoolID**************************/
export function getschoolID(id) {
  // console.warn("hiiiiiiiiiiiiiiiiiiiii",id)
  return async dispatch => {
    dispatch({
      type:GET_SCHOOLE_ID,
      payload: {
        request: {
          url:'/api/course/checkstepaccess/'+id,
          method:'GET',
          headers:await headerCreation(1),     
        },
      },
    });
  };
}
  /******************get all message from api****************/
  export const GetAllMessage=(ID,token)=> {
    // console.warn("$$$$$$$$$$$$$$$$$$",ID)
    // // return async dispatch => {
    //  axios.get('https://jabiz.famiran.com/api/course/loadChatMessage/'+ID,{ 
    //   headers:{
    //     'Authorization': 'Bearer ' + token,
    //     'Content-Type': 'application/json', 
    //   }
    // }
    // ).then((response)=> {
    //   console.warn("!!!!!!!!!!!!!!!#############mee",response)
    //   // dispatch({
    //   //   type:LOAD_MESSAGE_SUCCESS,
    //   //   payload:response.data.data,
    //   // });
     
    // })
    // .catch((error)=> {
    //   console.warn("!!!!!!!!!!!!!!!#############www",error)
    //   // dispatch({
    //   //   type:LOAD_MESSAGE_FAIL,
    //   //   payload: 500,
    //   // });
    // });
  }
 
 

/**************************log out function****************************/

export const LOGOUTt = () => async dispatch => {
  removeAsyncStorage('token').done(() => setRoot(Screens.Login));
  dispatch(clearData(LOGOUT))
  messaging().deleteToken() 
};

/***************************SELECTED COURSE*************************************/

export const SelectedCourse=(item)=> async dispatch =>{  
  dispatch({
    type:GET_Course_ID,
    payload:item 
  });
}
 
/*****************************EXAM**********************************/
export function getDetailExam(id) {
  console.warn("IDDDDDDDDD1",id)
  return async dispatch => {
    dispatch({
      type:GET_DETAIL_EXAM,
      payload: {
        request: {
          url:'/api/course/examDetail/'+id,
          method: 'GET',
          headers: await headerCreation(1),
        },
      },
    });
  };
}

export function getExam(data) {
  return async dispatch => {
    dispatch({
      type:GET_EXAM,
      payload: {
        request: {
          url:'/api/course/getExam',
          method:'POST',
          headers: await headerCreation(1),
          data:data
        },
      },
    });
  };
}


export function AnswerQuestion(data) {
  return async dispatch => {
    dispatch({
      type:ANSWER_QUESTION,
      payload: {
        request: {
          url:'/api/course/answerquestion',
          method:'POST',
          headers: await headerCreation(1),
          data:data
        },
      },
    });
  };
}

export function CheckQuiezAvailable(id) {
  console.warn("IDDDDDDDDD",id)
  return async dispatch => {
    dispatch({
      type:CHECK_EXAM_AVAILABALE,
      payload: {
        request: {
          url:'/api/course/checkquizisavailable/'+id,
          method: 'GET',
          headers: await headerCreation(1),
        },
      },
    });
  };
}

export function GetResult(id) {
  console.warn("result",id)
  return async dispatch => {
    dispatch({
      type:GET_QUIZ_RESULT,
      payload: {
        request: {
          url:'/api/course/quizresult/'+id,
          method: 'GET',
          headers: await headerCreation(1),
        },
      },
    });
  };
}


export function UploadFile(data){
console.warn("data for upload file",data)
  return async dispatch => {
    dispatch({
      type:UPLOAD_HOMEWORK,
      payload: {
        request: {
          url:'/api/homework/StudentUpload',
          method:'POST',
          headers: await headerCreation(1),
          data:data
        },
      },
    });
  };
}

// put live type
export function changeStream(data) {
  console.warn("@@@@@@@@@@@@@@@",data)
  return async dispatch => {
    dispatch({
      type:Change_live_Type,
      payload: {
        request: {
          url:'api/user/saveVideoType',
          method:'PUT',
          headers: await headerCreation(1),
          data:data
        },
      },
    });
  };
}

export function SaveAnswerQuestion(data){
  console.warn("rrrr",data)
  return async dispatch=>{
    dispatch({
      type:save_Answer_Question,
      payload: {
        request: {
          url:'/api/exam/savecomprehensiveanswer',
          method:'POST',
          headers: await headerCreation(1),
          data:data
        },
      },
    })
  }
}


export function deleteAnswer(id){
  return async dispatch=>{
    dispatch({
      type:DELETE_ANSWER_QUESTION,
      payload: {
        request: {
          url:`/api/exam/deleteCompQuestionRange/${id}`,
          method:'DELETE',
          headers: await headerCreation(1),
        
        },
      },
    })
  }
}


export function getAllExam(id){
  return async dispatch=>{
    dispatch({
      type:LOAD_EXAM_DATA,
      payload: {
        request: {
          url:`api/exam/loadtestjame`,
          method:'GET',
          headers: await headerCreation(1),
          // data:data
        },
      },
    })
  }
}

export function GetResultReportCart(id){
  return async dispatch=>{
    dispatch({
      type:GET_Result_EXAMCARD,
      payload: {
        request: {
          url:`/api/exam/getCompTestResult/${id}`,
          method:'GET',
          headers: await headerCreation(1),
          // data:data
        },
      },
    })
  }
}