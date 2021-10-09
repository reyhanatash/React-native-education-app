import React,{useState,useEffect} from 'react';
import {Text, SafeAreaView, View,Image,Dimensions, TouchableOpacity,ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/Colors';
import {CustomView} from '../style/CustomView';
import {ImageViewCss} from '../style/ImageViewCss';
import {Strings,Screens} from '../constant/String';
import {getAnnouncement,getGlobalAnnoncement,readyApi,loadCourser, LOGOUTt} from '../redux/action';
import { string } from 'prop-types';
import {downloadFile, isEmpty} from '../store/GlobalFunction';
import {push,pop} from "../screens/MyNavigation/MyNavigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import NotificationExam from '../component/NotificationExam'
import InfoExam from '../component/InfoExam'
import {Navigation} from 'react-native-navigation';
import {getDetailExam} from '../redux/action';
import Buton from '../component/Button'

const {width,height}=Dimensions.get("window")
const StartExam: () => React$Node = (Props) =>{
  const item= useSelector(state=>{return state.CourseId})
  const examdetail=useSelector(state=>{return state.globalReducer.ExamDetail})

  // console.warn("examdetail",item)
  const dispatch=useDispatch()

  useEffect(()=>{
 dispatch(getDetailExam(item.fldPkCourseStepCo))
  },[])
// console.warn("examdetail",examdetail)
    return(
      <ScrollView>
        <View style={{backgroundColor:"white",minHeight:height}}>
            <View  style={{backgroundColor:"#7986CB",justifyContent:"space-around",flexDirection:"row-reverse"}}>
                      <Text style={{fontFamily:Strings.fontFamilyBlack,color:"white",fontSize:width*0.040,marginTop:width*0.040,marginBottom:width*0.03,alignSelf:"center",marginRight:width*0.250}}>{Strings.StartExam}</Text>
                      <TouchableOpacity onPress={()=> Navigation.pop(Screens.InfoCourse)}>
                         <Icon name="angle-left"  style={{color:"white",fontSize:width*0.060,marginTop:width*0.030}}/>
                     </TouchableOpacity>
            </View>
            <Image source={require('../assets/image/EnterExam.png')} style={{alignSelf:"center",width:width,height:width*0.650}} />
            <NotificationExam/>
            <InfoExam time={examdetail!==undefined && examdetail.data[0].fldTestTime}  numberQuestion={examdetail!==undefined &&  examdetail.data[0].column1} title={examdetail!==undefined && examdetail.data[0].fldTitle}/>
            <View style={{flexDirection:"row-reverse",alignSelf:"center"}}>
                  <TouchableOpacity onPress={()=> examdetail!==undefined && examdetail.data[0].column1!==0 && push(Props,Screens.Exam)}>
                    <Buton textStyle={{fontSize:width*0.030,alignSelf:"center",ontFamily:Strings.fontFamilyBlack,}} buttonType={"Active"} widthOfButton={width*0.45} textValue={"ورود به آزمون"} containStyle={{backgroundColor:"#7986CB",height:width*0.120,borderRadius:5,alignItems:"center",justifyContent:"center" }}/>
                 </TouchableOpacity>
                 <TouchableOpacity>
                   <Buton textStyle={{fontSize:width*0.030,alignSelf:"center",ontFamily:Strings.fontFamilyBlack,}} buttonType={"Active"} widthOfButton={width*0.45} textValue={"انصراف"} containStyle={{height:width*0.120,borderRadius:5,alignItems:"center",justifyContent:"center",marginLeft:10 }}/>
                 </TouchableOpacity>
                 {/* <Buton  buttonType={"Active"} widthOfButton={width*0.30}/> */}
            </View>
        </View>
        </ScrollView>
    )
};
export default  StartExam;

