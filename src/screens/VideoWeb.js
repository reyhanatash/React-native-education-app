import React, {useState,useEffect,useRef} from 'react';
import {View,ActivityIndicator,Dimensions,Platform} from 'react-native';
import WebView from 'react-native-webview';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Orientation from 'react-native-orientation';
import {getAsyncStorage} from '../store/AsyncStorageFunction'
const {width,height}=Dimensions.get('window')
const VideoWeb = (Props) => {

    const [height, setheight] = useState(0);
    const [width, setWidht] = useState(0);
    const [isLand,setLand] = useState(false)
    const [token,SetToken]=useState("")
    const scalesPageToFit = Platform.OS === 'android'
    Orientation.addOrientationListener(orientation => {
      if (Orientation === 'PORTRAIT') Orientation.lockToLandscape();
    });


  const   getToken=async() =>{
      var getToken=await getAsyncStorage('token')
        SetToken(getToken);
      }
    
 useEffect(()=>{
  Orientation.lockToLandscape();
  setheight(responsiveWidth(100));
    setWidht(responsiveHeight(100));
 },[Props.params.item])

  useEffect(()=>{
   
    getToken()
  
  },[token])
console.warn("$$$$$$$$$$$$$$$$$$ video web",`https://1400.tamland.ir/static-page/vodMobile.html?id=${Props.params.item.fldStreamId}&token=${token}&session=${Props.params.item.fldPkCourseStepCo}`)
    return (
          <WebView
          // style={{width:height,height:width}}
               allowsFullscreenVideo={true}
               scalesPageToFit={true}
              source={{uri:`https://1400.tamland.ir/static-page/vodMobile.html?id=${Props.params.item.fldStreamId}&token=${token}&session=${Props.params.item.fldPkCourseStepCo}`}}
            />
    );
};
export default VideoWeb;
