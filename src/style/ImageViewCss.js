import {StyleSheet} from 'react-native';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/Colors';
import {Dimensions} from '../constant/Dimensions';

export const ImageViewCss = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    mainViewsImage: {
        width: responsiveWidth(100),
        height: responsiveHeight(115),
        // resizeMode:'cover',
        // backgroundColor:'#05072f',
        // paddingTop:responsiveWidth(10),
    },
    backImageStyle: {padding: 2, height: responsiveHeight(25)},
    imagePicker: {
        width: responsiveWidth(40),
        height: responsiveWidth(40),
        borderRadius: responsiveWidth(5),
        borderColor: 'white',
        borderWidth: 1,
        resizeMode:'contain',
        backgroundColor:'white',
        overflow: 'hidden'
    },
    imageAlertStyle:{
        width: responsiveWidth(40),
        height: responsiveWidth(40),
        alignSelf:'center',
        marginTop:responsiveWidth(10),
    }
});
