import React, {useEffect, useState, useRef} from 'react';

import {
    View,
    TouchableOpacity,
} from 'react-native';
import Button from '../component/Button';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import Line from '../component/Line';
import CustomTextInput from '../component/CustomTextInput';
import {Screens, Strings} from '../constant/String';
import TemplateView from '../component/TemplateView';
import BottomTab from '../component/BottomTab';
import {Colors} from '../constant/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../redux/action';
import InfoUserModal from '../dataModal/InfoUserModal';
import {CustomView} from '../style/CustomView';

const RegisterCode: () => React$Node = () => {


    const dispatch = useDispatch();
    const [code, setCode] = useState('');

    const registerCodeList = [
        {
            placeholder: 'X',
            returnKeyType: 'next',
            currentRef: (input) => {
                useRef.one = input;
            },
            onSubmitEditing: () => {
                useRef.two.focus();
            },
            maxLength: 1,
            keyboardType: 'number', type: 'one',
            onFocus: (type) => null,
            onBlur: (type) => null,
            onChange: value => setCode(value),
        },
        {
            placeholder: 'X',
            returnKeyType: 'next',
            currentRef: (input) => {
                useRef.two = input;
            },
            onSubmitEditing: () => {
                useRef.three.focus();
            },
            maxLength: 1,
            keyboardType: 'number', type: 'two',
            onFocus: (type) => null,
            onBlur: (type) => null,
            onChange: value => setCode(code.concat(value)),
        },
        {
            placeholder: 'X',
            returnKeyType: 'next',
            currentRef: (input) => {
                useRef.three = input;
            },
            onSubmitEditing: () => {
                useRef.four.focus();
            },
            maxLength: 1,
            keyboardType: 'number', type: 'three',
            onFocus: (type) => null,
            onBlur: (type) => null,
            onChange: value => setCode(code.concat(value)),
        },
        {
            placeholder: 'X',
            returnKeyType: 'next',
            currentRef: (input) => {
                useRef.four = input;
            },
            onSubmitEditing: () => {
            },
            maxLength: 1,
            keyboardType: 'number', type: 'four',
            onFocus: (type) => null,
            onBlur: (type) => null,
            onChange: value => setCode(code.concat(value)),
        },
    ];


    return (
        <View style={{flexDirection: 'row', flex: 1}}>

            <TemplateView
                ImageStyle={{padding: 2, height: responsiveHeight(25)}}
                ViewStyle={[CustomView.templateViewStyleInner, {height: responsiveHeight(68)}]}
                height={responsiveHeight(68)}
                animHeight={responsiveHeight(53)}
                src={require('../assets/image/03.png')}
                BottomTabs={false}
                NavigationProps={Props}
                message={message}
            >


                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: responsiveHeight(15)}}>
                    {registerCodeList.map((item) => {
                        return (
                            <CustomTextInput
                                required={true}
                                editable={true}
                                setBorderColorItem={Colors.inputBottomActionColor}
                                item={item}
                                code={true}
                                height={responsiveHeight(10)}
                                textAlignVertical={'center'}
                                paddingVertical={20}/>
                        );
                    })}
                </View>
                <TouchableOpacity onPress={() => loginClicked()}>
                    <Button
                        loading={false}
                        style={{marginBottom: 0, marginTop: 20}}
                        icon={null}
                        widthOfButton={responsiveWidth(90)}
                        buttonType={'Active'}
                        textValue={Strings.login}/>
                </TouchableOpacity>
                <Button
                    loading={false}
                    style={{marginBottom: 0, marginTop: 20}}
                    icon={null}
                    widthOfButton={responsiveWidth(90)}
                    buttonType={'Inactive'}
                    textValue={Strings.changeNumber}/>

                <Button
                    loading={false}
                    style={{marginBottom: 0, marginTop: 20}}
                    icon={null}
                    widthOfButton={responsiveWidth(90)}
                    buttonType={'Inactive'}
                    textValue={Strings.resendCode}/>
            </TemplateView>


        </View>);
};


export default RegisterCode;
