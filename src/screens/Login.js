import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  AsyncStorage,
  Dimensions,
  Linking
} from 'react-native';
import {CustomView} from '../style/CustomView';
import CustomTextInput from '../component/CustomTextInput';
import Button from '../component/Button';
import InfoUserModal from '../dataModal/InfoUserModal';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Orientation from 'react-native-orientation';

import {Screens, Strings} from '../constant/String';
import {Colors} from '../constant/Colors';
import {TextCss} from '../style/TextCss';
import {goToMain, push} from './MyNavigation/MyNavigation';
import {
  useNavigationComponentDidAppear,
  useNavigationComponentDidDisappear,
} from 'react-native-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {sha256} from 'react-native-sha256/sha256';

import CustomConnectionSnackbar from '../component/CustomConnectionSnackbar';
import {clearData, token, getConnection, getVodMode} from '../redux/action';
import {saveAsyncStorage,getAsyncStorage} from '../store/AsyncStorageFunction';
import {
  CLEAR_LIVE,
  CLEAR_MESSAGE_LOGIN,
  CLEAR_MESSAGE_PROFILE,
  CLEAR_MESSAGE_TOKEN,
} from '../redux/action/types';
import firebase from '@react-native-firebase/app';


export const RoleMap = new Map([
  ['8592737698', 1], //admin
  ['4842591949', 2], //member
  ['5845214698', 3], //middleadmin
  ['1258965876', 4], //classadmin
  ['6932586532', 5], //OperatorAdmin
  ['4747458632', 6], //LocalAdmin
  ['9876723196', 7], //Teacher
  ['2589634510', 8], //Consultant
]);

let lastScreen = [];
let code = '';

