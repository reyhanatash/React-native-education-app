import React from 'react';
import {Text} from 'react-native'
import { updateProps } from '../navigation/Navigation';

    
    const TextView = (Props) => {
   
    return (
        <Text style={{...Props.style}}>
            {Props.item}
        </Text>);

};
export default TextView;
