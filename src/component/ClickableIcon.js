import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity,View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {responsiveFontSize, responsiveWidth} from 'react-native-responsive-dimensions';


const ClickableIcon = (Props) => {

    return (
        <TouchableOpacity onPress={Props.onPress} style={[Props.style]}>
            <Icon name={Props.iconName} size={responsiveFontSize(3)} color={'#fff'}
                  style={[ { padding: responsiveWidth(1)}]}/>
        </TouchableOpacity>

    );

};

export default ClickableIcon;

export const styles = StyleSheet.create({});
