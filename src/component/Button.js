import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,

    ActivityIndicator, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {ButtonCss} from '../style/ButtonCss';
import {Dimensions} from '../constant/Dimensions';



const Button = (Props) => {

    return (
        <View style={[ButtonCss.container, Props.style]}>
            <View style={[Props.buttonType === 'Inactive' ? ButtonCss.buttonInactiveContainer :
                Props.buttonType === 'Active' ? ButtonCss.buttonActiveContainer :
                    ButtonCss.buttonInactiveContainer,
                {
                    width: Props.widthOfButton !== undefined ? Props.widthOfButton : Dimensions.buttonWidth,
                    height: Props.height !== undefined ? Props.height : responsiveWidth(20),
                    flexDirection: 'row-reverse',...Props.containStyle

                },
                Props.btnStyle]}>
                {Props.loading ? <ActivityIndicator color={'#fff'}/>:
                    <Text style={[Props.buttonType === 'Inactive' ? ButtonCss.buttonInactiveTxt :
                    Props.buttonType === 'Active' ? ButtonCss.buttonActiveTxt :
                        ButtonCss.buttonInactiveTxt,Props.textStyle]}>
                    {Props.textValue}
                </Text>
                }
                {Props.Image!==undefined && Props.Image &&
                <Image source={Props.Image} style={Props.ImageStyle}/>
                }
                {/*{Props.loading ? <ActivityIndicator color={Props.buttonType === 'Active' ? 'white' : 'Colors.mainColor2'}/> : null}*/}
                <Icon name={Props.icon} size={responsiveWidth(4)}
                      style={[{
                          display: Props.icon !== 'undefined' && Props.icon !== null ? 'flex' : 'none',
                          margin: 0, color: '#808080', marginHorizontal: 8
                      },Props.iconStyle]}/>
            </View>
        </View>
    );

};

export default Button;
