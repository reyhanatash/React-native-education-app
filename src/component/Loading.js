import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';
import {Colors} from '../constant/Colors';
import {responsiveWidth} from 'react-native-responsive-dimensions';



const Loading = (Props) => {

    return (
        <View style={[{position:'absolute', bottom:responsiveWidth(3),width:responsiveWidth(100), alignItems:'center'},Props.ViewStyle]}>
            <ActivityIndicator size="large" color={Colors.mainColorOne}/>
        </View>

    );

};

export default Loading;

export const styles = StyleSheet.create({});
