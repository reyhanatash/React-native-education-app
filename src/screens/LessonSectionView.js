/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect, useState, useRef} from 'react';

import {
    SafeAreaView,
    Dimensions,
    ScrollView,
    Text,
    FlatList,
    StatusBar,
} from 'react-native';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {connect, useSelector, useDispatch} from 'react-redux';
// import Orientation from 'react-native-orientation';
import TemplateView from '../component/TemplateView';
import LessonSections from '../component/lessonSections';
import {Colors} from '../constant/Colors';
import {loadCourser} from '../redux/action';
import PropTypes from 'prop-types';
import {push,goToMain} from './MyNavigation/MyNavigation';
import {Screens} from '../constant/String';
import {CustomView} from '../style/CustomView';
import NoData from '../component/NoData';
import Loading from '../component/Loading';
import {removeAsyncStorage} from '../store/AsyncStorageFunction';
import {LOGOUTt,SelectedCourse} from "../redux/action";


const _renderingItem = (item, index, Props) => {
 
   
    let marginTop = 0;

    if (index % 2 === 0) {
        marginTop = 10;
    }
    return (
        <LessonSections item={item} marginTop={marginTop} onPress={()=> push(Props, Screens.InfoCourse, '',{courseInfo:item })} />
    );
};


const LessonSectionView = (Props) => {
    const {width,height}=Dimensions.get("window")
    const dispatch = useDispatch();
    const userCourseList = useSelector(state => state.userCourseRed.data);
    const coursestatus = useSelector(state => state.userCourseRed);
    const message = useSelector(state => state.userCourseRed.message);
    const allSelector = useSelector(state => state.userCourseRed);
    const [orientationLand, setLandOrientation] = useState(false);
    const [courseList,setCourseList]= useState([])

    useEffect(()=>{
        if(coursestatus.expireToken===true){
            dispatch(LOGOUTt())    
        }
       
    },[coursestatus])

    useEffect(() => {
            dispatch(loadCourser(-1),2);

    }, []);

    useEffect(() => {
        Dimensions.addEventListener('change', ({window:{width,height}})=>{
          if (width<height) {
            setLandOrientation(true)
          } else {
            setLandOrientation(false)
        
          }
        })
    
      }, []);



    useEffect(() => {

        if (userCourseList !== undefined)
            if (!userCourseList.includes("message"))
                     setCourseList(userCourseList)


    }, [userCourseList]);
    return (
        <SafeAreaView style={{flexDirection: 'row', flex:1}}>

            <TemplateView
                ImageStyle={{padding: 2, height: responsiveHeight(25)}}
                ViewStyle={[CustomView.templateViewStyleInner,{width: responsiveWidth(100),top: responsiveHeight(20),alignItems:"center"}]}
                height={orientationLand?responsiveHeight(60):responsiveHeight(67)}
                animHeight={responsiveHeight(53)}
                BottomTabs={true}
                src={require('../assets/image/03.png')}
                NavigationProps={Props}
                message={message}

            >
                { allSelector.loadingCourse? <Loading ViewStyle={{position:'relative', marginTop:responsiveWidth(10)}}/>: userCourseList.length===0? <NoData/>:
              
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        alignContent: 'center',
                        justifyContent:orientationLand?'flex-start':'flex-end',
                        marginTop:orientationLand?-responsiveWidth(1.5):responsiveWidth(1),
                        margin:orientationLand?responsiveWidth(1): responsiveWidth(8),
                       paddingBottom:orientationLand?responsiveWidth(2): responsiveWidth(10)
                    }}
                    // ListEmptyComponent={ allSelector.loadingCourse ? <Loading ViewStyle={{position:'relative'}}/> : userCourseList.length===0 ? :null}
                    style={{backgroundColor: 'transparent',marginBottom:responsiveWidth(2)}}
                    data={courseList}
                    numColumns={2}
                    renderItem={({item, index}) => _renderingItem(item, index,Props)}
                    keyExtractor={(item, index,
                    ) => index.toString()}
                    horizontal={false}
                />
                }
            </TemplateView>
        </SafeAreaView>);
};


export default LessonSectionView;
LessonSectionView.propTypes = {
    Props: PropTypes.string.isRequired,
};
