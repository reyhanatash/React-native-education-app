import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet
} from 'react-native';
import { Screens, Strings } from '../constant/String';
import { goToMain, push } from './MyNavigation/MyNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { clearData, token, getConnection } from '../redux/action';
import * as signalR from '@microsoft/signalr'; 
// import signalr from 'react-native-signalr';
// import signalR from "@aspnet/signalr"
import { getAsyncStorage } from '../store/AsyncStorageFunction';
import {
  CHECK_HubCONNECTION_SUCCESS, GET_APPROVED_MESSAGE,
  GET_DELETE_MESSAGEID, GET_Replay_MESSAGE, Send_Message_To_Admin,
  Send_Message_To_Users, GET_ADMIN_TEST, GET_ANSWER_TEST,REFRESH_PAGE,CONNECT_Var
} from '../redux/action/types';



let code = ""
let Token = ''


const Login = (Props) => {
  /*****************calling from redux*********/
  const dispatch = useDispatch();
  const courseStepCo = useSelector(state => state.liveStream);
  var data = courseStepCo.lenght !== 0 && courseStepCo.data[0] !== undefined && courseStepCo.data[0].fldPkCourseStepCo
  code = data.toString()
  async function getToken() {
    return Token = await getAsyncStorage('jwt')
  }


  const getconnection=async()=>{
    // getToken().then(value => {
    const environment = "https://Signalr.tamland.ir/"
let token=await getAsyncStorage('jwt')
 const  url=`${environment}chatHub?authToken=${token}`;
  console.warn("urlllllllllllllllllllllllllllllllll",signalR.HubConnectionBuilder())
let connection = new signalR.HubConnectionBuilder().withUrl(url).withAutomaticReconnect({
      nextRetryDelayInMilliseconds: retryContext => {
        if (retryContext.elapsedMilliseconds < 30 * 1000) {      
          return 5 * 1000;
        } else if (retryContext.elapsedMilliseconds < 60 * 1000) {
          return 10 * 1000;
        }
        return 20 * 1000;
      }
    })
    .build();
    console.warn("!!!!connection,",connection)
   
    dispatch({
      type:CONNECT_Var,
      payload:connection
    })

   
   connection.on('getMessages',(fullName,message,messageId) => { 
     console.warn("get approves user message",fullName,message,messageId)
         var date=new Date()  
          dispatch({
            type:GET_APPROVED_MESSAGE,
            payload: {fullName,message,messageId,IsAdmin:false,createDate:date},
          });

        })       
        //send message to users
        connection.on('getMessageFromAdmin',(message,messageId) => {
          var date=new Date()
          console.warn("send message to users", message, messageId)
          dispatch({
            type:Send_Message_To_Users,
            payload: { message, messageId, Deleted: false, IsAdmin: true,createDate:date,type:1}
          });
        })

          // //delete message 
        connection.on('sendDeleteMessage', (MessageId) => {
          console.warn("delete with messageid", MessageId)
          dispatch({
            type:GET_DELETE_MESSAGEID,
            payload: MessageId,
          });
  })
  connection.on('getTest',(Test) => {
    console.warn("get test froom hub", Test)
      dispatch({
            type: GET_ADMIN_TEST,
            payload: Test
          });
    
})

// //get data for end test
        connection.on("getFinishTest", (Testid, options) => {
          console.warn("getfinishtest", options, Testid)
          dispatch({
            type: GET_ANSWER_TEST,
            payload: { Testid, options }
          })
        })


          // //replayed message admin to users
        connection.on('sendUserMessage', (messageId, message) => {
          console.warn("replay message", messageId, message)
          var date=new Date()
          dispatch({
            type:GET_Replay_MESSAGE,
            payload:{messageId,message,createDate:date }
          });

        })

      }

  useEffect(() => {
    {
      getconnection()
      getToken().then(value => {
        // const connection = signalr.hubConnection('https://jabiz.famiran.com', {
        //   qs: {
        //     access_token: value
        //   },
        // });
        //  const dispatch = useDispatch();               
        // get ALL message 

        // var proxy = connection.createHubProxy('chatHub');
        // connection.logging = true;
        // dispatch(getConnection(connection))
        // connection.start().done(async () => {
        // }).fail((e) => {
        //   console.warn('Failed', e);
        // });
     
 
// let connection = new signalR.HubConnectionBuilder()
    // .withUrl('https://signalr.famiran.com',{ qs: {
    //   access_token: value
    // },})
    // .build();

  //   const environment = "https://signalr.famiran.com/"
  //   // let token=await getAsyncStorage('jwt')
  // const  url= `${environment}chatHub?authToken=${value}`;
  //   console.warn("urlllllllllllllllllllllllllllllllll",signalR)
  //   // connection = new HubConnectionBuilder()
  // let connection = new signalR.HubConnectionBuilder().withUrl(url).withAutomaticReconnect({
  //       nextRetryDelayInMilliseconds: retryContext => {
  //         if (retryContext.elapsedMilliseconds < 30 * 1000) {
  //           return 5 * 1000;
  //         } else if (retryContext.elapsedMilliseconds < 60 * 1000) {
  //           return 10 * 1000;
  //         }
  //         return 20 * 1000;

  //       }
  //     })
  //     .build();
//     dispatch(getConnection(connection))

// connection.start().then(() => console.warn("rrrrrrrrrrrrrrrrrrrrrrr"));
//         proxy.on('refreshPage',(arg) => {  
//           console.warn("refresh page")
//           dispatch({
//             type:REFRESH_PAGE,
//             payload:true,
//           });
//         })



        // //get broadcast Message
        // proxy.on('BroadCastMessage', ( msg, messageId,courseStepId) => {
        //   //  console.warn("broadcast message",FullName,Message, MessageId)
        //   dispatch({
        //     type: GET_APPROVED_MESSAGE,
        //     payload: { FullName, Message, MessageId, Deleted: false, IsAdmin: false },
        //   });

        // });

        // //send message from users to admin
        // proxy.on('sendAdminMessage', async (messages) => {
        //   // console.warn("messsageusres",messages)
        //   var SERVERMessage = JSON.parse(messages)
        //   dispatch({
        //     type: Send_Message_To_Admin,
        //     payload: SERVERMessage,
        //   });

        // });
        // //delete message 
        // proxy.on('sendDeleteMessage', (MessageId) => {
        //   console.warn("delete with messageid", MessageId)
        //   dispatch({
        //     type: GET_DELETE_MESSAGEID,
        //     payload: MessageId,
        //   });

        // })

        // //replayed message admin to users
        // proxy.on('sendUserMessage', (MessageId, message) => {
        //   console.warn("replay message", MessageId, message)
        //   dispatch({
        //     type: GET_Replay_MESSAGE,
        //     payload: { MessageId, message }
        //   });

        // })

    
        // //get test from server
        // proxy.on("getTest", (Test) => {
        //   console.warn("test from Admin",Test)
        //   dispatch({
        //     type: GET_ADMIN_TEST,
        //     payload: Test
        //   });
        // })

        // //get data for end test
        // proxy.on("getFinishTest", (Testid, options) => {
        //   console.warn("getfinishtest", options, Testid)
        //   dispatch({
        //     type: GET_ANSWER_TEST,
        //     payload: { Testid, options }
        //   })
        // })


        // //send message to users
        // proxy.on('getMessageFromAdmin', (Message, MessageId) => {
        //   console.warn("send message to users", MessageId, Message)
        //   dispatch({
        //     type: Send_Message_To_Users,
        //     payload: { Message, MessageId, Deleted: false, IsAdmin: true }
        //   });

        // })
        goToMain(Screens.Home, Props)


      }
      )
    }
  }, []);


  return (
    <View>

    </View>
  )
};




export default Login;

