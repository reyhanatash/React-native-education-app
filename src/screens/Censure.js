import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import {ImageViewCss} from '../style/ImageViewCss';
import {Colors} from '../constant/Colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import TemplateView from '../component/TemplateView';
import {CustomView} from '../style/CustomView';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextCss} from '../style/TextCss';
import {CollorArray, Strings} from '../constant/String';
import CustomTextInput from '../component/CustomTextInput';
import {TextInputCss} from '../style/TextInputCss';
import {Dimensions} from '../constant/Dimensions';
import Button from '../component/Button';
import {sendCensure, clearData} from '../redux/action';
import {CLEAR_PAYLOAD} from '../redux/action/types';
import Orientation from 'react-native-orientation';



const Censure = Props => {
  const [LandOrientation,setLandOrientation]=useState("")
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const censureResult = useSelector(
    state => state.globalReducer.censureResult,
  );
  const [message, setMessage] = useState('');
  const input = useRef();

  useEffect(() => {
    console.log(censureResult);
    if (
      censureResult.code === 200 &&
      censureResult.data[0].message === 'Succeed'
    ) {
      setMessage(Strings.succeedCensure);
      input.current.clear();
      setValue('');
      dispatch(clearData(CLEAR_PAYLOAD));
    } else {
      setMessage('');
    }
  }, [censureResult]);

useEffect(()=>{
  Orientation.addOrientationListener((orientation)=>{
    console.log(orientation)
    if (orientation==='LANDSCAPE')
    setLandOrientation(true)
    else if(orientation==='PORTRAIT' )
    setLandOrientation(false)
  
  })

},[LandOrientation])
 
  const sendPress=()=>{
    setValue("")
    value.length > 3 ? dispatch(sendCensure(value)) : null   
  }


  return (
    <SafeAreaView style={CustomView.mainViewScreenStyle}>
      <TemplateView
        BottomTabs={true}
        ImageStyle={ImageViewCss.backImageStyle}
        ViewStyle={[
          CustomView.templateViewStyleInner,
          {width: responsiveWidth(100), top: responsiveHeight(20),paddingBottom:10,}
        ]}
        height={LandOrientation? responsiveHeight(62):responsiveHeight(68)}
        animHeight={responsiveHeight(53)}
        src={require('../assets/image/03.png')}
        NavigationProps={Props}
        message={message}>
        <ScrollView>
          <View
            style={[
              CustomView.radiusView,
              {
                backgroundColor: 'white',
                marginTop: responsiveWidth(5),
                padding: responsiveWidth(2),
              },
            ]}>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'center',
                margin: responsiveWidth(3),
              }}>
              <Icon
                name={'flag'}
                size={responsiveWidth(6)}
                style={TextCss.iconStyle}
              />

              <Text
                style={[
                  TextCss.mediumTitleText,
                  {marginTop: -responsiveWidth(2)},
                ]}>
                {Strings.CensureTitle}
              </Text>
            </View>

            <TextInput
              multiline={true}
              containerStyle={{width: responsiveWidth(100)}}
              placeholder={'توضیحات'}
              placeholderTextColor={Colors.mainTextColor}
              ref={input}
              style={[CustomView.textarea, {margin:10,fontFamily:Strings.fontFamilyLight,borderColor:"lightgray",borderRadius:5}]}
              // ref={Props.item.currentRef}
              onChangeText={value => setValue(value)}
              maxLength={1000}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
             sendPress()
            }>
            <Button
            textStyle={{fontFamily:Strings.fontFamilyLight}}
              loading={false}
              style={{marginBottom: 0, marginTop: 20}}
              icon={null}
              widthOfButton={responsiveWidth(90)}
              buttonType={value.length > 3 ? 'Active' : 'InActive'}
              textValue={Strings.send}
              height={responsiveWidth(10)}
            />
          </TouchableOpacity>
        </ScrollView>
      </TemplateView>
    </SafeAreaView>
  );
};
export default Censure;
Censure.propTypes = {
  Props: PropTypes.string.isRequired,
};
