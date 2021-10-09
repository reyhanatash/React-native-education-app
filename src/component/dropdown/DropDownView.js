import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Alert, FlatList, SafeAreaView,Dimensions,ScrollView} from 'react-native';
import {ButtonCss} from '../../style/ButtonCss';
import {Colors} from '../../constant/Colors';
// import {Dimensions} from '../../constant/Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import DropDownItem from './DropDownItem';
import {TextCss} from '../../style/TextCss';
import Loading from '../Loading';
import NoData from '../NoData';

const {width,height}=Dimensions.get('window')
const DropDownView = (Props) => {
    const _renderingItem = (item, index) => {
        return (
            <DropDownItem  itemStye={{fontSize:Props.ModalSize!==undefined && Props.ModalSize===true?width*0.020:width*0.033}} item={item} onSelectedItem={Props.onSelectedItem}/>
        );
    };
    return (
        <ScrollView>
        <View style={{  
            alignSelf: 'center', marginTop:Props.ModalSize!==undefined  &&Props.ModalSize?0: responsiveHeight(22),
            padding: responsiveWidth(1),
            width:Props.ModalSize!==undefined?responsiveWidth(50):responsiveWidth(85), height: responsiveHeight(100), backgroundColor: Colors.backgrounColor,
        }}>
            <View style={{
                borderColor: Colors.registerInfoTitleValueColor
                ,flexDirection: 'row-reverse', justifyContent: 'space-between',
            }}>
                <Text style={TextCss.mediumTitleText,{fontSize:Props.ModalSize!==undefined &&Props.ModalSize===true?width*0.025:width*0.035}}>{Props.title}</Text>
                <TouchableOpacity style={{alignVertically:'center',
                    alignSelf:'center',
                    padding:responsiveWidth(2)}} onPress={Props.onClose}>
                    <Icon name={'close'} size={Props.ModalSize!==undefined&&Props.ModalSize===true?responsiveWidth(2):responsiveWidth(2)}
                          style={{
                              margin: 0, color: '#808080', marginHorizontal: 8,
                          }}/>
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flex: 1}}
                style={{

                    marginVertical: responsiveWidth(8),
                    flex: 1,
                }}

                data={Props.List}
                renderItem={({item, index}) => _renderingItem(item, index)}
                horizontal={false}
            />
        </View>
        </ScrollView>
    );

};

export default DropDownView;
