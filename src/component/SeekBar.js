import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Slider} from 'react-native';
import {ButtonCss} from '../style/ButtonCss';
import {Colors} from '../constant/Colors';
import {Dimensions} from '../constant/Dimensions';
import {responsiveWidth} from 'react-native-responsive-dimensions';


const SeekBar = (Props) => {



    return (
        <View style={[styles.MainContainer,{width:Props.width,
        }]}>

            <Slider
                step={Props.step}
                minimumValue={Props.min}
                maximumValue={Props.max}
                minimumTrackTintColor={Colors.mainColorOne}
                maximumTrackTintColor={Colors.TextInputBorderColor}
                onValueChange={(volume) => Props.changeVolume(volume)}
                style={{width: '100%'}}
                thumbTintColor={Colors.mainColorOne}
                value={Props.current}
            />

        </View>

    );

};

export default SeekBar;

export const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor:'rgba(13,13,13,0.5)'
    },
});
