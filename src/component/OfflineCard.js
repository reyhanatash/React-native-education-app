import React, {useEffect, useState, useRef} from 'react';
import {TouchableOpacity,Image,Text,Modal, Alert,Dimensions} from 'react-native'
import {responsiveFontSize, responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
import {View} from 'react-native';
import Button from './Button';
import {Screens, Strings} from '../constant/String';
import InfoUserModal from '../dataModal/InfoUserModal';
import {TextCss} from '../style/TextCss';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../constant/Colors';
import VideoWeb from '../screens/VideoWeb';
import {downloadFile, isEmpty} from '../store/GlobalFunction';
import {push} from "../screens/MyNavigation/MyNavigation";
import {SelectedCourse,CheckQuiezAvailable,UploadFile} from "../redux/action";
import {getAsyncStorage} from '../store/AsyncStorageFunction'
import { useDispatch,useSelector } from 'react-redux';
import { property } from 'lodash';
import FilePickerManager from 'react-native-file-picker';
import {setRoot} from '../navigation/Navigation';
const RNFetchBlob = require('rn-fetch-blob').default;


const {width,height}=Dimensions.get('window')
const moment = require('moment-jalaali');
const RNFS = require('react-native-fs');
let ttt = new Date();
const OfflineCard=(Props)=>{
    const checkavail= useSelector(state=>{return state.globalReducer.CheckAvailabale})

    const [StartExam,setStartExam]=useState("1")
    const dispatch = useDispatch()
    const [file,setFile]=useState("")
    const allstate = useSelector(state => state.athuReducer)
    const resultUpload=useSelector(state=>state.globalReducer.UploadHomework)
    const [isVisible,setVisible] = useState(false)
    const [Loading,setLoading] =useState(false)
    let vodMode=""

    console.warn("resultUpload",resultUpload)
    useEffect( ()=>{
   
        //  getVodMode()
    },[])


    useEffect(() => {
        if (allstate.message !== '') {
          DesplaySnackbar(allstate.message);
          setTimeout(() => dispatch(clearData(CLEAR_MESSAGE_LOGIN)), 1000);
        }
      }, [allstate.message]);
      //msg snavkbar
      const DesplaySnackbar = message => {
        useRef.ReactNativeConnectionSnackBar.ShowConnectionSnackBarFunction(
          message,
        );
      };
    const {item} = Props;

    let year=ttt.getFullYear()
    let month=ttt.getMonth()
    let day=ttt.getDate()
    let hour=ttt.getHours()
    let minutes =ttt.getMinutes()
    let  endData =moment(item.fldShowEndDate + "Z").format('jYYYY/jM/jDD HH:mm:ss');
    let selectedYear=item.fldShowEndDate!==null && Number(item.fldShowEndDate.slice(0,4));
    let selectedMonth =item.fldShowEndDate!==null && Number(item.fldShowEndDate.slice(5,7));
    let selectedDay =item.fldShowEndDate!==null && Number(item.fldShowEndDate.slice(8,10)); 
    let selectedHour=item.fldShowEndDate!==null &&Number(endData.slice(11,13))
    let selectedMin=item.fldShowEndDate!==null &&Number(endData.slice(14,16))
    let ExamYear=item.fldShowStartDate!==null &&  Number(item.fldShowStartDate.slice(0,4));
    let ExamMonth =item.fldShowStartDate!==null && Number(item.fldShowStartDate.slice(5,7));
    let ExamDay =item.fldShowStartDate!==null && Number(item.fldShowStartDate.slice(8,10));
    let data =moment(item.fldShowStartDate + "Z").format('jYYYY/jM/jDD HH:mm:ss');
    let ExamHour=item.fldShowStartDate!==null &&Number(data.slice(11,13))
    let ExamMin=item.fldShowStartDate!==null &&Number(data.slice(14,16))
    let checkHour=item.fldShowStartDate!==null &&Number(item.fldShowStartDate.slice(11,13));
    let files = [
      {
        name: 'test1',
        filename: 'test1.w4a',
        filepath: RNFS.DocumentDirectoryPath + '/test1.w4a',
        filetype: 'audio/x-m4a'
      }, {
        name: 'test2',
        filename: 'test2.w4a',
        filepath: RNFS.DocumentDirectoryPath + '/test2.w4a',
        filetype: 'audio/x-m4a'
      }
    ];
  
  
   
 const  EnterExamPress =(item)=>{  
 
     var year=ttt.getFullYear()
     var month=ttt.getMonth()
     var day=ttt.getDate()
     var hour =ttt.getHours()
     var minutes =ttt.getMinutes()
    dispatch(SelectedCourse(item))
    var selectedYear=item.fldShowEndDate!==null && Number(item.fldShowEndDate.slice(0,4));
    var selectedMonth =item.fldShowEndDate!==null && Number(item.fldShowEndDate.slice(5,7));
    var selectedDay =item.fldShowEndDate!==null && Number(item.fldShowEndDate.slice(8,10));
    var selectedHour=item.fldShowEndDate!==null &&Number(item.fldShowEndDate.slice(11,13))
    dispatch(CheckQuiezAvailable(item.fldPkCourseStepCo))  
    var ExamYear=item.fldShowStartDate!==null &&  Number(item.fldShowStartDate.slice(0,4));
    var ExamMonth =item.fldShowStartDate!==null && Number(item.fldShowStartDate.slice(5,7));
    var ExamDay =item.fldShowStartDate!==null && Number(item.fldShowStartDate.slice(8,10));
    // var ExamHour=Number(item.fldEndDateTime.slice(11,13))
  
    if(year<ExamYear ||(year===ExamYear && month+1<ExamMonth) || year ===ExamYear && month+1 ===ExamMonth && day<ExamDay||year ===ExamYear && month+1 ===ExamMonth && day===ExamDay && hour<ExamHour ||year ===ExamYear && month+1 ===ExamMonth && day===ExamDay && hour===ExamHour && minutes<ExamMin)   {
      setStartExam("1")
    
    }else{
    if( year > selectedYear ||(year===selectedYear && month+1>selectedMonth) || year ===selectedYear && month+1 ===selectedMonth && day>selectedDay ){      
        DesplaySnackbar('زمان این آزمون به پایان رسیده است')
        setStartExam("2")
    }else 
    if(item.fldType!==6 && item.fldType!==7){
    if(item.answerExam!==1 && item.fldType===2 ){
    setStartExam("3")
    push(Props.navigation,Screens.StartExam,"")  
   }  
   else{  
      push(Props.navigation,Screens.ExamResult,"")
   }
  }else
  {
    push(Props.navigation, Screens.PublicExam, '',{items:item,ID:item.fldPkCourseStepCo})
    // push(Props.navisgation,Screens.PublicExam,{url:item.fldFileUrl})
  }

 }
}

 getFile=async(url)=>{
  
 await downloadFile(url)

 await setLoading(false)
 }


 const downloadHomeworkAnswers=()=>{
  console.warn("sense data",)
  var url= item.fldHomeWorkAnswer
    var checkUrl=url.slice(0,4)
  //  console.warn("###########",checkUrl)
    checkUrl==="http"?
  getFile(item.fldHomeWorkAnswer): Alert.alert(
      "",
      "لینک دانلود خراب است",
      [
      //  { <Icon name="play" size={responsiveFontSize(3)}/>},
        { text: "باشه",onPress: () => console.log("OK Pressed"), style:{fontFamily:Strings.fontFamilyLight}}
      ],
      { cancelable: false }
    )
   
}
 const UploadHomework=()=>{
  console.warn('FilePickerManager = ', resultUpload);
  if( resultUpload===undefined)
 { FilePickerManager.showFilePicker(null, (response) => {
    console.warn('Response = ', response); 
    if (response.didCancel) {
      console.warn('User cancelled file picker');
    }
    else if (response.error) {
      console.warn('FilePickerManager Error: ', response.error);
    }
    else {
      console.warn("log file data",response.base64)
      let url = response.uri;
     setFile(response)
    
 RNFetchBlob.fs
 .readFile(response.uri, 'base64')
 .then((data) => {
   console.warn("dataaaaaaaaaa",response.type)
   var fileInfo={
    homeWorkId:-1,
    courseStepId:item.fldPkCourseStepCo,
    file:`data:${response.type};base64,${data}`,
    type:response.type==='image/jpeg' &&"jpg" || response.type==='application/pdf' &&"pdf"||response.type==='application/msword'&& 'word'
   }
   dispatch(UploadFile(fileInfo))
 })
 .catch((err) => {});
    
    }
  });}
 }

 const downloadHomework=()=>{
    setLoading(true)
    var url= item.fldFileUrl
    var checkUrl=url.slice(0,4)
  //  console.warn("###########",checkUrl)
    checkUrl==="http"?
  getFile(item.fldFileUrl): Alert.alert(
      "",
      "لینک دانلود خراب است",
      [
      //  { <Icon name="play" size={responsiveFontSize(3)}/>},
        { text: "باشه",onPress: () => console.log("OK Pressed"), style:{fontFamily:Strings.fontFamilyLight}}
      ],
      { cancelable: false }
    );
 }

  const showVideo=async(streamId,fldLocalStream)=>{
     vodMode = await getAsyncStorage('vodMode')
      // console.warn("!!",data)
    push(Props.navigation, (fldLocalStream==="") ?(Screens.VideoWeb):(Props.navigation, streamId===""||vodMode==="2" ? Screens.NormalVideo: Screens.VideoWeb), Screens.InfoCourse,{item:item })
  }
  // console.warn("item/s in offlinecard ",item)
    return(
        <View  style={[{
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius:10,
            borderColor: 'white',
            width:Props.horizontal ? responsiveWidth(50) : responsiveWidth(89),
            alignSelf: 'center',
            marginBottom: responsiveWidth(1),
            padding: responsiveWidth(3),
            flexDirection:'column',
            maxHeight:Props.horizontal?responsiveHeight(43):null,
            minHeight:Props.horizontal?responsiveHeight(43):null,
            alignItems:!Props.horizontal ?'flex-end' : 'center',
        }]}>
        
            <View style={{flexDirection:Props.horizontal?'column':'row-reverse'}}>
          
           {!isEmpty(item.fldStreamId) ||  !isEmpty(item.fldLocalStream) && !Props.horizontal? 
           <TouchableOpacity onPress={()=>showVideo(item.fldStreamId,item.fldLocalStream)}
                style={{marginHorizontal:responsiveWidth(2),alignItems:'center',borderRadius:20, borderColor:Colors.placeholderTextColor,borderWidth:Props.horizontal?null:0.5}}>
                
               {Props.horizontal!==true &&<View>
                <Image style={{width:responsiveWidth(30), height:Props.horizontal?responsiveWidth(10):responsiveWidth(25)}}/>
                <View style={{width:responsiveWidth(30), height:responsiveWidth(20),
                    position:'absolute',backgroundColor:'transparent',left:responsiveWidth(2),top:responsiveWidth(5)}}>
                    <Icon name={'play'} size={responsiveFontSize(8)} style={{alignSelf:'center'}} color={Colors.placeholderTextColor}/>
                </View>
                </View>
                }
            </TouchableOpacity>:null}
                <View style={{marginEnd:responsiveWidth(2)}}>
                {/* {console.warn("publish date",item.fldStartDateTime)} */}
                    <Text style={[TextCss.menualText,{maxWidth:responsiveWidth(45),textAlign:'right',alignSelf:'flex-end',fontSize:Props.horizontal? width*0.030: responsiveWidth(5)}]}>{item.fldTitle}</Text>
                    <Text style={[TextCss.menualText,{textAlign:'right',alignSelf:'flex-end',fontSize:Props.horizontal? width*0.020: width*0.030}]}>{moment(item.fldStartDateTime, "YYYY-MM-DDThh:mm:ss").format('jYYYY/jMM/jDD')}</Text>
                    {item.fldTopic1!==""&& !Props.horizontal &&<Text  style={[TextCss.menualText,{maxWidth:responsiveWidth(45),textAlign:'right',alignSelf:'flex-end',fontSize:Props.horizontal? width*0.020: width*0.030}]}>{item.fldTopic1}</Text>}
                </View>
               
            </View>
            {item.fldType===5 &&!isEmpty(item.fldStreamId) ||  !isEmpty(item.fldLocalStream) && !Props.horizontal? 
           <TouchableOpacity onPress={()=>showVideo(item.fldStreamId,item.fldLocalStream)}
                style={{marginHorizontal:responsiveWidth(2),alignItems:'center',borderRadius:20, borderColor:Colors.placeholderTextColor,borderWidth:Props.horizontal?null:0.5}}>
                
               {Props.horizontal===true &&<View>
                <Image style={{width:responsiveWidth(30), height:Props.horizontal?responsiveWidth(10):responsiveWidth(25)}}/>
                <View style={{width:responsiveWidth(30), height:responsiveWidth(20),
                    position:'absolute',backgroundColor:'transparent',left:responsiveWidth(2),top:responsiveWidth(5)}}>
                    <Icon name={'play'} size={responsiveFontSize(8)} style={{alignSelf:'center'}} color={Colors.placeholderTextColor}/>
                </View>
                </View>
                }
            </TouchableOpacity>:null}
        
           {  Props.horizontal ? <View style={{flexDirection:'row'}}>    
                  
           { !isEmpty(item.fldStreamId) || !isEmpty(item.fldLocalStream)? <TouchableOpacity style={{flex:1}} onPress={  ()=>showVideo(item.fldStreamId,item.fldLocalStream)}>
            <Button loading={false}
                    style={{marginBottom: 0, marginTop: 20}}
                    icon={'film'}
                    widthOfButton={Props.horizontal ?responsiveWidth(20) : responsiveWidth(80)}
                    buttonType={'Active'}
                    textValue={'پخش ویدیو'}
                    iconStyle={{color:'white'}}
                    textStyle={{fontSize:Props.horizontal?width*0.020:responsiveFontSize(2)}}
                    btnStyle={{backgroundColor:Colors.secondColor}}
                    height={Props.horizontal ? responsiveWidth(7) : responsiveWidth(11)}
                    />
            </TouchableOpacity>: null}
            {(Props.horizontal && item.fldFileUrl && item.fldType!==2 && item.fldType!==4) ?<TouchableOpacity  style={{flex:1}} onPress={()=>{ downloadFile(item.fldFileUrl)}}>
            <Button loading={Loading}
                    style={{marginBottom: 0, marginTop: 20, }}
                    icon={'download'}
                    widthOfButton={Props.horizontal ?responsiveWidth(20) : responsiveWidth(80)}
                    buttonType={'Active'}
                    textValue={Strings.fileDl}
                    iconStyle={{color:'white'}}
                    textStyle={{fontSize:Props.horizontal?width*0.020:responsiveFontSize(2)}}
                    height={Props.horizontal ? responsiveWidth(7) : responsiveWidth(11)}

                    />
            </TouchableOpacity>:null}
         
            {(year<ExamYear ||(year===ExamYear && month+1<ExamMonth) || year ===ExamYear && month+1 ===ExamMonth && day<ExamDay||year ===ExamYear && month+1 ===ExamMonth && day===ExamDay && hour<ExamHour ||year ===ExamYear && month+1 ===ExamMonth && day===ExamDay && hour===ExamHour && minutes<ExamMin)  &&(item.fldType===2 || item.fldType===6 || item.fldType===7) && Props.horizontal && item.fldIsEnded!==true && <TouchableOpacity onPress={()=>EnterExamPress(item)}>
            <Button loading={false}
                    style={{marginBottom:0, marginTop: 20,}}
                    containStyle={{backgroundColor:"#7986CB"}}
                    // Image={require("../assets/image/exam.png")}
                    ImageStyle={{width:30,height:30}}
                    widthOfButton={Props.horizontal ?responsiveWidth(20) : responsiveWidth(80)}
                    buttonType={'Active'}
                    textValue={( Strings.notStart) }
                    icon={"arrow-circle-left"}
                    iconStyle={{color:'white'}}
                    textStyle={{fontSize:responsiveFontSize(1.3)}}
                    height={Props.horizontal ? responsiveWidth(7) : responsiveWidth(11)}
                    />
            </TouchableOpacity>}
            {( year > selectedYear ||(year===selectedYear && month+1>selectedMonth) || year ===selectedYear && month+1 ===selectedMonth && day>selectedDay )  &&(item.fldType===2 || item.fldType===6 || item.fldType===7) && Props.horizontal && item.fldIsEnded!==true && <TouchableOpacity onPress={()=>getFile(item.fldFileUrl)}>
            <Button loading={false}
                    style={{marginBottom:0, marginTop: 20}}
                    containStyle={{backgroundColor:"#7986CB"}}
                    // Image={require("../assets/image/exam.png")}
                    ImageStyle={{width:30,height:30}}
                    widthOfButton={Props.horizontal ?responsiveWidth(20) : responsiveWidth(80)}
                    buttonType={'Active'}
                    textValue={( Strings.QuestionAnswer) }
                    icon={"arrow-circle-left"}
                    iconStyle={{color:'white'}}
                    textStyle={{fontSize:responsiveFontSize(1.3)}}
                    height={Props.horizontal ? responsiveWidth(7) : responsiveWidth(11)}
                    />
            </TouchableOpacity>}
        
            {!(( year > selectedYear ||(year===selectedYear && month+1>selectedMonth)) || year ===selectedYear && month+1 ===selectedMonth && day>selectedDay ) && (year>ExamYear ||(year===ExamYear && month+1>ExamMonth) || year ===ExamYear && month+1 ===ExamMonth && day>ExamDay ||year ===ExamYear && month+1 ===ExamMonth && day===ExamDay && hour>ExamHour ||year ===ExamYear && month+1 ===ExamMonth && day===ExamDay && hour===ExamHour && minutes>ExamMin) &&(item.fldType===2 ||item.fldType===6 && item.fldType===7) && Props.horizontal && <TouchableOpacity onPress={()=>EnterExamPress(item)}>
            <Button loading={false}
                    style={{marginBottom:0, marginTop: 20,}}
                    containStyle={{backgroundColor:"#7986CB"}}
                    // Image={require("../assets/image/exam.png")}
                    ImageStyle={{width:30,height:30}}
                    widthOfButton={Props.horizontal ?responsiveWidth(20) : responsiveWidth(80)}
                    buttonType={'Active'}
                    textValue={( Strings.EnterExam) }
                    icon={"arrow-circle-left"}
                    iconStyle={{color:'white'}}
                    textStyle={{fontSize:responsiveFontSize(1.3)}}
                    height={Props.horizontal ? responsiveWidth(7) : responsiveWidth(11)}
                    />
            </TouchableOpacity>}
            {/* {item.fldType===2 && Props.horizontal && item.fldIsEnded!==true && <TouchableOpacity onPress={()=>EnterExamPress(item)}>
            <Button loading={false}
                    style={{marginBottom:0, marginTop: 20,}}
                    containStyle={{backgroundColor:"#7986CB"}}
                    // Image={require("../assets/image/exam.png")}
                    ImageStyle={{width:30,height:30}}
                    widthOfButton={Props.horizontal ?responsiveWidth(20) : responsiveWidth(80)}
                    buttonType={'Active'}
                    textValue={StartExam==="1"&&Strings.notStart ||StartExam==="1"&&Strings.endExam || StartExam==="3" && Strings.EnterExam}
                    icon={"arrow-circle-left"}
                    iconStyle={{color:'white'}}
                    textStyle={{fontSize:responsiveFontSize(1.4)}}
                    height={Props.horizontal ? responsiveWidth(7) : responsiveWidth(11)}
                    />
            </TouchableOpacity>} */}
            </View>:null}

            
           {
              
             (item.fldFileUrl && !Props.horizontal && item.fldType!==2 && item.fldType!==4 && item.fldType!==6 && item.fldType!==7  )? 
           <TouchableOpacity onPress={  ()=> { 
             setLoading(true)
             var url= item.fldFileUrl
             var checkUrl=url.slice(0,4)
            //  console.warn("###########",checkUrl)
             checkUrl==="http"?
            getFile(item.fldFileUrl): Alert.alert(
         "",
         "لینک دانلود خراب است",
         [
          //  { <Icon name="play" size={responsiveFontSize(3)}/>},
           { text: "باشه",onPress: () => console.log("OK Pressed"), style:{fontFamily:Strings.fontFamilyLight}}
         ],
         { cancelable: false }
       );}}>
            <Button
                    loading={false}
                    style={{marginBottom: 0, marginTop: 20}}
                    icon={'download'}
                    widthOfButton={Props.horizontal ?responsiveWidth(20) : responsiveWidth(80)}
                    buttonType={'Active'}
                    textValue={Strings.fileDl}
                    iconStyle={{color:'white'}}
                    textStyle={{fontSize:responsiveFontSize(2)}}
                    height={Props.horizontal ? responsiveWidth(7) : responsiveWidth(11)}
                    />
            </TouchableOpacity>:null}
            {
              
              (item.fldFileUrl && !Props.horizontal && item.fldType!==2 && item.fldType===4 )? 
              <View style={{flexDirection:"row",alignSelf:"center"}}>
              {(year > selectedYear ||(year===selectedYear && month+1>selectedMonth) || year ===selectedYear && month+1 ===selectedMonth && day>selectedDay || year ===selectedYear && month+1 ===selectedMonth && day===selectedDay &&hour>selectedHour|| year ===selectedYear && month+1 ===selectedMonth && day===selectedDay && hour===selectedHour && minutes>selectedMin) ? 
              <TouchableOpacity  style={{justifyContent:"center",backgroundColor:"red",marginRight:5,borderRadius:5,width:Props.horizontal ?responsiveWidth(20) : responsiveWidth(30),height:Props.horizontal ? responsiveWidth(7) : responsiveWidth(11),alignItems:"center"}}  onPress={()=>downloadHomeworkAnswers()}>
                      <Text style={{fontFamily:Strings.fontFamilyLight,color:"white"}}>{Strings.downloadAnswers}</Text>
                </TouchableOpacity>:
                <TouchableOpacity  style={{justifyContent:"center",backgroundColor:"red",marginRight:5,borderRadius:5,width:Props.horizontal ?responsiveWidth(20) : responsiveWidth(30),height:Props.horizontal ? responsiveWidth(7) : responsiveWidth(11),alignItems:"center"}}  onPress={()=>UploadHomework()}>
                      <Text style={{fontFamily:Strings.fontFamilyLight,color:"white"}}>{resultUpload!==undefined && resultUpload.data.code===200 ?Strings.sentFile:Strings.UploadAnswer}</Text>
                </TouchableOpacity>
                }
                <TouchableOpacity  style={{justifyContent:"center",backgroundColor:"#7986CB",borderRadius:5,width:Props.horizontal ?responsiveWidth(20) : responsiveWidth(30),height:Props.horizontal ? responsiveWidth(7) : responsiveWidth(11),alignItems:"center"}}  onPress={()=>downloadHomework()}>
                      <Text style={{fontFamily:Strings.fontFamilyLight,color:"white"}}>{Strings.dowloadHomework}</Text>
                </TouchableOpacity>
                
            </View>
             :null}
             {/* {item.fldType===5 && !Props.horizontal &&  !isEmpty(item.fldStreamId) || !isEmpty(item.fldLocalStream)? <TouchableOpacity style={{flex:1}} onPress={  ()=>showVideo(item.fldStreamId,item.fldLocalStream)}>
            <Button loading={false}
                    style={{marginBottom: 0, marginTop: 20}}
                    icon={'film'}
                    widthOfButton={Props.horizontal ?responsiveWidth(20) : responsiveWidth(80)}
                    buttonType={'Active'}
                    textValue={'پخش ویدیو'}
                    iconStyle={{color:'white'}}
                    textStyle={{fontSize:Props.horizontal?width*0.020:responsiveFontSize(2)}}
                    btnStyle={{backgroundColor:Colors.secondColor}}
                    height={Props.horizontal ? responsiveWidth(7) : responsiveWidth(11)}
                    />
            </TouchableOpacity>: null} */}
             {console.warn("*****data in items,",item)}
            {item.fldType===5  && !(year > selectedYear ||(year===selectedYear && month+1>selectedMonth) || year ===selectedYear && month+1 ===selectedMonth && day>selectedDay || year ===selectedYear && month+1 ===selectedMonth && day===selectedDay &&hour>selectedHour|| year ===selectedYear && month+1 ===selectedMonth && day===selectedDay && hour===selectedHour && minutes>selectedMin)  && !Props.horizontal   ?
            <TouchableOpacity style={{flex:1,backgroundColor:"#7986CB",borderRadius:5,padding:5,alignSelf:"flex-start"}} onPress={()=>push(Screens.VideoPlayer)}>
                <Text style={{fontFamily:Strings.fontFamilyLight,color:"white"}}>{Strings.GoToClass}</Text>
            </TouchableOpacity>: null}
             {  
              (item.fldFileUrl && Props.horizontal && item.fldType!==2 && item.fldType===4 )? 
              <View style={{flexDirection:"row",alignSelf:"center"}}>
              {(year > selectedYear ||(year===selectedYear && month+1>selectedMonth) || year ===selectedYear && month+1 ===selectedMonth && day>selectedDay || year ===selectedYear && month+1 ===selectedMonth && day===selectedDay &&hour>selectedHour|| year ===selectedYear && month+1 ===selectedMonth && day===selectedDay && hour===selectedHour && minutes>selectedMin) ? 
              <TouchableOpacity  style={{justifyContent:"center",backgroundColor:"red",marginRight:5,borderRadius:5,width:Props.horizontal ?responsiveWidth(20) : responsiveWidth(30),height:Props.horizontal ? responsiveWidth(7) : responsiveWidth(11),alignItems:"center"}}  onPress={()=>downloadHomeworkAnswers()}>
                      <Text style={{fontFamily:Strings.fontFamilyLight,color:"white"}}>{Strings.downloadAnswers}</Text>
                </TouchableOpacity>:
                <TouchableOpacity  style={{justifyContent:"center",backgroundColor:"red",marginRight:5,borderRadius:5,width:Props.horizontal ?responsiveWidth(20) : responsiveWidth(30),height:Props.horizontal ? responsiveWidth(7) : responsiveWidth(11),alignItems:"center"}}  onPress={()=>UploadHomework()}>
                      <Text style={{fontFamily:Strings.fontFamilyLight,color:"white"}}>{resultUpload!==undefined && resultUpload.data.code===200 ?Strings.sentFile:Strings.UploadAnswer}</Text>
                </TouchableOpacity>
                }
                <TouchableOpacity  style={{justifyContent:"center",backgroundColor:"#7986CB",borderRadius:5,width:Props.horizontal ?responsiveWidth(20) : responsiveWidth(30),height:Props.horizontal ? responsiveWidth(7) : responsiveWidth(11),alignItems:"center"}}  onPress={()=>downloadHomework()}>
                      <Text style={{fontFamily:Strings.fontFamilyLight,color:"white"}}>{Strings.dowloadHomework}</Text>
                </TouchableOpacity>
                
            </View>
             :null}

            {/* {console.warn("@@@@@@@check hour for exam",item.fldTitle,year===ExamYear , month+1===ExamMonth , day===ExamDay, (( year===ExamYear) && (month+1===ExamMonth)&& (day===ExamDay)) &&item.fldType )} */}
          {(year<ExamYear ||(year===ExamYear && month+1<ExamMonth) || year ===ExamYear && month+1 ===ExamMonth && day<ExamDay ||year ===ExamYear && month+1 ===ExamMonth && day===ExamDay  && hour<ExamHour ||year ===ExamYear && month+1 ===ExamMonth && day===ExamDay && ExamHour===hour &&ExamMin>minutes)  &&(item.fldType===2 || item.fldType===6 || item.fldType===7) && !Props.horizontal && <TouchableOpacity onPress={()=>EnterExamPress(item)}>
          <View style={{flexDirection:"row-reverse",flexWrap:"wrap"}}>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}>آزمون از ساعت</Text>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}>{data.slice(10,16)} </Text>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}>تاریخ </Text>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}>{data.slice(0,10)}</Text>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}> تا ساعت </Text>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}>{endData.slice(10,16)}</Text>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}> تاریخ </Text>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}>{endData.slice(0,10)}</Text>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}> باز می باشد. </Text>
          </View>

         
            <Button loading={false}
                    style={{marginBottom:0, marginTop: 20,}}
                    containStyle={{backgroundColor:"#7986CB"}}
                    // Image={require("../assets/image/exam.png")}
                    ImageStyle={{width:30,height:30}}
                    widthOfButton={Props.horizontal ?responsiveWidth(20) : responsiveWidth(80)}
                    buttonType={'Active'}
                    textValue={( Strings.notStart) }
                    icon={"arrow-circle-left"}
                    iconStyle={{color:'white'}}
                    textStyle={{fontSize:responsiveFontSize(2)}}
                    height={Props.horizontal ? responsiveWidth(7) : responsiveWidth(11)}
                    />
            </TouchableOpacity>}
            {( year > selectedYear ||(year===selectedYear && month+1>selectedMonth) || year ===selectedYear && month+1 ===selectedMonth && day>selectedDay || year ===selectedYear && month+1 ===selectedMonth && day===selectedDay && hour>selectedHour || year ===selectedYear && month+1 ===selectedMonth && day===selectedDay && hour===selectedHour && minutes>selectedMin)  &&(item.fldType===2|| item.fldType===6 ||item.fldType===7 )&& !Props.horizontal  && <TouchableOpacity  onPress={()=>getFile(item.fldFileUrl)}>
            <Button loading={false}
                    style={{marginBottom:0, marginTop: 20,}}
                    containStyle={{backgroundColor:"#7986CB"}}
                    // Image={require("../assets/image/exam.png")}
                    ImageStyle={{width:30,height:30}}
                    widthOfButton={Props.horizontal ?responsiveWidth(20) : responsiveWidth(80)}
                    buttonType={'Active'}
                    textValue={(Strings.QuestionAnswer) }
                    icon={"arrow-circle-left"}
                    iconStyle={{color:'white'}}
                    textStyle={{fontSize:responsiveFontSize(2)}}
                    height={Props.horizontal ? responsiveWidth(7) : responsiveWidth(11)}
                    />
            </TouchableOpacity>}
            {(year>ExamYear ||(year===ExamYear && month+1>ExamMonth) || year ===ExamYear && month+1 ===ExamMonth && day>ExamDay|| year ===ExamYear && month+1 ===ExamMonth && day===ExamDay && ExamHour<hour ||year ===ExamYear && month+1 ===ExamMonth && day===ExamDay && ExamHour===hour &&ExamMin<minutes) &&(item.fldType===2 ||item.fldType===6 || item.fldType===7) && !Props.horizontal && !( year > selectedYear ||(year===selectedYear && month+1>selectedMonth) || year ===selectedYear && month+1 ===selectedMonth && day>selectedDay || year ===selectedYear && month+1 ===selectedMonth && day===selectedDay && hour>selectedHour || year ===selectedYear && month+1 ===selectedMonth && day===selectedDay && hour===selectedHour && minutes>selectedMin) && <TouchableOpacity onPress={()=>EnterExamPress(item)}>
            <View style={{flexDirection:"row-reverse",flexWrap:"wrap"}}>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}>آزمون</Text>
              
              <Text  style={{fontFamily:Strings.fontFamilyLight}}> تا ساعت </Text>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}>{endData.slice(10,16)}</Text>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}> تاریخ </Text>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}>{endData.slice(0,10)}</Text>
              <Text  style={{fontFamily:Strings.fontFamilyLight}}> باز می باشد. </Text>
          </View>
            <Button loading={false}
                    style={{marginBottom:0, marginTop: 20,}}
                    containStyle={{backgroundColor:"#7986CB"}}
                    // Image={require("../assets/image/exam.png")}
                    ImageStyle={{width:30,height:30}}
                    widthOfButton={Props.horizontal ?responsiveWidth(20) : responsiveWidth(80)}
                    buttonType={'Active'}
                    textValue={( Strings.EnterExam) }
                    icon={"arrow-circle-left"}
                    iconStyle={{color:'white'}}
                    textStyle={{fontSize:responsiveFontSize(2)}}
                    height={Props.horizontal ? responsiveWidth(7) : responsiveWidth(11)}
                    />
            </TouchableOpacity>}
        </View>
    )
};
export default OfflineCard;
