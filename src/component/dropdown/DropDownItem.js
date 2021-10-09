import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Alert, FlatList, SafeAreaView} from 'react-native';
import {TextCss} from '../../style/TextCss';
import {Colors} from '../../constant/Colors';
import {responsiveWidth} from 'react-native-responsive-dimensions';




const DropDownItem = (Props) => {

    return (
        <TouchableOpacity onPress={()=>[Props.onSelectedItem(Props.item)]} style={{paddingBottom:responsiveWidth(2),borderBottomWidth:1,borderColor: Colors.mainColor2, marginVertical:responsiveWidth(1),marginHorizontal:responsiveWidth(5)}}>
            <Text style={TextCss.menualText,{...Props.itemStye}}>{Props.item.name}</Text>
        </TouchableOpacity>

    );

};

export default DropDownItem;
