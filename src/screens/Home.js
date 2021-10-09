/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, BackHandler, FlatList, View,Modal,StyleSheet,Text, TouchableOpacity,Dimensions} from 'react-native';
import Orientation from 'react-native-orientation';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Screens, Strings} from '../constant/String';
import TemplateView from '../component/TemplateView';
import MainRecordCmp from '../component/MainRecordCmp';
import {Colors} from '../constant/Colors';
import {push} from './MyNavigation/MyNavigation';
import PropTypes from 'prop-types';
import {homeItemList} from '../constant/StaticLists';
import {CustomView} from '../style/CustomView';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {getNotification, getVodMode} from '../redux/action';
// import {loadCourser} from '../redux/action';
import {ImageViewCss} from '../style/ImageViewCss';
import {clearData, userLiveList,loadCourser,LOGOUTt} from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import { CLEAR_LIVE ,CLEAR_NOTIFICATION} from '../redux/action/types';
import Icon from 'react-native-vector-icons/FontAwesome';
const Navigation = require('../navigation/Navigation');
import {getAsyncStorage, saveAsyncStorage} from '../store/AsyncStorageFunction';

const Home = Props => {
  const dispatch = useDispatch();
 const {width,height}=Dimensions.get('window')
  const message = useSelector(state => state.liveStream.message);
  const [orientationLand, setLandOrientation] = useState(false);
  const notification = useSelector(state => state.globalReducer.notification);
  const [visi,setvisi]=useState(false)
  const serverErrorSelector = useSelector(state => state.serverErrorReducer);
  const checkToken = useSelector(state => state.liveStream);
  async function getToken() {
    token = await getAsyncStorage('token');
  }


  console.warn("oriension",orientationLand)
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    })
    });
  
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.warn(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state1:',
            remoteMessage,
          );

        }
      });

    // When a user receives a push notification and the app is in foreground
    /*


     {"collapseKey": "com.tamland", "data": {}, "from": "423608377932", "messageId": "0:1601047770213633%efee021eefee021e", "notification": {"android": {"sound": "default"}, "body": "test", "title": "test"}, "sentTime": 1601047769998, "ttl": 2419200}
    */
    messaging().onMessage(remoteMessage => {
      if (remoteMessage) {
        console.warn(
          'Notification caused app to open from foreground quit state:',
          remoteMessage.notification,
        );
        dispatch(getNotification(remoteMessage.notification))
      }
    });
  }, []);

  useEffect(()=>{
    getToken()
    if(notification!==""){
      setvisi(true)
    }
      },[notification])


    //   useEffect(()=>{
    //     if(checkToken.expireToken===true){     
    //         dispatch(LOGOUTt())     
    //     }
    // },[checkToken])

  useEffect(() => {
    dispatch(loadCourser(-1),2);
    // const initial = Orientation.getInitialOrientation();
    // if (initial === 'LANDSCAPE') setLandOrientation(true);
    // else if (initial === 'PORTRAIT') setLandOrientation(false);

    BackHandler.addEventListener('hardwareBackPress', onBackButtonPressAndroid);

    dispatch(clearData(CLEAR_LIVE))
     dispatch(userLiveList());
    return function cleanup() {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        onBackButtonPressAndroid,
      );
    };
  },[]);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window:{width,height}})=>{
      
      if (width<height) {
        setLandOrientation(false)
console.warn("not land")
      } else {
        setLandOrientation(true)
        console.warn("land")
    
      }
//  console.warn("with , height",width,height)
    })

  }, []);

  const onBackButtonPressAndroid = () => {
    return false;
  };

  const pressClose=()=>{
    dispatch(clearData(CLEAR_NOTIFICATION)),
    setvisi(false)
    push(Props,Screens.PublicNotification, 'Home')
    // Navigation.push(Screens.PublicNotification)
  }
  return (
    <SafeAreaView style={CustomView.mainViewScreenStyle}>
         <Modal
        animationType="slide"
        transparent={true}
        visible={visi}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
         <View style={styles.centeredView}>        
          <View style={styles.modalView}>
              <View>
              <View style={{flexDirection:"row-reverse",padding:10,backgroundColor:'#7C4DFF',borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <TouchableOpacity onPress={()=>pressClose() } style={{backgroundColor:"white",width:20,height:20,borderRadius:20,alignItems:"center",justifyContent:"center"}}>
                      <Icon name="close" style={{color:"#7C4DFF"}}/>
                </TouchableOpacity>
                <View style={{alignItems:"center",justifyContent:"center",alignSelf:"center"}}>
                    <Text style={{fontWeight:"bold",color:"white",alignSelf:"center",marginRight:width*0.10,fontFamily:Strings.fontFamilyBold}}>{notification.title}</Text>
                </View>
              </View>             
                  <Text style={styles.modalText}>{notification.body}</Text>
              </View>
          </View>
        </View>
      </Modal>
      <TemplateView
        BottomTabs={true}
        ImageStyle={ImageViewCss.backImageStyle}
        ViewStyle={[
          CustomView.templateViewStyleInner,
          {width: responsiveWidth(100), top: responsiveHeight(20)},
        ]}
        height={orientationLand===true? responsiveHeight(57):responsiveHeight(70)}
        animHeight={responsiveHeight(51)}
        src={require('../assets/image/03.png')}
        NavigationProps={Props}
        message={message}>
        <FlatList
          contentContainerStyle={{
            backgroundColor: 'transparent',
            paddingBottom: responsiveWidth(10),
          }}
          data={homeItemList}
          horizontal={orientationLand}
          keyExtractor={(item, index) => index.toString()}
          inverted={orientationLand}
          style={{
            marginEnd: orientationLand ? responsiveWidth(3) : 0,
            marginTop: orientationLand ? -responsiveWidth(1.5) : 0,
          }}
          ItemSeparatorComponent={() => (
            <View style={{width: responsiveWidth(2)}} />
          )}
          renderItem={({item}) => (
            <MainRecordCmp
              onPressItem={() => push(Props,item.screen, 'Home')}
              hasChevron={!orientationLand}
              TextFlex={'flex-end'}
              horizontal={orientationLand}
              hasImage={true}
              style={{marginTop: responsiveWidth(8)}}
              hasSubText={item.subTitle !== ''}
              item={item}            
            />
          )}
        />
      </TemplateView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // width:width*0.90
    
  },
  modalView: {
    width:300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // padding: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    marginTop:20,
    textAlign: "center",
    fontFamily:Strings.fontFamilyLight
  }
});
export default Home;
Home.propTypes = {
    Props: PropTypes.string.isRequired,
};
