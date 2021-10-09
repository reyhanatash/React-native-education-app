import {StyleSheet} from 'react-native';
import {responsiveFontSize, responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/Colors';
import {Dimensions} from '../constant/Dimensions';
import {CollorArray, Strings} from '../constant/String';

export const TextCss = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',

    },
   title:{
       alignSelf:'center',
       fontFamily: Strings.fontFamilyBold,
       fontSize: responsiveFontSize(3),
       color: Colors.mainColorOne,
   },
    menualText:{

        alignSelf:'center',
        fontFamily: Strings.fontFamilyLight,
        fontSize: responsiveFontSize(2),
        color: Colors.inputBottomActionColor,
    },
    subText:{
        fontFamily: Strings.fontFamilyLight,
        color:Colors.mainTextColor,
        fontSize:responsiveFontSize(1.6),
        textAlign:'center',
        marginTop:-responsiveWidth(5)
    },
    mediumTitleText:{
        fontFamily: Strings.fontFamilyLight,
        color:Colors.mainTextColor,
        fontSize:responsiveFontSize(2.5),
        marginEnd: responsiveWidth(2),

    },
    textWithBackStyle:{
        backgroundColor: Colors.backgrounColor,
        borderWidth: 1,
        borderRadius: Dimensions.buttonBorderRadius,
        borderColor: Colors.backgrounColor,
        alignSelf: 'center',
        padding: responsiveWidth(2),
    },
    iconStyle:{
        textAlign: 'center',
        color: 'white',
        backgroundColor: CollorArray[10],
        padding: responsiveWidth(2),
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: responsiveWidth(10) / 2,
        alignSelf: 'center',
        alignItems: 'center',
    }
});
