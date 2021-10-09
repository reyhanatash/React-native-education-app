import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Modal,
  BackHandler
} from 'react-native';
import {LivePlayer} from "react-native-live-stream";
import WebView  from 'react-native-webview';
import Video from 'react-native-video';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {CollorArray, Strings} from '../constant/String';
import {useDispatch, useSelector} from 'react-redux';
import {ImageViewCss} from '../style/ImageViewCss';
import {TextCss} from '../style/TextCss';
import ClickableIcon from '../component/ClickableIcon';
import * as Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {qualityList} from '../constant/StaticLists';
import SeekBar from '../component/SeekBar';
import {Colors} from '../constant/Colors';
import ModalReactNative from 'react-native-modal';
import {Dimensions} from '../constant/Dimensions';
import {Navigation} from 'react-native-navigation';
import {toPersianDigit} from '../store/GlobalFunction';
import ChatView from '../screens/ChatView';
import {getAsyncStorage} from '../store/AsyncStorageFunction';
import {CustomView} from '../style/CustomView';
import {Screens} from '../constant/String';
import {getCourseStream,getschoolID,LOGOUTt,changeStream} from '../redux/action';
import { isEmpty } from 'lodash';
import {
  useNavigationComponentDidAppear,
  useNavigationComponentDidDisappear,
} from 'react-native-navigation-hooks';

import {
  REFRESH_PAGE
  } from '../redux/action/types'
import { setRoot } from '../navigation/Navigation';
 
let lastScreen = [];

const MediaPlayer = Props => {
  const [pause, setPause] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVolume, setShowVolume] = useState(false);
  const [dataOption, setDataOption] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quality, setQuality] = useState(720);
  const [qualityView, setQualityView] = useState(false);
  const [streamId, setStreamId] = useState(0);
  const [height, setheight] = useState(0);
  const [width, setWidht] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [isAparat, setIsAparat] = useState(true);
  const [AparatLink,setAparaLink]=useState("")
  const [id,setid]=useState("")
  // const livedata = useSelector(state => state.liveStream);
  const liveType = useSelector(state =>{return state.LiveTypeReducer.liveType});
  const {data} = useSelector(state =>{return state.liveStream});
  const liveStatus = useSelector(state =>{return state.globalReducer.dataChangeServer});
  const chekToken= useSelector(state =>{return state.liveStream});
  const schoolIDdata = useSelector(state =>state.SchoolIDReducer);
  const [duration, setDuration] = useState(0);
  console.warn("live data",chekToken)
 let Refresh=false;
console.warn("liveStatus",liveStatus)

  const dispatch = useDispatch();

  const togglePopUp = useCallback(
    event => {
      setShowChat(!showChat);
    },
    [showChat],
  );


  Refresh=useSelector(state=>{
    return state.RefreshPageReducer
  })

  
useEffect(()=>{
  // console.warn("@@@@@@@checktoken",data)
  if(chekToken.expireToken===true){     
      dispatch(LOGOUTt())     
  }
},[chekToken])
  
useEffect(()=>{
  dispatch(getschoolID(data[0].fldPkCourseStepCo))
  var schoolid =schoolIDdata
    if(schoolid===20){
    setid(2)}else{
      setid(1)
    }
},[])


