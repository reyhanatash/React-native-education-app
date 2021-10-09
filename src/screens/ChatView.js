
import React, { Component, useEffect, useState,useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
 Modal,
 FlatList
} from 'react-native';
import { 
  userLiveList,
   getMessageJoin, 
   TOAdmin,
   BroadCastMessage,
   loadInfo,
   DeleteMessage,
   ReplayMessage,
   SendMessageTOUser,
   SendAnswerQusestion,
   getConnection} from "../redux/action";
import { getAsyncStorage } from '../store/AsyncStorageFunction';
import * as signalR from '@microsoft/signalr'; 
import { useDispatch, useSelector } from "react-redux";
import createGuid from "react-native-create-guid";
import Icon from 'react-native-vector-icons/FontAwesome';
import Chart from './Chart'
import  {GET_ANSWER_TEST} from '../redux/action/types'
import UserChat from '../component/UserChat'
import axios from 'axios';
import {
  GET_ADMIN_TEST,
} from '../redux/action/types'
import * as scale from 'd3-scale';
import { BarChart, Grid,PieChart,XAxis,YAxis,StackedBarChart} from 'react-native-svg-charts'
import { Strings } from '../constant/String';

const moment = require('moment-jalaali');
  const { width, height } = Dimensions.get("window")
  const ChatView = (Props) => {
    // console.warn("!!!!!!!!!!!",Props)
  const [TestModal,setTestModal]=useState(false)
  const [showChart,SetShowChart]=useState(false)
  const [MessageToadmin,setMessagetoadmin] = useState([]);
  const [Message,setMessage]=useState("")
  const [Role,SetRole]=useState("")
  const [Replay,SetReplay]=useState(false)
  const [MessageId,setMessageId]=useState("")
  const[MessageReplay,SetReplayUser]=useState("")
  const [UsernameReplaedMessage,SetReplayedUserName]=useState("")
  const [Replayindex,SetReplayIndex]=useState("")
  const [TestItems,setTestItems]=useState([])
  const [Options,SetOptions]=useState([])
  const [ChartItems,setchartItems]=useState([])
  const [CircleChartData,setCircleChartData]=useState([])
  const[Optionindex,SetOptionsindex]=useState("")
  const [AllOptions,SetAllOptions]=useState([])
  const [questionId,setQuestionId]=useState("")
  const [Adminflag,setAdminflag]=useState("")
  const profileInfo = useSelector(state => state.profileRed);
  let courseStepCo;
  let code;
  let token = "";
  let role = "";
  let proxy;
  let BroadCastMessageRedux={}
  var ConnectionHubReducer = "";
  let ReduxMessage=[]
  let MessageToAdminReducer={}
  let deletedMessage=""
 let replayMessages={}
 let MessageToUsers={}
 let AdminTest=[]
 let AnswersQuestion={}



   //Get Test from Admin
   AdminTest=useSelector(state=>{return state.GetTest})
 
 
  //  console.warn("live data",livedata)
  //GET broadcastmessage users from admin(Accepted message)
 BroadCastMessageRedux=useSelector(state=>{return state.BroadcastMessage})
  useSelector((state) => {
    courseStepCo = state.liveStream;
  });

  //GET MESSAGE FROM ADMIN
  MessageToUsers=useSelector(state=>{
    return state.MessageToUser
  })
// console.warn("message to users from admin",MessageToUsers)
  //get delete message from other admin
  deletedMessage=useSelector(state=>state.DeleteMessage )


  //get all message from reducer
  ReduxMessage= useSelector(state =>
  state.ChatConnection 
);
 
  useSelector((state) => {
    ConnectionHubReducer = state.ConnectionHubReducer
  })
// console.warn("__________connectionHUBREDUCER",ConnectionHubReducer)
  //get new message from users to admin
  MessageToAdminReducer= useSelector((state)=>{
 return  state.MessageToAdminReducer
  })


  //get recive answer question from hub
  AnswersQuestion=useSelector((state)=>{
    return state.AnswerQuestionReducer
  })
// console.warn("get data from hub for sho chart",AnswersQuestion)
  //hide chart
  const hideChart = useCallback(
    event => {
      SetShowChart(!showChart);
      setchartItems([])
      SetAllOptions([])
      setCircleChartData([])
      setTestItems("")
      dispatch({
        type:GET_ANSWER_TEST,
        payload:[]                   
      })
      
    },
    [showChart]
  );

  //get replayed message from other admin
  replayMessages= useSelector((state)=>{
    return  state.ReplayMessage
     })

  const dispatch = useDispatch();
    const  fetchMyAPI=async() =>{
    var data=Props.streamId
    code = data.toString()
    token = await getAsyncStorage('jwt');
    role = await getAsyncStorage('secret')
    SetRole(role)  
    if(code!=="false"){
       dispatch(getMessageJoin(token, role, "1", code, ConnectionHubReducer,profileInfo.profileInfo.fldName))
  }
 
  }


 
  useEffect(() => { 
    fetchMyAPI()   
  },[])

  const  getdata=async()=>{
      dispatch(getConnection(connection))
    }

  useEffect(()=>{
    getdata()
  },[])

  useEffect(()=>{
    dispatch(
      userLiveList(),
    );
  },[])


  useEffect(()=>{
    if(MessageToadmin!==undefined && AdminTest.length!==0 && AdminTest!==undefined){
      setAdminflag(true)
      var data=JSON.parse(AdminTest)
      console.warn("AdminTest",data.id)
      setTestItems(data.text)
       SetOptions(data)
      setTestModal(true)
      var ParseTest=AdminTest.length!==0 && JSON.parse(AdminTest).text
      var Testoption=AdminTest.length!==0 && JSON.parse(AdminTest).options
      var addtest={fullName:"سوال",message:ParseTest,type:2,options:Testoption,createDate:new Date(),questionId:data.id}
      setQuestionId(data.id)
      var newarr =[...MessageToadmin,addtest]
      setMessagetoadmin(newarr)
    }   
  },[AdminTest])


  const myMessage=async()=>{
    var data=Props.streamId
    code = data.toString()
    const environment = "https://Signalr.tamland.ir"
    let token=await getAsyncStorage('jwt')
     axios.get(`${environment}/api/Chat/loadMessages/${code}?authToken=${token}`,{ 
    }
    ).then(async(response)=> {
    await  setMessagetoadmin(response.data) 
    })
    .catch((error)=> {
      console.warn("!!!!!!!!!!!!!!!#############fail",error)
    });
 }
  useEffect(() => {
    myMessage() 
  },[])


  useEffect(()=>{
    if(Role==="1" || Role==="4"){
  if(MessageToAdminReducer!==undefined) { let newarray=[...MessageToadmin,MessageToAdminReducer]
    setMessagetoadmin(newarray)}}
  },[MessageToAdminReducer])

  useEffect(()=>{
    if(MessageToadmin&& replayMessages!==undefined) { 
      let newarray=[...MessageToadmin]
      let ReplayMessageID=replayMessages.messageId
      let index= newarray.findIndex(obj=>obj.messageId===ReplayMessageID)
      newarray[index]!==undefined && (newarray[index].replay=replayMessages.message)
      setMessagetoadmin(newarray)
    }
    },[replayMessages])


  useEffect(()=>{
    if(MessageToadmin && deletedMessage!==undefined) { let newarray=deletedMessage!==undefined && MessageToadmin.filter(obj=>obj.messageId!==deletedMessage)
      setMessagetoadmin(newarray)}
    },[deletedMessage])


    
  useEffect(() => {
    async function profileApi() {
        await dispatch(loadInfo());
    }
    profileApi().then(

    );
}, []);

useEffect(()=>{
  // console.warn("message to users from admin", moment(MessageToUsers.createDate).format('YYYY-MM-DD HH:mm:ss'))
  let newarray=[...MessageToadmin,MessageToUsers]
  setMessagetoadmin(newarray)
},[MessageToUsers])

useEffect(()=>{
  if(Role!=="1" && Role!=="4")
  var newarray=[...MessageToadmin,BroadCastMessageRedux]
   setMessagetoadmin(newarray)
},[BroadCastMessageRedux])

 useEffect(()=>{
   if(AnswersQuestion.length!==0){
     SetShowChart(true)
     showchartModal(AnswersQuestion)
   }
    
  },[AnswersQuestion])

  const CUT_OFF = 20
        const Label = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={ index }
                    x={ x(index) + (bandwidth / 2) }
                    y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
                    fontSize={ 14 }
                    fill={ value >= CUT_OFF ? 'black' : 'black' }
                    alignmentBaseline={ 'middle' }
                    textAnchor={ 'middle' }
                
                  
                >
                    {value+"%"}
                </Text>
            ))
        )

       
