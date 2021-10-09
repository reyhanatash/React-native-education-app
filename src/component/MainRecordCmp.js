import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';
import {Screens, Strings} from '../constant/String';
import {MainRecordCss} from '../style/MainRecordCss';
import {Colors} from '../constant/Colors';
import {TextCss} from '../style/TextCss';
import {toPersianDigit} from "../store/GlobalFunction";


const MainRecordCmp = (Props) => {

    return (

        <TouchableOpacity onPress={Props.onPressItem}>
            <View style={[MainRecordCss.mainRecordStyle, {
                flexDirection:Props.horizontal?'column': 'row-reverse',
                justifyContent:'space-around',
                 width:Props.horizontal ? responsiveWidth(30): responsiveWidth(90),
                height:Props.horizontal ?responsiveWidth(20) :responsiveWidth(25)  ,
                alignItems: 'center',
                
                 backgroundColor: Props.item!== undefined ? Props.item.colorIcon !== undefined ? Props.item.colorIcon: 'white' : 'white',
                borderColor:  Props.item!== undefined ? Props.item.colorIcon!== undefined ? Props.item.colorIcon : 'white':  'white' ,

            },Props.style]}>
              {  Props.hasImage ?
               <View style={[MainRecordCss.circleView,{backgroundColor: Props.item!== undefined ?
                      Props.item.colorBackIcon: Colors.mainTextColor,   width:!Props.horizontal? responsiveWidth(12):responsiveWidth(10),
                         height: !Props.horizontal? responsiveWidth(12):responsiveWidth(10)}]}>
                    <Icon name={Props.item!== undefined ?
                        Props.item.icon === undefined ?'book': Props.item.icon : 'book' } 
                        size={responsiveWidth(6)}
                          style={{
                              textAlign:'center',
                              color: Props.item!== undefined ? Props.item.colorIcon: Colors.mainTextColor
                          }}/>
                </View>: null}
                <View style={{flexDirection:'column',alignItems:Props.TextFlex,flex:1,marginHorizontal:responsiveWidth(2)}}>
                    <Text style={TextCss.mediumTitleText,{fontSize:Props.item.title.length>8 ?responsiveFontSize(2.1):responsiveFontSize(2)
                    ,color:Props.backColor ? Colors.backgroundColor: Colors.cardTitleTextColor , 
                     marginTop:Props.horizontal ?Props.item.title.length>8?responsiveWidth(2) :0 :-responsiveWidth(3), marginBottom: Props.item.subTitle!==undefined ?
                      Props.item.subTitle.length !==0 ? 15 : 0 : 0, minWidth: responsiveFontSize(30), textAlign:Props.horizontal?'center':'right',fontFamily:Strings.fontFamilyLight}}>
                     {Props.item!== undefined ?toPersianDigit(Props.item.title):'empty'}</Text>
                   { Props.hasSubText ?
                       <Text style={[TextCss.subText,{marginEnd:responsiveWidth(2),color:Props.backColor ? Colors.backgroundColor:
                        Colors.cardTitleTextColor }]}>{Props.item!== undefined ?Props.item.subTitle:'empty'}</Text>: null}
                </View>
                {Props.hasChevron===true ? <Icon name={'chevron-left'} size={responsiveWidth(6)}
                      style={{
                          display: Props.icon !== 'undefined' && Props.icon !== null ? 'flex' : 'none',
                          margin: 0, color: Colors.mainTextColor, marginHorizontal: 8,
                      }}/>: null}
            </View>

        </TouchableOpacity>
    );

};

export default MainRecordCmp;
