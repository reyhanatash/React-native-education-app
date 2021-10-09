import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Alert, FlatList, SafeAreaView,Dimensions} from 'react-native';

import {responsiveFontSize, responsiveWidth} from 'react-native-responsive-dimensions';
import {MainRecordCss} from '../style/MainRecordCss';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextCss} from '../style/TextCss';
import {CollorArray, Screens, StaticObjects, Strings} from '../constant/String';
import {ThumbNail} from './ThumbNail';
import {SelectedCourse} from "../redux/action";
import {useDispatch} from 'react-redux';



const {width,height}=Dimensions.get("window")
const LessonSections = (Props) => {
  

    return (

        <TouchableOpacity onPress={Props.onPress}>
            <View style={[MainRecordCss.mainRecordStyle, {
                padding: responsiveWidth(2),
                marginTop:width*0.05,
                width: responsiveWidth(38),
                flexDirection: 'column',
                height: responsiveWidth(30),
                alignVertically: 'center',
                margin: responsiveWidth(2),
                marginBottom: responsiveWidth(1),
            }]}>

                    <ThumbNail styleImage={{ height: responsiveWidth(10), // imageDimensions == 93.5
                        width: responsiveWidth(10),alignSelf:'flex-end'}}
                               uri={Props.item.fldLogoImage===null || Props.item.fldLogoImage==="" ? StaticObjects.imagePlaceholdr : StaticObjects.imagePrefix +'course/app/'+ Props.item.fldLogoImage }/>
                    {/*<ThumbNail uri={ StaticObjects.imagePlaceholdr }/>*/}

                <Text style={[TextCss.mediumTitleText, {
                    lineHeight: responsiveWidth(6), alignSelf: 'flex-start', margin: 2,
                    flex: 1, textAlignVertical: 'center',
                    fontSize: responsiveFontSize(2),
                }]}>{Props.item.fldTitle}</Text>

            </View>

        </TouchableOpacity>


    );

};

export default LessonSections;