// show test modall function
const showTestModal=(items)=>{
  console.warn("iteeeeeeeeeeeeeeeems",items.questionId)
  setQuestionId(items.questionId)
  setTestModal(true)
  // if(AdminTest.length!==0)
  // var data=JSON.parse(items.options)
  // AdminTest?
  SetOptions(items)
//  (SetOptions(data))
  setTestItems(items.message)  
}


//show chart modal
const showchartModal=async(item)=>{
  
     SetShowChart(true)
  if(AnswersQuestion.length===0)
 { var text=item.message
  setTestItems(text)
   let colors=['blue','orange','red','green','yellow']
   SetShowChart(true)
   let data =await JSON.parse(item.options)
   data.filter(async(obj)=>{ 
    //  console.warn("$$$$$$$$",data)
      var per=obj.persent; 
   setchartItems(chartItems=>([...chartItems,per]));
   await SetAllOptions(AllOptions=>([...AllOptions,obj.text]));
})
for (let i=0;i<=data.length;i++){
  var Circlechart=[];
  var obj={
    amount:data[i].persent,
   key:i,
    option:data[i].text,
    svg:{ fill:colors[i]}
  }
  Circlechart.push({obj})
  setCircleChartData(CircleChartData=>([...CircleChartData,obj]))}
  
}
else{
 await MessageToadmin.filter(obj=>{ (obj.QuestionId===item.Testid)===true  && setTestItems(obj.Message)})
  var char=item.Options
  // console.warn("items", item.options)
  let colors=['blue','orange','red','green','yellow']
  SetShowChart(true)
  let data =await JSON.parse(item.options)
  data.filter(async(obj)=>{  var per=obj.persent; 
  setchartItems(chartItems=>([...chartItems,per]));
  await SetAllOptions(AllOptions=>([...AllOptions,obj.text]));
})
for (let i=0;i<=data.length;i++){
 var Circlechart=[];
 var obj={
   amount:data[i].persent,
  key:i,
   option:data[i].text,
   svg:{ fill:colors[i]}
 }
 Circlechart.push({obj})
 setCircleChartData(CircleChartData=>([...CircleChartData,obj]))}
}
}
//send message to ADMIN
  const  SendMessagePress =async()=> {
    setMessage("")
    if(Replay!==undefined && Replay===true){
      var data=Props.streamId
      code = data.toString()
      const guid = await createGuid();
      proxy = ConnectionHubReducer.createHubProxy('chatHub');
         dispatch(ReplayMessage("sendMessageToUser",MessageId,Message,null,code,proxy))     
         let newArr = [...MessageToadmin];
       newArr[Replayindex].Replay=Message
         setMessagetoadmin(newArr)
       
         SetReplay(false)
       
    }else if(Role!=="1"){
      var date=new Date()
      // console.warn("@@@@@@@@@@@@@",date)
      var sendMessage={message:Message,fullName:profileInfo.profileInfo.fldName!==undefined?profileInfo.profileInfo.fldName:"کاربر",createDate:date}
     setMessagetoadmin(prevState =>[...prevState ,sendMessage])
    var data = Props.streamId
    code = data.toString()
    const guid = await createGuid();
  let info={
      Message:Message,
      MessageId:guid.toString(),
      group:code,
      fullName:profileInfo.profileInfo.fldName,
      mobile:profileInfo.profileInfo.fldMobile,
  }
  const environment = "https://Signalr.tamland.ir"
  var  token = await getAsyncStorage('jwt');
   await  dispatch(TOAdmin(info,token,environment))  
  
   }else {
    var data=Props.streamId
    code = data.toString()
    const guid = await createGuid();
    // proxy = ConnectionHubReducer.createHubProxy('chatHub'); 
       dispatch(SendMessageTOUser("sendMessageTOUsers",Message,guid,code,proxy))
       setMessage("")
   }
   setMessage("")
  }


  async  function ApprovedText (message,MessageId,fullName){
   var index= MessageToadmin.findIndex(Object=>Object.messageId===MessageId)
    // console.warn("ApprovedText",message,MessageId,fullName)
    let newArr = [...MessageToadmin];
    newArr[index].approved=true
    setMessagetoadmin(newArr)
    var data=Props.streamId
    code = data.toString()
    // proxy =await ConnectionHubReducer.createHubProxy('chatHub');
    var Approved={
      group:code,
      messageId:MessageId,
      message:message,
      fullName:fullName
    }
    const environment = "https://Signalr.tamland.ir"
    var  token = await getAsyncStorage('jwt');
    dispatch(BroadCastMessage(Approved,environment,token))  
    // if(Role!==1){
    //   setMessagetoadmin(MessageToadmin=>[...MessageToadmin,{BroadCastMessageRedux}])
    // }  
  }


  optionPress=(index,items)=>{
    SetOptionsindex(index)
    //  console.warn("@@@@@@@@items in option",items)
  }

  // function ReplayText (message,MessageId,index,username){
  // secondTextInput.focus()
  // SetReplay(true)
  // SetReplayedUserName(username)
  //  SetReplayUser(message)
  //  setMessageId(MessageId)
  //  SetReplayIndex(index)
  // }

 const  SendAnswer=async(data)=>{
 
var object= MessageToadmin.findIndex(obj=>obj.questionId===questionId )
// console.warn("@@@@@@@@object",object)
MessageToadmin[1].seleted=Optionindex
//    console.warn("item",MessageToadmin)
  //  var questionId=data.QuestionId
   var optionNumber=Optionindex
   var tt={
    testId:questionId,
    answer:Optionindex
   }
   dispatch(SendAnswerQusestion(tt))
   
   setTestModal(false)
//  console.warn("Message to admin",MessageToadmin)
  
}

    async  function deleteText (message,MessageId){       
      var data=Props.streamId
      CourseStepId = data.toString()
      // console.warn("!!!!!!!!!!!!!!!",message,MessageId,"****",CourseStepId)
      const environment = "https://Signalr.tamland.ir"
      var  token = await getAsyncStorage('jwt');
      var deleteInfo={
        message,messageId:MessageId,group:CourseStepId,
      }
       dispatch(DeleteMessage(deleteInfo,token,environment))  
        var newArr = [...MessageToadmin];
       var del= newArr.filter(obj=>obj.messageId!==MessageId)
      //  console.warn("@@@@@@@@@@@",del)
    await   setMessagetoadmin(del)      
    }

  createGuid().then((guid) => Guid = guid);
  return (
    <View style={[styles.container]}>
      {/* {console.warn("message to admin***",setMessage(""))} */}
      {
      MessageToadmin===""  ? 
            <View style={{justifyContent:"center",alignSelf:"center",minHeight:height}}>
               <ActivityIndicator/>
           </View>
           :
      <ScrollView 
        ref={(view) =>
        scrollView = view
     }>
          <Modal
                animationType="slide"
                visible={TestModal}             
                transparent={true}>              
                  <View style={{backgroundColor:"white",justifyContent:"center",alignItems:"center",alignSelf:"center",borderRadius:10,width:width*0.90,padding:10}}>
                  <TouchableOpacity onPress={()=>{setTestModal(false);
                   dispatch({
            type: GET_ADMIN_TEST,
            payload: []
          });
    
                  }}>
                      <Text style={{color:"red",fontFamily:Strings.fontFamilyLight}}>تایید و بستن</Text>
                  </TouchableOpacity>
                   <Text style={{fontFamily:Strings.fontFamilyLight}}>سوال:{TestItems.Message || TestItems} </Text>
                   <Text style={{marginTop:10,fontFamily:Strings.fontFamilyLight}}>گزینه ها</Text>
                   <ScrollView>
                  
                   {
                     
                   Options.length!==0 &&
                    JSON.parse(Options.options).map((items,index)=>{
                     return(
                      <TouchableOpacity onPress={()=>SetOptionsindex(index)} style={{borderRadius:5,borderWidth:0.5,width:width*0.80,height:width*0.10,padding:5,marginTop:5,backgroundColor:index===Optionindex?"rgb(56, 80, 146)":"white"}}>
                         <Text style={{color:index===Optionindex?"white":"black",fontFamily:Strings.fontFamilyLight}}>{items.text===""?`گزینه${index+1}` :items.text}</Text>
                      </TouchableOpacity>
                     )
                   }) 
                   
                 
                     }
                   </ScrollView>
                   <TouchableOpacity  onPress={()=>SendAnswer(TestItems.Message ||TestItems )} style={{backgroundColor:"#d51c29",borderRadius:5,padding:10,alignSelf:"center",marginTop:5,width:width*0.20,justifyContent:"center",alignItems:"center"}}>
                     <Text style={{color:"white",fontFamily:Strings.fontFamilyLight}}>ارسال</Text>
                   </TouchableOpacity>
                </View>       
            </Modal>
            <Modal
              animationType="slide"
              visible={showChart} 
              transparent={true}                 
              >   
                    
              <Chart hideChart={hideChart} chartItems={ChartItems} AllOptions={AllOptions} CircleChartData={CircleChartData} Message={TestItems}/> 
            </Modal>
        <View style={{
          borderWidth:3,
           width: width * 0.70,
          borderRadius: 10,
          borderColor: 'white',
          // justifyContent: 'center',
          alignItems:MessageToadmin!==undefined && MessageToadmin!==null && MessageToadmin!=="" &&MessageToadmin.length!==1?"center":"flex-start",
          alignSelf: "flex-end",
          padding:5,
          marginTop:10,
          marginBottom:width*0.20,
        
        }}> 
          <View style={{
            alignItems:"flex-start" 
                }}>
           <View>
              <TouchableOpacity onPress={()=>Props.hidePopup()} style={{backgroundColor:"red",borderRadius:20,width:20,height:20,alignItems:"center",justifyContent:"center",marginBottom:10}}>
                        <Icon name="close" color="white"/>
              </TouchableOpacity> 
            {MessageToadmin!==undefined && MessageToadmin!==null && MessageToadmin.length!==1  &&
                <TouchableOpacity onPress={() => {
                      this.scrollView.scrollToEnd({ animated: true }); 
                      }}>
                      <Icon  name="chevron-circle-down" color="white" size={18} style={{marginBottom:5}}/>
                </TouchableOpacity> } 
           </View>         
          {Role==="1" && MessageToadmin!=="" &&MessageToadmin!==undefined && MessageToadmin!==null && MessageToadmin.length !== 0 && 
          <FlatList 
            data={MessageToadmin!==undefined && MessageToadmin!==null && MessageToadmin.sort((a, b) => moment(a.createDate).format('YYYY-MM-DD HH:mm:ss').localeCompare(moment(b.createDate).format('YYYY-MM-DD HH:mm:ss')))}
            renderItem={({item}) => <UserChat  ApprovedText={ApprovedText} deleteText={deleteText}  Role={Role} MessageToadmin={item} showTestModal={showTestModal}  showchartModal={showchartModal}/>}/>  }
    
  
          { 
          Role!=="1" &&MessageToadmin!==undefined && MessageToadmin!==null &&  MessageToadmin!=="" &&   MessageToadmin.length !== 0   &&
          <FlatList 
            data={MessageToadmin.sort((a, b) => moment(a.createDate).format('YYYY-MM-DD HH:mm:ss').localeCompare(moment(b.createDate).format('YYYY-MM-DD HH:mm:ss')))}
            renderItem={({item}) => <UserChat MessageToadmin={item} showTestModal={showTestModal}  showchartModal={showchartModal}/>}/>               
            }
            
          <View style={{ flexDirection: "row-reverse", alignSelf: "center",alignItems:"center" }}>
              <View style={{ borderColor: "red", borderWidth: 1, width: width * 0.45, alignSelf: "center", borderRadius: 10, marginTop: 15 ,backgroundColor:"white",marginBottom:20}}>                 
                  <TextInput  value={Message}   ref={(input) => { secondTextInput = input; }}    onChangeText={(e) =>setMessage(e)} />
              </View>
              <TouchableOpacity onPress={() => SendMessagePress()}>
                <View style={{ marginRight: width * 0.020, marginTop: width * 0.030,backgroundColor: "red", borderRadius: 55, padding: 10 }}>
                    <Image source={require('../assets/image/send.png')} style={{ width: 20, height: 20 }} />
                </View>
              </TouchableOpacity>
          </View>
          </View>
        </View>
      </ScrollView> }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {

  },

});


export default ChatView