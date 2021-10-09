import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Alert, FlatList, SafeAreaView} from 'react-native';
import {ButtonCss} from '../style/ButtonCss';
import {Colors} from '../constant/Colors';
import {Dimensions} from '../constant/Dimensions';



const Line = (Props) => {

    return (
        <View style={[{marginHorizontal:Dimensions.buttonBorderRadius,borderRadius:100,backgroundColor:Colors.lineBackgroundColor,height:Dimensions.dividerLineHeight,borderColor:'white',borderWidth:1},Props.style]}/>


    );

};

export default Line;

export const styles = StyleSheet.create({

});
