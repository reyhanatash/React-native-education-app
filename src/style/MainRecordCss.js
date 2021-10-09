import {StyleSheet} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/Colors';
import {Dimensions} from '../constant/Dimensions';

export const MainRecordCss = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    mainRecordStyle: {

        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: Dimensions.buttonBorderRadius,
        borderColor: 'white',
        width: Dimensions.buttonWidth,
        // height: Dimensions.mainRecordHeight,
        alignSelf:'center',
        marginBottom:-responsiveWidth(3),
        padding:responsiveWidth(3)
    },
    circleView: {
     
        borderRadius: (responsiveWidth(12), responsiveWidth(12), responsiveWidth(12)),
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 0
    },
});
