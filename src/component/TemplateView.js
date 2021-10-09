import React, {useEffect, useState, useRef,useContext} from 'react';
import {ImageBackground, Image, TouchableOpacity, Animated, View,Text,Dimensions} from 'react-native';
// import Orientation from 'react-native-orientation';
import {ButtonCss} from '../style/ButtonCss';
import {Colors} from '../constant/Colors';
import {removeAsyncStorage} from '../store/AsyncStorageFunction';
import {ImageViewCss} from '../style/ImageViewCss';
import {responsiveHeight, responsiveWidth,responsiveFontSize} from 'react-native-responsive-dimensions';
import BottomTab from './BottomTab';
import {Screens, Strings} from '../constant/String';
import renderIf from '../utils/RenderIf';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Navigation} from 'react-native-navigation';
import CustomConnectionSnackbar from './CustomConnectionSnackbar';
import {clearData, userLiveList, animationView,LOGOUT,LOGOUTt} from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import { fromPairs } from 'lodash';
import {setRoot} from '../navigation/Navigation';
import { CLEAR_NOTIFICATION } from '../redux/action/types';
import messaging from '@react-native-firebase/messaging';
const {width,height}=Dimensions.get('window')

const TemplateView = (Props) => {
    const dispatch = useDispatch()
    const [bottomLayout, setBottomLayout] = useState(Screens.Home);
    const [animationValue, setAnimationValue] = useState(new Animated.Value(Props.height-10));
    const [animState, setAnimState] = useState(true);
    const [orientationLand, setLandOrientation] = useState("PORTRAIT");
    const [imageHeight, setImageHeight] = useState(null);
    const notification = useSelector(state => state.globalReducer.notification);


    const hasLive = useSelector(state => state.liveStream.hasLive);

  
    useEffect(() => {
        Dimensions.addEventListener('change', ({window:{width,height}})=>{
          if (width<height) {
            setLandOrientation(false)
          } else {
            setLandOrientation(true)
        
          }
        })
    
      }, []);

    useEffect(()=>{
        console.log('get nitif',notification)
        if (notification !== '' && notification !== undefined) {
            useRef.ReactNativeConnectionSnackBar.ShowConnectionSnackBarFunction(notification.body);
            // setTimeout(() => {
            //     dispatch(clearData(CLEAR_NOTIFICATION))
            // }, 10000);
        }
    },[notification])

 
    useEffect(()=>{
        setAnimationValue(new Animated.Value(orientationLand ?  Props.height-10 : Props.height))
        setImageHeight(orientationLand ?  responsiveHeight(110) : responsiveHeight(115))
    },[Props.height])
    const toggleAnimation = () => {
    //   if(orientationLand===false){
    //     if (animState === true) {
    //         Animated.timing(animationValue, {
    //             toValue: orientationLand ? Props.animHeight-10 : Props.animHeight,
    //             timing: 1500,
    //             useNativeDriver: false,
    //         }).start(() => {
    //             setAnimState(false);
    //             dispatch(
    //                 animationView())
    //         });
    //     } else {
    //         Animated.timing(animationValue, {
    //             toValue:orientationLand? Props.height-10:  Props.height,
    //             timing: 1500,
    //             useNativeDriver: false,
    //         }).start(setAnimState(true),
    //         dispatch(
    //             animationView())
    //         );
    //     }}
    };

    useEffect(() => {
        if (Props.message !== '' && Props.message !== undefined) {
            useRef.ReactNativeConnectionSnackBar.ShowConnectionSnackBarFunction(Props.message);
        }
    }, [Props.message]);
    // const BottomItem = (iconName, type, layoutScreen, text) => {
    //     return (
    //         <TouchableOpacity
    //             style={{
    //                 flexDirection: 'column',
    //                 alignItems: 'center',
    //                 bacgoundColor:"red"
    //             }}
    //             onPress={() => clickOnitems(type)}>
    //             <Icon name={iconName} size={responsiveFontSize(3)}
    //                   style={{
    //                       color: Colors.backgrounColor,
    //                   }}/>
    //             {text === undefined ? null : <Text style={[TextCss.menualText, {color: 'red'}]}>{text}</Text>}
    //         </TouchableOpacity>
    //     );
    // };
    const PressExit=()=>{
        // removeAsyncStorage('token')
        dispatch(LOGOUTt())
        // dispatch(clearData(LOGOUT))
        messaging().deleteToken()
    }
console.warn("@@@@@@@@@@@@@oriention",orientationLand)
    return (
        <ImageBackground
            resizeMode='cover'
            style={[Props.ImageStyle,{ width: responsiveWidth(100),height: imageHeight}]}
            source={orientationLand ? require( '../assets/image/back_home_land.png'): Props.src}

            >         
            <CustomConnectionSnackbar
                autoHide={true}
                ref={(input) => {
                    useRef.ReactNativeConnectionSnackBar = input;
                }}
            />
          
            {Props.NavigationProps.componentId !== 'Home' ? <TouchableOpacity style={{
                position: 'absolute', padding: 15, left: responsiveWidth(2), top: responsiveWidth(2), zIndex: 10,
            }} onPress={() => Navigation.pop(Props.NavigationProps.previousScreen)}>
                <Icon name={'chevron-left'}  size={orientationLand?responsiveWidth(2):responsiveWidth(3)} color={'#fff'}
                />
            </TouchableOpacity> : null}
           {Props.Profile!==undefined && Props.Profile===true &&  <TouchableOpacity
                style={{
                    // flexDirection: 'row-reverse',
                    alignItems: 'flex-end',
                    padding:10,
                    marginTop:width*0.020
                
                }}
                onPress={()=>PressExit()}
                >
                <Icon name={'sign-out'} size={responsiveFontSize(3)}
                      style={{
                          color:"#5C6BC0",
                       
                      }}/>
                <Text style={[{color:"#5C6BC0",fontSize:width*0.027,fontFamily:Strings.fontFamilyBlack}]}>خروج</Text>
            </TouchableOpacity>}

            {renderIf(Props.BottomTabs, <BottomTab onMenuPress={() => toggleAnimation()}
                                                   bottomLayout={(screen) => setBottomLayout(screen)}
                                                   Navigation={Props.NavigationProps}
                                                   selectedLayout={bottomLayout}
                                                   hasLive={hasLive}
                                                       horizontal={orientationLand}
                                                   />)}


            <Animated.View style={[Props.ViewStyle, {
                borderTopWidth: 1,
                position: 'absolute',
                borderRadius:responsiveWidth(8),
                zIndex: 100,
                // borderColor: Colors.buttonBorderActiveColor,
                borderColor: 'transparent',
                height: animationValue,
            }]}>
                {Props.children}
            </Animated.View>
       
        </ImageBackground>

    );

};

export default TemplateView;

