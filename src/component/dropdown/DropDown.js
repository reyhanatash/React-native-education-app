import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Alert, FlatList, SafeAreaView} from 'react-native';
import {ButtonCss} from '../../style/ButtonCss';
import {TextCss} from '../../style/TextCss';
import Icon from 'react-native-vector-icons/FontAwesome';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../../constant/Colors';
import {Dimensions} from '../../constant/Dimensions';



const DropDown = (Props) => {

    return (

        <TouchableOpacity style={[{ backgroundColor: Colors.buttonInactiveBackgroundColor,
            borderWidth: 1,
            borderRadius: Dimensions.buttonBorderRadius,
            borderColor: '#fff',
            minWidth:responsiveWidth(40),
        padding:responsiveWidth(3)},Props.style]} onPress={Props.onPressModal}>
        <View style={{flexDirection:'row',alignContent:'center', justifyContent:'space-between'}}>

            <Icon name={Props.icon} size={responsiveWidth(3)}
                  style={{alignSelf:'center',
                      display: Props.icon !== 'undefined' && Props.icon !== null ? 'flex' : 'none', color: '#808080',marginEnd:responsiveWidth(4)
                  }}/>
            <Text style={TextCss.menualText}>
                {Props.title}
            </Text>
        </View>
        </TouchableOpacity>

    );

};

export default DropDown;
