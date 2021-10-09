import { Platform, PixelRatio } from 'react-native';
import {Dimensions as dim} from 'react-native';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = dim.get('window');

const scale = SCREEN_WIDTH / 375;

function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

export const Dimensions = {


    cardBorderWidth:1,
    borderRadiusSize: normalize(38.88)/4,
    dividerLineHeight:normalize(7),

    buttonWidth: normalize(260),
    buttonHeight: normalize(50),
    buttonBorderRadius:normalize(60)/4,
    ButtonTitleLineHeight:normalize(50),
    ButtonTitleFontSize:normalize(18),


    inputContainerWidth:normalize(280),
    inputContainerMargin:8,
    labelInputLineHeight:normalize(20),
    labelInputFontSize: normalize(16),

    TextInputWidth:normalize(260.53),
    TextInputWidthCode:normalize(65.53),
    TextInputHeight:normalize(50),
    TextInputLineHeight:normalize(24.7),
    TextInputMarginTop:4,
    TextInputMargin:0,
    TextInputPadding:0,
    TextInputPaddingHorizontal:8,
    TextInputBorderWidth:1,
    TextInputFontSize: normalize(15),
    inputBottomActionLineHeight:normalize(17),
    inputBottomActionFontSize:normalize(13),

    inputButtonWidth:normalize(79),
    inputButtonFontSize:normalize(16),
    inputButtonLineHeight:normalize(20),

    radiusMainVIew: normalize(50),
    searchViewHeight: normalize(45),
    headerFontSize: normalize(25),
    mainRecordHeight: normalize(75),

    allHeight: normalize(responsiveHeight(160)),
    allWidth: normalize(responsiveWidth(90)),
    
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT

};
