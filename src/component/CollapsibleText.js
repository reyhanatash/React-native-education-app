import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TextCss} from '../style/TextCss';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';

const CollapsibleText = (Props) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <View style={TextCss.textWithBackStyle}>
            <Text style={[TextCss.menualText]}>
                {collapsed ? Props.Text : Props.Text.substring(0, 120)} {' ...'}
            </Text>
            <TouchableOpacity
                onPress={() => setCollapsed(!collapsed)}
                style={{width: responsiveWidth(5), height: responsiveWidth(5), alignItems: 'center'}}>
                <Icon name={collapsed ? 'chevron-up' : 'chevron-down'} size={responsiveWidth(2.5)}
                      style={{
                          textAlign: 'left',
                          color: 'black',
                      }}/>
            </TouchableOpacity>
        </View>
    )
        ;
};
export default CollapsibleText;
