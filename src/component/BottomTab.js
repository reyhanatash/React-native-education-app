import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Animated, FlatList, SafeAreaView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {Screens, Strings} from '../constant/String';
import {Colors} from '../constant/Colors';
import SearchView from './SearchView';
import renderIf from '../utils/RenderIf';
import {TextCss} from '../style/TextCss';
import {removeAsyncStorage} from '../store/AsyncStorageFunction';
import {setRoot} from '../navigation/Navigation';
import {goToMain, push} from '../screens/MyNavigation/MyNavigation';
import {clearData} from "../redux/action";
import {LOGOUT} from "../redux/action/types";
import messaging from '@react-native-firebase/messaging';
const{width,height}=Dimensions.get('window')

const BottomTab = (Props) => {

    const [showSearch, setShowSearch] = useState(false);
    const [springValue, setSpringValue] = useState(new Animated.Value(0.9));
    const [horizontal, setHorizontal] = useState( Props.horizontal);
    const dispatch = useDispatch()

    const clickOnitems = (type) => {
        switch (type) {
            case 1:
                Props.onMenuPress();
                break;
            case 2:
                goToMain(Screens.Home, Props.Navigation);
                break;
            case 3:
                push(Props.Navigation, Screens.VideoPlayer, 'Home');
                break;
            case 4:
                removeAsyncStorage('token').done(() => setRoot(Screens.SplashScreen));
                dispatch(clearData(LOGOUT))
                messaging().deleteToken()
                break;
            case 5:
                push(Props.Navigation, Screens.Censure, '');
                break;
            case 6:
                push(Props.Navigation, Screens.Profile, '');
                break;
            case 7:
                push(Props.Navigation,Screens.ChatVeiw,'')
        }
    };
    useEffect(()=>{
        setHorizontal(horizontal)
    },[Props.horizontal])
    const _spring = ()=> {
        springValue.setValue(0.9)
        Animated.spring(
            springValue,
            {
                toValue: 1.1,
                friction: 1,
                useNativeDriver: false,
                tension:40
            }
        ).start()
    }
    const BottomItem = (iconName, type, layoutScreen, text) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                onPress={() => clickOnitems(type)}>
                <Icon name={iconName} size={responsiveFontSize(3)}
                      style={{
                          color: Colors.backgrounColor,
                      }}/>
                {text === undefined ? null : <Text style={[TextCss.menualText, {color: '#fff'}]}>{text}</Text>}
            </TouchableOpacity>
        );
    };

    useEffect(()=>{
        return () => clearInterval();

    },[])
    const animatedBottomItem = (iconName, type, layoutScreen, text) => {
        setInterval(()=>  _spring(),5000)
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                onPress={() => clickOnitems(type)}>
                <Animated.View style={{transform: [{scale: springValue}]}}>
                <Icon name={iconName} size={responsiveFontSize(3)}
                      style={{
                          color: Colors.backgrounColor,
                      }}/>
                {text === undefined ? null : <Text style={[TextCss.menualText, {color: '#fff'}]}>{text}</Text>}
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        renderIf(showSearch, <View style={[styles.container, {
            height:responsiveHeight(15),
                justifyContent: 'center', 
                bottom: responsiveHeight(18),
                        width: responsiveWidth(100),
                        paddingHorizontal: responsiveWidth(6),
            }]}><SearchView onClose={() => setShowSearch(false)}/></View>
            , <View style={[styles.container, {
                height: responsiveHeight(25),
                        width: responsiveWidth(100),
                        paddingHorizontal: responsiveWidth(6),
                        top:Props.horizontal ? responsiveHeight(69) : responsiveHeight(72)
                        // bottom: responsiveHeight(horizontal?10:18),
            }]}>
                {/* <View style={{zIndex:100,flexDirection: 'row', justifyContent: 'space-around',  marginTop:responsiveHeight(2)}}>
                    {BottomItem('sign-out', 4, '', Strings.exit)}
                 
                    {BottomItem('user', 6, '', Strings.Profile)}

                </View> */}
                <View style={[styles.container, {flexDirection: 'row', height:responsiveHeight(6),
                        width: responsiveWidth(100),
                        paddingHorizontal: responsiveWidth(6),
                        bottom:responsiveHeight(0),
                        alignItems:'center',
                        marginBottom:width*0.020
                        
                        }]}>
                       {/* {BottomItem('sign-out', 4, '')} */}
                 
                    {BottomItem('user', 6, '')}

                    {/* {BottomItem('dashboard', 1, '')} */}
                    {/* // { Props.hasLive ===true ? animatedBottomItem('file-movie-o', 3, '') : null}
                    // {BottomItem('comments', 7, '')} */}
                    { Props.hasLive ===true ? animatedBottomItem('video-camera', 3, '') : null}
                    {/* {BottomItem('comment', 7, '')} */}
                    {BottomItem('home', 2, '')}
                    {/* <Text>ettert</Text> */}
                </View>
            </View>)

    );

};

export default BottomTab;

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
      
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: '#888',
        borderRadius: 2,
        shadowColor: '#efefef',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        position: 'absolute',


    },
    BottomTabsTextStyle: {
        color: 'white',
        alignSelf: 'center',
        lineHeight: responsiveWidth(5),
        // fontFamily: Strings.fontIRNSansSmallMedium,
        fontSize: responsiveWidth(5),
    },
});
