import {StyleSheet,Dimensions} from 'react-native';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/Colors';


export const CustomView = StyleSheet.create({

    container: {
        // justifyContent: 'center',
        paddingTop:30,
        alignItems: 'center',
        backgroundColor: Colors.backgrounColor,
        borderTopWidth: 1,
        borderBottomEndRadius:0,
        borderBottomStartRadius:0,
        borderTopColor:Colors.backgrounColor,
        borderRadius: Dimensions.radiusMainVIew,
        borderBottomWidth:0,
        borderLeftWidth:0,
        borderColor: Colors.buttonBorderActiveColor,
        position:'absolute',
        bottom:0,
        width: responsiveWidth(100),
        height: responsiveHeight(65),
    },

    mainViewScreenStyle:{
        flexDirection: 'row',
        flex: 1
    },
    radiusView:{
        borderWidth: 1,
        borderRadius: Dimensions.buttonBorderRadius,
        borderColor: 'white',
        width: responsiveWidth(90),
        alignSelf: 'center',
        marginBottom: responsiveWidth(1),
        minHeight:responsiveHeight(20),
        padding: responsiveWidth(3),
        textAlign: 'right',
    },
    textarea:{
        borderWidth: 1,
        borderRadius: Dimensions.buttonBorderRadius,
        borderColor: 'white',
        width: responsiveWidth(80),
        alignSelf: 'center',
        marginBottom: responsiveWidth(1),
        minHeight:responsiveHeight(20),
        padding: responsiveWidth(3),
        textAlign: 'right',
    },
    usualViewStyle:{
        alignSelf: 'center',
        marginTop:responsiveWidth(2)
    },
    templateViewStyleInner:{
        padding: 2, backgroundColor: Colors.backgrounColor, 
    }
});
