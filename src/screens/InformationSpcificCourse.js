/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect, useState, useRef, useContext} from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Button from '../component/Button';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {connect, useSelector, useDispatch} from 'react-redux';
import Orientation from 'react-native-orientation';
import TemplateView from '../component/TemplateView';
import {Colors} from '../constant/Colors';
import {
  clearData,
  getAnnouncement,
  getCourseOffline,
  loadUserCourse,
  LOGOUTt
} from '../redux/action';
import MainRecordCmp from '../component/MainRecordCmp';
import PropTypes from 'prop-types';
import {CollorArray, Strings} from '../constant/String';
import LongTextCmp from '../component/LongTextCmp';
import {CustomView} from '../style/CustomView';
import NoData from '../component/NoData';
import Loading from '../component/Loading';
import OfflineCard from '../component/OfflineCard';
import {CLEAR_DATA} from '../redux/action/types';
import {TextCss} from '../style/TextCss';
import {courseList, tabsData} from '../constant/StaticLists';
import {ImageViewCss} from '../style/ImageViewCss';
// import {Dimensions} from '../constant/Dimensions';


const moment = require('moment-jalaali');

const _renderingItem = (item, index, indexDate) => {
  
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius:20,
        borderColor: 'white',
        width: responsiveWidth(89),
        alignSelf: 'center',
        marginBottom: responsiveWidth(1),
        padding: responsiveWidth(3),
      }}>
        {console.warn("item.fldAnnouncement",item.fldAnnouncement)}
      <LongTextCmp data={item.fldAnnouncement}  />
      <Text style={[TextCss.subText, {textAlign: 'left'}]}>
        {moment(item.fldCreateDate,'YYYY-MM-DDThh:mm:ss').format(
          'jYYYY/jMM/jDD  HH:MM',
        )}
      </Text>
    </View>
  );
};