const changeServer=()=>{
  console.warn("live type",isAparat)
  if(isAparat==="famiran"){
    var data={SessionId:streamId,VideoType:"famiran"} 
    dispatch(changeStream(data))
    setIsAparat("aparat")
  }else{
    var data={SessionId:streamId,VideoType:"aparat"} 
   if (isAparat==="aparat")  {dispatch(changeStream(data))
  setIsAparat("famiran")}}

}

  useEffect(()=>{  
    if(Refresh===true){
      console.warn("**********streamid",streamId)
   dispatch(getCourseStream(streamId))
   dispatch({
    type:REFRESH_PAGE,
    payload:false,
  });
  }
  },[Refresh])


  useEffect(() => {
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToLandscape();
    }


    if (data.length > 1) setDataOption(true);
    else {
      setDataOption(false);
      setStreamId(data[0].fldPkCourseStepCo)
     dispatch( getCourseStream(data[0].fldPkCourseStepCo));

    }
    setheight(responsiveWidth(100));
    setWidht(responsiveHeight(100));
  }, []);

  useNavigationComponentDidAppear(e => {
    // clear lastScreen in MyNavigation.js to be able push a screen again
    lastScreen.pop();
  }, Props.componentId);
 
  
  useNavigationComponentDidDisappear(e => {
    // clear lastScreen in MyNavigation.js to be able push a screen again
    lastScreen.pop();
  }, Props.componentId);

  const onBackButtonPressAndroid = () => {
   setRoot(Screens.Home)
  };


  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', onBackButtonPressAndroid);
    // return function cleanup() {
    //   BackHandler.removeEventListener(
    //     'hardwareBackPress',
    //     onBackButtonPressAndroid,
    //   );
    // };
  },[])

  useEffect(()=>{
    console.warn("live type",liveType)
    if(!isEmpty(liveType))   
    setIsAparat(liveType)
   },[liveType])
 
   useEffect(()=>{
    //  console.warn("******************",data[0].fldAparatLink)
    if(data){
    setAparaLink(data[0].fldAparatLink)
  }
  },[])


  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => [
          dispatch( getCourseStream(data[0].fldPkCourseStepCo)),
          setStreamId(item.fldPkCourseStepCo),
          setDataOption(false),
        ]}>
        <View
          style={{
            backgroundColor: Colors.mainColor2,
            borderWidth: 1,
            borderRadius: Dimensions.buttonBorderRadius,
            borderColor: 'white',
            marginVertical: responsiveWidth(0.5),
          }}>
          <Text
            style={[
              TextCss.title,
              {
                color: 'white',
                paddingVertical: responsiveWidth(1),
              },
            ]}>
            {toPersianDigit(item.courseName)}
          </Text>
          <Text
            style={[
              TextCss.subText,
              {
                color: 'white',
                paddingVertical: responsiveWidth(1),
              },
            ]}>
            {toPersianDigit(item.courseStepName)}
          </Text>
        </View>
        <View />
      </TouchableOpacity>
    );
  };

  const chooseVideo = () => {
    return (
      <View
        style={[
          {
            borderTopEndRadius: Dimensions.radiusMainVIew,
            borderTopStartRadius: Dimensions.radiusMainVIew,
            flex: 1,
            backgroundColor: 'white',
            marginEnd: responsiveWidth(8),
            marginStart: responsiveWidth(8),
            marginTop: responsiveWidth(8),
          },
        ]}>
        <Text style={[TextCss.menualText, {marginTop: responsiveWidth(2)}]}>
          لطفا یکی از آموزش های آنلاین را انتخاب کنید
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignContent: 'center',
          }}
          style={{
            backgroundColor: 'white',
            marginEnd: responsiveWidth(5),
            marginStart: responsiveWidth(5),
          }}
          data={data}
          renderItem={({item, index}) => renderItem(item)}
          horizontal={false}
        />
      </View>
    );
  };

  const qualityItem = (inner, item, onPress) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.item,
          {
            backgroundColor: inner ? 'rgba(13,13,13,0.5)' : 'transparent',
            borderRightColor: inner ? '#000' : 'transparent',
            borderRightWidth: inner ? 0.5 : 0,
            alignItems: 'center',
          },
        ]}>
        <Text
          style={[
            TextCss.menualText,
            {
              marginTop: 5,
              color: '#ffffff',
              textAlign: 'center',
              alignSelf: 'center',
            },
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const streamVideo = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            width: responsiveHeight(100),
            position: 'absolute',
            bottom: 30,
            // backgroundColor:"red"
          }}>
             {pause? <ClickableIcon
          onPress={() => setPause(!pause)}
          iconName={'play'}
          style={{paddingEnd: 3}}
        />:
         <ClickableIcon
          onPress={() => setPause(!pause)}
          iconName={'pause'}
          style={{paddingEnd: 3}}
        />}
          <ClickableIcon
            onPress={() => [setShowVolume(!showVolume), setQualityView(false)]}
            iconName={'volume-off'}
          />
          {showVolume ? (
            <SeekBar    
                width={width*0.16 }
                step={0.1}
                minimumValue={0}
                maximumValue={duration}  changeVolume={volumeRate => setVolume(volumeRate)} />
          ) : null}

          {qualityItem(false, {name: quality}, () => [
            setQualityView(!qualityView),
            setShowVolume(false),
          ])}
          {qualityView ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={qualityList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) =>
                item.id !== 4
                  ? qualityItem(true, item, () => [
                      setQuality(item.name),
                      setQualityView(!qualityView),
                    ])
                  : null
              }
              horizontal={true}
            />
          ) : null}
        </View>

        <Video
          ref={vp => {
            useRef.vp = vp;
          }}
          source={{
            uri:
              'https://live.famiran.com/liveout/stream' +
              streamId +
              '_' +
              quality +
              '.m3u8',
          }}
          // source={{
          //   uri:
          //     'https://live.famiran.com/liveout/stream' +
          //     streamId +
          //     '_' +
          //     quality +'_'+id+
          //     '.m3u8',
          // }}
          autoplay={true}
          style={[styles.fullScreen, {width: width, height: height}]}
          paused={pause}
          volume={volume}
          resizeMode={'contain'}
          onLoad={(data) =>{ setLoading(false),setDuration (data)}}
          onLoadStart={() => setLoading(false)}
          onEnd={() => console.warn('onEnd')}
          onVideoLoad={() => console.warn('onVideoLoad')}
          fullscreenOrientation={'landscape'}
          onError={null}
          onVideoBuffer={() => console.warn('onVideoBuffer')}
        />
        {/* {streamId!=="" && dataOption!==true && <ChatView streamId={streamId} />} */}
      </View>
    );
  };

  const webVideo = () =>{   
    // https://www.aparat.com/${AparatLink}/live?embed&fa 
    return <WebView source={{uri:`https://www.aparat.com/${AparatLink}/live?embed&fa `}} />;  
  }
  return (
    <View style={isAparat==="aparat" ?CustomView.mainViewScreenStyle:styles.container}>
      <View style={{position: 'absolute', top: 20, left: 10, color: 'white',zIndex:3}}>
        <TouchableOpacity onPress={() => setShowChat(true)}>
          <Icon
            name="comments"
            size={responsiveFontSize(4.5)}
            style={{
              color: "red",
            }}
          />
        </TouchableOpacity>
       {chekToken.data.length!==0 && chekToken.data[0].fldAparatLink!==null && <TouchableOpacity  onPress={() =>changeServer()}  style={{marginTop:width*0.03,alignItems:"center",borderRadius:40,borderWidth:1,backgroundColor:"red",width:40,height:40,alignItems:"center",justifyContent:"center",zIndex:5}}>  
              <Text style={{color:"white",fontSize:6,fontFamily:Strings.fontFamilyBlack,alignSelf:"center"}}> تغییر سرور</Text>     
        </TouchableOpacity>}
      </View>
     
      <ModalReactNative
        animationType="slide"
        visible={dataOption}
        onRequestClose={() => Navigation.pop(Props.previousScreen)}
        transparent={true}>
        
        {chooseVideo()}
      </ModalReactNative>
      <ModalReactNative
        onanimationOut="slideOutDown"
        animationType="slide"
        isVisible={showChat}
        onRequestClose={() => Navigation.pop(Props.previousScreen)}
        transparent={true}>
        {streamId !== '' && dataOption !== true && (
          <ChatView streamId={streamId} hidePopup={togglePopUp} />
        )}
      </ModalReactNative>
      {console.warn("!!!!!!!!aparat link in live video ",isAparat)}
            {/* {webVideo()} */}
     {
      isAparat==="aparat" ? webVideo():streamVideo() } 
    </View>
  );
};
export default MediaPlayer;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  fullScreen: {
    zIndex: -1,
    alignSelf: 'center',
  },
  item: {
    alignContent: 'center',
    paddingHorizontal: responsiveWidth(3),
  },
  video: {
        marginTop: 20,
        height: 200,
        width: 320,
        flex: 1
      } ,
      contain: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
        
          },
});
