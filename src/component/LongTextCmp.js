import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from '../constant/Dimensions';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {TextCss} from '../style/TextCss';
import {Colors} from '../constant/Colors';
import CollapsibleText from './CollapsibleText';

const LongTextCmp = (Props) => {
    return (
        <View style={[{
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: Dimensions.buttonBorderRadius,
            borderColor: 'white',
            width: responsiveWidth(89),
            alignSelf: 'center',
            marginBottom: responsiveWidth(1),
            padding: responsiveWidth(3),
        }]}>
           {Props.data===undefined && <Text style={[TextCss.menualText,{width:responsiveWidth(85), textAlign:'right',fontSize:12}]}>{Props.item.typeMessage}</Text> }
           {Props.data===undefined && <Text style={[TextCss.menualText,{width:responsiveWidth(85), textAlign:'right'}]}>{Props.item.fldAnnouncement}</Text> }
           {Props.data===undefined && <Text style={[TextCss.menualText,{width:responsiveWidth(85), textAlign:'left',fontSize:12}]}>{Props.item.fldCreateDate.slice(0,10)}</Text> }
           
            {Props.data!==undefined &&   <Text style={[TextCss.menualText,{width:responsiveWidth(85), textAlign:'right'}]}>{Props.data}</Text> }
        </View>
    );
};
export default LongTextCmp;
