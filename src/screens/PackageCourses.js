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
    BackHandler,
    FlatList,
} from 'react-native';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import TemplateView from '../component/TemplateView';
import MainRecordCmp from '../component/MainRecordCmp';
import {push} from './MyNavigation/MyNavigation';
import PropTypes from 'prop-types';
import {homeItemList} from '../constant/StaticLists';
import {CustomView} from '../style/CustomView';
import {ImageViewCss} from '../style/ImageViewCss';
import {useDispatch, useSelector} from 'react-redux';
import {clearData, getAnnouncement, getCourseOffline} from '../redux/action';
import {CLEAR_DATA} from '../redux/action/types';


const PackageList: () => React$Node = (Props) => {

    const dispatch = useDispatch();
    const message = useSelector(state => state.liveStream.message);

    useEffect(() => {
        if (Props.params.courseInfo !== undefined) {
            
            dispatch(getAnnouncement(Props.params.courseInfo.fldPkCourseCo));
            dispatch(getCourseOffline(Props.params.courseInfo.fldPkCourseCo));
        }
        return () => dispatch(clearData(CLEAR_DATA));

    }, []);

    return (
        <SafeAreaView style={CustomView.mainViewScreenStyle}>

            <TemplateView
                BottomTabs={true}
                ImageStyle={ImageViewCss.backImageStyle}
                ViewStyle={[CustomView.templateViewStyleInner,{width: responsiveWidth(100),top: responsiveHeight(20)}]}
                height={responsiveHeight(68)}
                animHeight={responsiveHeight(51)}
                src={require('../assets/image/03.png')}
                NavigationProps={Props}
                message={message}
            >
                <FlatList
                    contentContainerStyle={{flex:1,backgroundColor:'transparent'}}
                    data={homeItemList}
                    renderItem={({item}) => <MainRecordCmp
                        onPressItem={() => push(Props, item.screen, 'Home')}
                        hasChevron={true}
                        TextFlex={'flex-end'}
                        hasImage={true}
                        style={{marginTop: responsiveWidth(8)}}
                        hasSubText={item.subTitle !== ''}
                        item={item}
                    />}/>

            </TemplateView>


        </SafeAreaView>);
};


export default PackageList;
Home.propTypes = {
    Props: PropTypes.string.isRequired,
};
