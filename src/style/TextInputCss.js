import {StyleSheet} from 'react-native';
import {responsiveFontSize, responsiveWidth, responsiveScreenWidth, responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import {Dimensions} from '../constant/Dimensions';
import {Colors} from '../constant/Colors';
import {Strings} from '../constant/String';

export const TextInputCss = StyleSheet.create({

    inputContainerStyle: {
        width: responsiveScreenWidth(85),
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginVertical: responsiveWidth(1.5),
    },
    labelInputStyle: {
        color: Colors.labelInputColor,
        // lineHeight: responsiveScreenWidth(2),
        fontWeight: 'normal',
        fontFamily: Strings.fontFamilyLight,
        fontSize: responsiveScreenFontSize(2),
    },
    inputBottomActionTitle: {
        color: Colors.inputBottomActionColor,
        // lineHeight: Dimensions.inputBottomActionLineHeight,
        fontWeight: 'normal',
        fontFamily: Strings.fontFamilyLight,
        fontSize:responsiveScreenFontSize(2),
        alignSelf: 'flex-start',
        marginBottom: 0,
        marginRight: 8,
    },
    TextInputContainerStyle: {
        backgroundColor: 'white',
    },
    containerCodeInput: {
        borderWidth: 1,
        borderColor: 'white',

    },

    TextInputStyle: {
        flexDirection: 'row',
        width: responsiveWidth(85),
        height:responsiveWidth(15),
        // lineHeight: Dimensions.TextInputLineHeight,
        margin: Dimensions.TextInputMargin,
        padding: Dimensions.TextInputPadding,
        marginTop: Dimensions.TextInputMarginTop,
        paddingHorizontal: Dimensions.TextInputPaddingHorizontal,
        backgroundColor: 'white',
        borderTopWidth: Dimensions.TextInputBorderWidth,
        borderBottomWidth: Dimensions.TextInputBorderWidth,
        borderLeftWidth: 10,
        borderRightWidth: 0,
        borderColor: 'white',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius:10,
        borderTopLeftRadius:10,
        textAlign: 'right',
        fontFamily: Strings.fontFamilyLight,
        fontSize: Dimensions.TextInputFontSize,

    },
    iconView: {
        height: responsiveWidth(15),
        lineHeight: Dimensions.TextInputLineHeight,
        margin: Dimensions.TextInputMargin,
        padding: Dimensions.TextInputPadding,
        marginTop: Dimensions.TextInputMarginTop,
        paddingHorizontal: Dimensions.TextInputPaddingHorizontal,
        backgroundColor: 'white',
        borderTopWidth: Dimensions.TextInputBorderWidth,
        borderBottomWidth: Dimensions.TextInputBorderWidth,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#fff',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius:0,
        borderTopLeftRadius:0,
        justifyContent: 'center',
        // fontFamily: Strings.TextInputFontFamily,

    },
    inputBottomTextAlert: {
        color: Colors.inputBottomTextAlertColor,
        lineHeight: Dimensions.inputBottomActionLineHeight,
        fontWeight: 'normal',
        // fontFamily:Strings.chardFontFamily,
        fontSize: Dimensions.inputBottomActionFontSize,
        alignSelf: 'flex-end',
        marginBottom: 0,
    },

    inputButtonContainer: {
        borderRadius: Dimensions.borderRadiusSize,
        height: Dimensions.TextInputHeight,
        width: Dimensions.inputButtonWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainColor2,
    },

    inputButtonText: {
        color: Colors.inputButtonTextColor,
        alignSelf: 'center',
        lineHeight: Dimensions.inputButtonLineHeight,
        // fontFamily: Strings.chardFontFamily,
        fontSize: Dimensions.inputButtonFontSize,
    },


});

export const searchInputCss = StyleSheet.create({
    mainView: {
        width: responsiveWidth(90),
        height: Dimensions.searchViewHeight,
        backgroundColor: Colors.inputButtonTextColor,
        borderRadius: Dimensions.radiusMainVIew,
        borderWidth: Dimensions.cardBorderWidth,
        borderColor: Colors.inputButtonTextColor,
        marginBottom:responsiveWidth(3.5),
        alignSelf: 'center',
        justifyContent:'center',
    },
    textinputBigView:  {
        backgroundColor: Colors.backgrounColor,
        width: responsiveWidth(80),
        fontFamily: Strings.fontFamilyLight,
    },
});