const InformationSpcificCourse = Props => {
  const dispatch = useDispatch();
  const [dataList, setDataList] = useState([]);
  const [orientationLand, setLandOrientation] = useState(false);

  const [view, setView] = useState(2);
  const announcementList = useSelector(
    state => state.userCourseRed.announcementLis,
  );
  const courseOfflineList = useSelector(
    state => state.userCourseRed.courseOffline,
  );
  const message = useSelector(state => state.userCourseRed.message);
  const CheckToken = useSelector(state => state.userCourseRed);
  const allSelector = useSelector(state => state.userCourseRed);

  const animationView = useSelector(state => state.userCourseRed.animationView);

  // const ScreenComponent = ({ componentId }) => {
  //     console.warn(componentId)
  //
  //     useNavigationComponentDidDisappear(e => {
  //         console.warn("clear")
  //         dispatch(
  //             clearData()
  //         )
  //     })
  //
  // };
  useEffect(() => {
    Orientation.unlockAllOrientations()
    Dimensions.addEventListener('change', ({window:{width,height}})=>{
      // Orientation.unlockAllOrientations()
      if (width<height) {
        
        setLandOrientation(false)
      } else {
        setLandOrientation(true)
    
      }
    })

  }, []);
  useEffect(()=>{
    console.warn("dfdjfhsdkfhksjd",CheckToken.expireToken)
    if(CheckToken.expireToken===true){     
        dispatch(LOGOUTt())
    }
      }, []);
  useEffect(() => {}, [animationView]);
  const _renderingOfflineCourse = item => {
    
    return (
      <OfflineCard
        item={item}
        navigation={Props}
        horizontal={orientationLand}
      />
    );
  };

  useEffect(() => {
    if (Props.params.courseInfo!== undefined) {
      dispatch(getAnnouncement(Props.params.courseInfo.fldPkCourseCo));
      dispatch(getCourseOffline(Props.params.courseInfo.fldPkCourseCo));
    }
    return () => dispatch(clearData(CLEAR_DATA));
  }, []);

  const _emptyListComponent = () => {
    console.log(view, allSelector, courseOfflineList, announcementList);
    if (view == 2) {
      if (allSelector.loadingOfflineCourse) return <Loading />;
      else if (courseOfflineList.length === 0) return <NoData />;
      else return null;
    } else if (view == 1) {
      if (allSelector.loadingAnnouncement) return <Loading />;
      else if (announcementList.length === 0) return <NoData />;
      else return null;
    }
  };

  useEffect(() => {
    let array = [];

    view === 1
      ? announcementList.forEach(item => array.push(item.fldAnnouncement))
      : courseOfflineList.forEach(item => array.push(item));
    setDataList(array);
  }, [announcementList, courseOfflineList, view]);
  return (
    <SafeAreaView style={{flexDirection: 'row', flex: 1}}>
      <TemplateView
        ImageStyle={ImageViewCss.backImageStyle}
        ViewStyle={[
          CustomView.templateViewStyleInner,
          {width: responsiveWidth(100), top: responsiveHeight(20)},
        ]}
        height={orientationLand? responsiveHeight(66):responsiveHeight(68)}
        animHeight={responsiveHeight(53)}
        BottomTabs={true}
        src={require('../assets/image/03.png')}
        NavigationProps={Props}
        message={message}>
        <View style={{flex: 2}}>
          {!orientationLand ? (
            <MainRecordCmp
              hasChevron={false}
              TextFlex={'flex-start'}
              backColor={'#48a303'}
              hasImage={true}
              horizontal={orientationLand}
              style={{marginTop: responsiveWidth(8)}}
              hasSubText={false}
              item={{
                
                title: Props.params.courseInfo.fldTitle,
                colorIcon:
                  CollorArray[Math.floor(Math.random() * CollorArray.length)],
                colorBackIcon: 'white',
              }}
            />
          ) : null}
          <View
            style={{
              alignSelf: 'center',
              width: responsiveWidth(90),
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: orientationLand
                ? responsiveWidth(2)
                : responsiveWidth(5),
            }}>
            {courseList.map(value => {
              return (
                <TouchableOpacity onPress={() => setView(value.id)}>
                  <Text
                    style={[
                      TextCss.menualText,
                      {
                        borderBottomColor:
                          view === value.id
                            ? Colors.mainColorOne
                            : 'transparent',
                        borderBottomWidth: 1,
                        paddingBottom: responsiveWidth(1),
                        fontFamily:Strings.fontFamilyBlack
                      },
                    ]}>
                    {value.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{flex: 1, margin: orientationLand ? 0 : responsiveWidth(6)}}>
           
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingVertical: responsiveWidth(2)}}
              style={{
                marginHorizontal: responsiveWidth(-10),
                //                           flex: 1,
                maxWidth: responsiveWidth(95),
                alignSelf: 'center',
              }}
              ListEmptyComponent={() => _emptyListComponent()}
              data={view !== 1 ? courseOfflineList.sort((a, b) =>   Date.parse(new Date(b.fldStartDateTime.split("/").reverse().join("-")))-Date.parse(new Date(a.fldStartDateTime.split("/").reverse().join("-")))) : announcementList.sort((a, b) =>  Date.parse(new Date(b.fldCreateDate.split("/").reverse().join("-")))-Date.parse(new Date(a.fldCreateDate.split("/").reverse().join("-"))))}
              renderItem={({item, index}) =>
                view !== 1
                  ? _renderingOfflineCourse(item)
                  : _renderingItem(item, index)
              }
              horizontal={view !== 1 && orientationLand}
              ItemSeparatorComponent={() => (
                <View style={{width: responsiveWidth(2)}} />
              )}
              inverted={
                view !== 1 &&
                orientationLand &&
                (courseOfflineList.length !== 0 ||
                  announcementList.length !== 0)
              }
            />
          </View>
        </View>
      </TemplateView>
    </SafeAreaView>
  );
};

export default InformationSpcificCourse;
InformationSpcificCourse.propTypes = {
  Props: PropTypes.string.isRequired,
};
