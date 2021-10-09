/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect, useState, useRef} from 'react';

import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {Screens, Strings} from '../constant/String';
import {useDispatch, useSelector} from 'react-redux';
import {checkConnection, clearData, userLiveList} from '../redux/action';
import CustomConnectionSnackbar from '../component/CustomConnectionSnackbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../constant/Colors';
import {push, goToMain} from './MyNavigation/MyNavigation';
import renderIf from '../utils/RenderIf';
import Loading from '../component/Loading';
import {getAsyncStorage, saveAsyncStorage} from '../store/AsyncStorageFunction';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {getNotification, getVodMode} from '../redux/action';
import {CLEAR_LIVE} from '../redux/action/types';

const SplashScreen = Props => {
  /*****************calling from redux*********/
  const dispatch = useDispatch();
  const [internetCnctn, setInternetCnct] = useState(true);
  const serverErrorSelector = useSelector(state => state.serverErrorReducer);
  const checkConnectionSelector = useSelector(state => state.globalReducer);
  const {codeFail} = useSelector(state => state.liveStream);
  const {vodMode} = useSelector(state => state.athuReducer);

  let token = '';

  useEffect(() => {
    dispatch(checkConnection());

    //////notification conf
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('Message handled in the background!', remoteMessage);

  
    // });

    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.warn(
    //     'Notification caused app to open from background state:',
    //     remoteMessage,
    //   );
    // });

    // // Check whether an initial notification is available
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       console.log(
    //         'Notification caused app to open from quit state1:',
    //         remoteMessage,
    //       );

    //     }
    //   });

    // // When a user receives a push notification and the app is in foreground
    // /*


    //  {"collapseKey": "com.tamland", "data": {}, "from": "423608377932", "messageId": "0:1601047770213633%efee021eefee021e", "notification": {"android": {"sound": "default"}, "body": "test", "title": "test"}, "sentTime": 1601047769998, "ttl": 2419200}
    // */
    // messaging().onMessage(remoteMessage => {
    //   if (remoteMessage) {
    //     console.warn(
    //       'Notification caused app to open from foreground quit state:',
    //       remoteMessage.notification,
    //     );
    //     dispatch(getNotification(remoteMessage.notification))
    //   }
    // });
  }, []);

  async function getToken() {
    token = await getAsyncStorage('token');
    // console.log(await getAsyncStorage('firebaseToken'));
  }

  useEffect(() => {
    if (checkConnectionSelector.data === []) {
      dispatch(checkConnection());
    }

    if (
      checkConnectionSelector.data !== null &&
      checkConnectionSelector.data !== undefined &&
      checkConnectionSelector.data.length !== 0
    ) {
      if (checkConnectionSelector.data === 200) {
        setInternetCnct(true);
        getToken().then(value => {
          clearData(CLEAR_LIVE);
          if (token !== undefined && token !== null && codeFail === -1) {
            setTimeout(() => goToMain(Screens.Home, Props), 1000);
            dispatch(userLiveList());
            // goToMain(Screens.Login, Props)
          } 
          else {
            dispatch(userLiveList());
            setTimeout(
              () => goToMain(Screens.Login, Props),
              // goToMain( Screens.MediaPlayer, Props)
              1000,
            );
          }
        });
      } else {
        DisplayConnectionSnackBar(Strings.checkConnection);
        setInternetCnct(false);
      }
    }
  }, [serverErrorSelector, checkConnectionSelector]);

  useEffect(() => {
    if (codeFail === 432) goToMain(Screens.Login, Props);
    else if (codeFail === 200) dispatch(getVodMode());
  }, [codeFail]);

  useEffect(() => {
    if (vodMode !== -1) {
      saveAsyncStorage('vodMode', vodMode);
      goToMain(Screens.MiddlePageForMessage, Props);
    }
  }, [vodMode]);

  useEffect(() => {
    if (!internetCnctn) {
      return () => {
        dispatch(checkConnection());
      };
    }
  }, [internetCnctn]);

  const DisplayConnectionSnackBar = message => {
    useRef.ReactNativeConnectionSnackBar.ShowConnectionSnackBarFunction(
      message,
    );
  };

  const tryAgain = () => {
    return (
      <TouchableOpacity
        onPress={() => setInternetCnct(true)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: internetCnctn ? 'none' : 'flex',
        }}>
        <View style={[{alignItems: 'center'}]}>
          <Icon
            name={'refresh'}
            size={responsiveWidth(6)}
            style={{
              textAlign: 'center',
              color: Colors.mainColorOne,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          justifyContent: 'center',
        }}>
        <CustomConnectionSnackbar
          autoHide={true}
          ref={input => {
            useRef.ReactNativeConnectionSnackBar = input;
          }}
        />

        <Image
          source={{
            uri:
              'https://tamland.ir/wp-content/uploads/2019/08/tamland-logo-60.png',
          }}
          style={{
            alignSelf: 'center',
            resizeMode: 'contain',
            justifyContent: 'center',
            width: responsiveWidth(50),
            height: responsiveWidth(50),
          }}
        />
        {tryAgain()}
        {renderIf(
          !checkConnectionSelector.checkConnectionLoading && internetCnctn,
          <Loading />,
          null,
        )}
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
