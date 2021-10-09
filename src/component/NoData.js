import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Alert, FlatList, SafeAreaView} from 'react-native';
import {ButtonCss} from '../style/ButtonCss';
import {Colors} from '../constant/Colors';
import {Dimensions} from '../constant/Dimensions';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {Strings} from '../constant/String';
import {TextCss} from '../style/TextCss';



const NoData = (Props) => {

    return (
        <View style={{
            justifyContent: 'center',
            alignSelf:'center',
            alignItems: 'center',
            width: responsiveWidth(100),
            marginTop:responsiveWidth(10)
        }}>
            <Image
                style={{width:responsiveWidth(10),height:responsiveWidth(10)}}
                source={require('../assets/image/sad.png')}
            />
            <Text style={[TextCss.menualText, {color: Colors.mainTextColor}]}>
                {Strings.noData}</Text>
        </View>

    );

};

export default NoData;

export const styles = StyleSheet.create({

});
