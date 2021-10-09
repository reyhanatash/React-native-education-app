import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet} from 'react-native';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/Colors';




const Calender = (Props) => {

    return (

        <DatePicker
            style={{  alignSelf: 'center', marginTop:Props.ModalSize!==undefined && Props.ModalSize?-10: responsiveHeight(22),
                padding: responsiveWidth(1),
                width:Props.ModalSize!==undefined && Props.ModalSize?responsiveHeight(80): responsiveWidth(85), height:Props.ModalSize!==undefined && Props.ModalSize?responsiveHeight(50): responsiveHeight(64), backgroundColor: Colors.backgrounColor,}}
            isGregorian={false}
            mode="calendar"
            options={{
                defaultFont: 'Sahel-FD',
                headerFont: 'Sahel-Bold',
            }}
            onSelectedChange={(date) => date===getFormatedDate(new Date(), 'jYYYY/jMM/jDD') ? null: Props.onDateChange(date)}
            selected={getFormatedDate(new Date(), 'jYYYY/jMM/jDD')}
        />
    );

};

export default Calender;