const Login = Props => {

  let formData1 = [
    {
      id: 0,
      label: Strings.cellphone,
      placeholder: mobile,
      returnKeyType: 'next',
      currentRef: input => {
        useRef.one = input;
      },
      onSubmitEditing: () => {
        useRef.two.focus();
      },
      maxLength: 30,
      keyboardType: 'phone-pad',
      type: 'name',
      onFocus: type => null,
      onBlur: type => null,
      onChange: value => setMobile(value),
      // inputValue: InfoUserModal.PhoneNumber,
      iconName: 'mobile',
    },
    {
      id: 1,
      label: Strings.password,
      returnKeyType: 'next',
      currentRef: input => {
        useRef.two = input;
      },
      onSubmitEditing: () => {},
      maxLength: 50,
      keyboardType: 'default',
      type: 'default',
      secureTextEntry: true,
      onFocus: type => null,
      onBlur: type => null,
      onChange: value => changePassword(value),
      iconName: 'lock',
    },
  ];
  /*****************calling from redux*********/
  const {width,height}=Dimensions.get("window")
  const dispatch = useDispatch();
  const [password, changePassword] = useState('');
  const [orientationLand, setLandOrientation] = useState(false);
  const [mobile, setMobile] = useState('');
  const loginSelector = useSelector(state => state.athuReducer.data);
  const {vodMode} = useSelector(state => state.athuReducer);
  const loadingLogin = useSelector(state => state.athuReducer.loadingLogin);
  const allstate = useSelector(state => state.athuReducer);
  const courseStepCo = useSelector(state => state.liveStream);
  var data =
    courseStepCo.lenght !== 0 &&
    courseStepCo.data[0] !== undefined &&
    courseStepCo.data[0].fldPkCourseStepCo;
  code = data.toString();

  useEffect(() => {
    const initial = Orientation.getInitialOrientation();

    if (initial === 'LANDSCAPE') setLandOrientation(true);
    else if (initial === 'PORTRAIT') setLandOrientation(false);

    Orientation.addOrientationListener(orientation => {
      console.log(orientation);
      if (orientation === 'LANDSCAPE') setLandOrientation(true);
      else if (orientation === 'PORTRAIT') setLandOrientation(false);
    });
  }, []);

  const getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      await saveAsyncStorage('firebaseToken', fcmToken);
      dispatch(getVodMode());
    } else {
      console.log('Failed', 'No token received');
    }
  };

  useEffect(() => {
    if(vodMode!==-1){
    saveAsyncStorage('vodMode', vodMode);
    dispatch(clearData(CLEAR_MESSAGE_TOKEN));
    goToMain(Screens.MiddlePageForMessage, Props);
    }
  }, [vodMode]);

  useEffect(() => {
    getFcmToken();
    if (loginSelector !== undefined) {
      {
        let role;
        role = RoleMap.get(loginSelector.secret);

        if (loginSelector.length !== 0) {
        console.warn("!!!!!!!!!!!!!!login data,",loginSelector.jwt)
          saveAsyncStorage('token', loginSelector.access_token);
          saveAsyncStorage('secret', role.toString());
          saveAsyncStorage('jwt',loginSelector.jwt)
          //     const connection = signalr.hubConnection('https://jabiz.famiran.com', {
          //      qs: {
          //        access_token:loginSelector.access_token
          //      },
          //    });
          //     connection.logging = true;
          //     dispatch(getConnection( connection))
          //     connection.start().done(async () => {
          //       }).fail((e) => {

          //         console.warn('Failed',e);
          //       });
        
          //   .then(() =>
          //     goToMain(Screens.MiddlePageForMessage, Props).then(
          //       dispatch(clearData(CLEAR_MESSAGE_TOKEN)),
          //     ),
          //   );
        }
      }
    }
  }, [loginSelector]);

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
  const onLoginPress = async () => {
    
    InfoUserModal.setPhoneNumber(mobile);
    if (
      mobile !== undefined &&
      mobile.length === 11 &&
      password !== '' &&
      mobile !== ''
    ) {
      console.warn("##########################")
        let firebaseToken = await getAsyncStorage('firebaseToken')
        console.warn("##########################",firebaseToken)
        await sha256(password).then( value =>
        dispatch(token(InfoUserModal.PhoneNumber, value,firebaseToken)),
      );
    } else {
      DesplaySnackbar('لطفا نام کاربری و رمز ورود را  وارد کنید');
    }
  };

  useNavigationComponentDidDisappear(e => {
    // clear lastScreen in MyNavigation.js to be able push a screen again
    lastScreen.pop();
  }, Props.componentId);

  useNavigationComponentDidAppear(e => {
    // clear lastScreen in MyNavigation.js to be able push a screen again
    lastScreen.pop();
  }, Props.componentId);
  return (
    <ImageBackground
      source={
        orientationLand
          ? require('../assets/image/back_land_login.png')
          : require('../assets/image/01.png')
      }
      resizeMode="cover"
      style={[
        {
          width: responsiveWidth(100),
          height: responsiveHeight(105),
          backgroundColor: Colors.mainTextColor,
        },
      ]}>
      <CustomConnectionSnackbar
        autoHide={true}
        ref={input => {
          useRef.ReactNativeConnectionSnackBar = input;
        }}
      />
  
      <ScrollView
    
        style={[
          {
            backgroundColor: Colors.backgrounColor,
            paddingTop: 30,
            borderTopWidth: 1,
            borderBottomEndRadius: 0,
            borderBottomStartRadius: 0,
            borderTopColor: Colors.backgrounColor,
            borderRadius: responsiveWidth(5),
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderColor: Colors.buttonBorderActiveColor,
            position: 'absolute',
            bottom: 0,
            width: responsiveWidth(100),
            height: responsiveHeight(65),
          },
        ]}
        contentContainerStyle={{paddingTop: 30, paddingBottom: 30}}>
        <KeyboardAvoidingView style={{flex:1,minHeight:height}} behavior="padding" enabled>
        <View
          style={{alignItems: 'center', marginBottom: responsiveHeight(10)}}>
          <Text style={TextCss.title}>{Strings.loginwelComeText}</Text>
          <TouchableOpacity onPress={() => Linking.openURL("https://1400.tamland.ir/#/signup")}>
              <Text style={[TextCss.menualText,{ textDecorationLine: 'underline',}]}>{Strings.signupDesText}</Text>
          </TouchableOpacity>   
          {formData1.map(item => {
            return (
              <View  key={item.id}>
                <CustomTextInput
                  required={true}
                  editable={true}
                  setBorderColorItem={'#fff'}
                  item={item}
                  height={null}
                  textAlignVertical={null}
                  paddingVertical={null}
                />
              </View>
            );
          })}
          <TouchableOpacity onPress={() => onLoginPress()}>
            <Button
              loading={loadingLogin}
              style={{marginBottom: 0, marginTop: responsiveWidth(5)}}
              icon={null}
              widthOfButton={responsiveWidth(95)}
              buttonType={'Active'}
              textValue={Strings.login}
              textStyle={{marginBottom: 10}}
              height={responsiveWidth(12)}
            />
          </TouchableOpacity>
          <Image
            source={{
              uri:
                'https://tamland.ir/wp-content/uploads/2019/08/tamland-logo-60.png',
            }}
            style={{
              // position: 'absolute',
              width: responsiveWidth(20),
              height: responsiveWidth(20),
              backgroundColor: 'transparent',
              resizeMode: 'contain',
            }}
          />
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    
    </ImageBackground>
  );
};

export default Login;
