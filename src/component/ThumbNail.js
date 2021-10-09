import React from 'react';
import {Image} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
export const ThumbNail = (Props)=>{
    return(
        <Image resizeMode="cover" source={{uri: Props.uri}} style={[{
            height: responsiveWidth(7), // imageDimensions == 93.5
            width: responsiveWidth(7)
        },Props.styleImage]} />
    )
}
