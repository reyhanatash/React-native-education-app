import {StyleSheet} from 'react-native';
import {responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/Colors';
import {Dimensions} from '../constant/Dimensions';
import {Strings} from '../constant/String';

export const ButtonCss = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonInactiveContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.buttonInactiveBackgroundColor,
        borderWidth: 1,
        borderRadius: Dimensions.buttonBorderRadius,
        borderColor: Colors.registerInfoTitleValueColor,
        width: responsiveWidth(85),
        height:responsiveWidth(20),
    },
    buttonActiveContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.buttonActiveBackgroundColor,
        borderWidth: 1,
        borderRadius: Dimensions.buttonBorderRadius,
        borderColor: Colors.buttonBorderActiveColor,
        width: responsiveWidth(85),
        height: responsiveWidth(20),
    },
    buttonInactiveTxt: {
        // lineHeight: Dimensions.ButtonTitleLineHeight,
        fontFamily: Strings.fontFamilyBold,
        fontSize: responsiveFontSize(2),
        color: Colors.buttonInactiveTextColor,
        marginVertical:50,

    },

    buttonActiveTxt: {
        lineHeight: Dimensions.ButtonTitleLineHeight,
        fontFamily: Strings.fontFamilyBold,
        fontSize: Dimensions.ButtonTitleFontSize,
        color: Colors.buttonActiveTextColor,
        // marginBottom:20
    },
});
