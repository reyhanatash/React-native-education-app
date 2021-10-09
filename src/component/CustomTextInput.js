import React, {useEffect, useRef, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    FlatList,
    SafeAreaView,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {responsiveWidth} from 'react-native-responsive-dimensions';
import {TextInputCss} from '../style/TextInputCss';
import {Dimensions} from '../constant/Dimensions';
import {Colors} from '../constant/Colors';



const useForceUpdate = () => useState()[1];

const CustomTextInput = (Props) => {

    const forceUpdate = useForceUpdate();
    let selectedType = -1;

    const [activeTextInput, setActiveTextInput] = useState(null);
    const [inactiveBorderColor, setInactiveBorderColor] = useState('#CCD1D9');
    const [activeBorderColor, setActiveBorderColor] = useState('#27bcc8');

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {

    });

    const _onInputChange = (a) => {

    };

    const _onFocus = (type) => {
        Props.item.onFocus(type);
        setActiveTextInput(type);
    };

    const _onBlur = (type) => {
        if (Props.item.onBlur(type) !== null && Props.item.onBlur(type) !== undefined) {
            Props.item.onBlur(type);
        }
    };
    //onBlur={() => _onBlur(Props.item.type)}

    const CustomTextInputSimple = () => {
        return (
            <View style={[TextInputCss.inputContainerStyle, 
                {
                    marginBottom: Props.containerStyle !== undefined ? null : 16,
                    width: Props.width !== null ? Props.width :responsiveWidth(85),
                }]}>
                <Text style={[TextInputCss.labelInputStyle, {display: Props.item.label !== null ? 'flex' : 'none'}]}>
                    {Props.required !== undefined ? null : '* '}{Props.item.label + ':'}
                </Text>
                <View style={{justifyContent: 'center', alignItems: 'flex-start',flexDirection:'row'}}>
                    <TextInput
                        multiline={Props.multiline}
                        containerStyle={TextInputCss.TextInputContainerStyle}
                        placeholder={Props.item.placeholder}
                        placeholderTextColor={Colors.placeholderTextColor}
                        style={[TextInputCss.TextInputStyle, {
                            width: Props.width !== null && Props.width !== undefined ? Props.width : responsiveWidth(85),
                            height: Props.height !== null && Props.height !== undefined ?
                                Props.height : responsiveWidth(15),
                            textAlignVertical: Props.textAlignVertical || null,
                            paddingVertical: Props.paddingVertical,
                            borderColor: Props.setBorderColorItem,
                            textAlign:'center'
                        }, Props.textStyle]}
                        returnKeyType={Props.item.returnKeyType}
                        ref={Props.item.currentRef}
                        onSubmitEditing={Props.item.onSubmitEditing}
                        onFocus={() => _onFocus(Props.item.type)}
                        onBlur={() => _onBlur(Props.item.type)}
                        onChangeText={Props.item.onChange}
                        keyboardType={Props.item.keyboardType}
                        maxLength={Props.item.maxLength}
                        editable={Props.editable}
                        value={Props.item.inputValue}
                        secureTextEntry={Props.item.secureTextEntry ? Props.item.secureTextEntry : false}/>
                    <View style={[TextInputCss.iconView,{height: responsiveWidth(15)}]}>
                        <Icon name={Props.item.iconName} size={responsiveWidth(5)} color={Colors.inputBottomActionColor}
                              style={{ alignSelf:'center',margin:2
                              }}/>
                    </View>

                    <View style={{position: 'absolute'}}>
                        <View style={{marginTop: Dimensions.TextInputMarginTop, marginHorizontal:8}}>
                            {Props.item.activityIndicator ? <ActivityIndicator/> : null}
                        </View>
                    </View>


                </View>

                <View
                    style={{
                        flexDirection: 'row-reverse',
                        width: responsiveWidth(85),
                        justifyContent: 'space-between',
                    }}>


                    {Props.item.inputBottomActionTitle !== undefined ?
                        <TouchableOpacity onPress={() => Props.item.inputBottomActionTitle.onPress()}>
                            <Text style={[TextInputCss.inputBottomActionTitle, {
                                display: Props.item.inputBottomActionTitle.title !== null &&
                                Props.item.inputBottomActionTitle.title !== undefined ? 'flex' : 'none',
                            }]}>
                                {Props.item.inputBottomActionTitle.title !== undefined ? Props.item.inputBottomActionTitle.title : ''}
                            </Text>
                        </TouchableOpacity> : null
                    }


                    <Text style={[TextInputCss.inputBottomTextAlert, {
                        color:Props.item.inputBottomTextAlert === 'مجاز' &&
                        Props.item.type === 'userName'? 'green' : 'red',
                        marginRight: 8,
                        display: Props.item.inputBottomTextAlert !== null && Props.item.inputBottomTextAlert !== undefined ? 'flex' : 'none',
                    }]}>
                        {Props.item.inputBottomTextAlert}
                    </Text>

                </View>

            </View>
        );
    };

    const CustomTextInputWithButton = () => {
        return (
            <View style={[TextInputCss.inputContainerStyle, {marginBottom: 0, width: responsiveWidth(90)}]}>

                <Text
                    style={[TextInputCss.labelInputStyle, {display: Props.item.label !== null && Props.item.label !== undefined ? 'flex' : 'none'}]}>
                    {'* ' + Props.item.label + ':'}
                </Text>


                <View style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    borderWidth: Dimensions.TextInputBorderWidth,
                    width: responsiveWidth(90),
                    borderRadius: Dimensions.borderRadiusSize,
                    borderColor: activeTextInput !== Props.item.type ?
                        inactiveBorderColor :
                        activeBorderColor,
                }}>

                    <TouchableOpacity onPress={() => Alert.alert('جست و جو')}>
                        <View style={TextInputCss.inputButtonContainer}>
                            <Text numberOfLines={1} style={TextInputCss.inputButtonText}>
                                {Props.item.hasButton}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flex:'row'}}>

                    <TextInput
                        multiline={Props.multiline}
                        containerStyle={TextInputCss.TextInputContainerStyle}
                        placeholder={Props.item.placeholder}
                        placeholderTextColor={Colors.placeholderTextColor}
                        style={[TextInputCss.TextInputStyle, {
                            marginTop: 0,
                            borderWidth: 0,
                            height: Props.height,
                            textAlignVertical: Props.textAlignVertical || null,
                            paddingVertical: Props.paddingVertical,
                        }]}
                        returnKeyType={Props.item.returnKeyType}
                        ref={Props.item.currentRef}
                        onSubmitEditing={Props.item.onSubmitEditing}
                        onFocus={() => _onFocus(Props.item.type)}
                        onChangeText={Props.item.onChange}
                        keyboardType={Props.item.keyboardType}
                        maxLength={Props.item.maxLength}/>
                    </View>
                </View>

                <Text style={[TextInputCss.inputBottomActionTitle, {
                    alignSelf: 'flex-start',
                    display: Props.item.inputBottomActionTitle !== undefined ? 'flex' : 'none',
                }]}>
                    {Props.item.inputBottomActionTitle}
                </Text>

            </View>
        );
    };

    const CustomTextInputCodeVerify = () => {
        return (
            <View>

                        <TextInput
                            multiline={Props.multiline}
                            containerStyle={TextInputCss.containerCodeInput}
                            placeholder={Props.item.placeholder}
                            placeholderTextColor={Colors.placeholderTextColor}
                            style={[TextInput.TextInputStyle,{
                                marginLeft: 0,
                                borderWidth: 0,
                                textAlign: 'center',
                                width:responsiveWidth(85),
                                height: Props.height,
                                backgroundColor:'white',
                                borderTopWidth:1,
                                borderBottomWidth:1,
                                borderColor:Colors.placeholderTextColor,

                            }]}
                            returnKeyType={Props.item.returnKeyType}
                            ref={Props.item.currentRef}
                            onSubmitEditing={Props.item.onSubmitEditing}
                            onFocus={() => _onFocus(Props.item.type)}
                            onChangeText={Props.item.onChange}
                            keyboardType={Props.item.keyboardType}
                            maxLength={Props.item.maxLength}/>
                    </View>



        );
    };


    return (
        Props.code !== null && Props.code !== undefined &&  Props.code ? CustomTextInputCodeVerify() : CustomTextInputSimple()
    );

};

export default CustomTextInput;
