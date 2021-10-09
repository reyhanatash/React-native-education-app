import React,{useState,useEffect} from 'react';
import {Text, SafeAreaView, View,Image,Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/Colors';
import {CustomView} from '../style/CustomView';
import {ImageViewCss} from '../style/ImageViewCss';
import {Strings} from '../constant/String';
import {getAnnouncement,getGlobalAnnoncement,readyApi,loadCourser, LOGOUTt} from '../redux/action';
import { string } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';


const {width,height}=Dimensions.get("window")
const InfoExam: () => React$Node = (Props) =>{
    return(
        <View style={{backgroundColor:"white"}}>
            <View style={{padding:width*0.030}}>
                <View style={{borderWidth:1,borderColor:"#7986CB",borderTopRightRadius:10,borderBottomRightRadius:5,padding:8}}>
                      <Text style={{color:"black",fontWeight:"bold",fontSize:width*0.035,fontFamily:Strings.fontFamilyLight,}}>{Strings.examInfo} {Props.title}</Text>
                      <View style={{flexDirection:"row-reverse"}}>
                          <View style={{width:width*0.050,alignItems:"center"}}>
                          <Icon name="hourglass-start" style={{color:"black",marginTop:5}}/>
                          </View>
                          <Text style={{color:"black",fontSize:width*0.035,fontFamily:Strings.fontFamilyLight,}}>{Strings.ExamTime} : {Props.time} {Strings.minutes}</Text>
                      </View>
                      <View style={{flexDirection:"row-reverse"}}>
                      <View style={{width:width*0.050,alignItems:"center"}}>
                          <Image source={require('../assets/image/NumberExam.png')} style={{tintColor:"black",marginTop:5,width:17,height:15,resizeMode:"contain"}}/>
                          </View>
                           <Text style={{color:"black",fontSize:width*0.035,fontFamily:Strings.fontFamilyLight,}}>{Strings.NumberExam} : {Props.numberQuestion}</Text>
                      </View>
                </View>
            </View>
            
        </View>
    )
};
export default  InfoExam;

