import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput,Text,TouchableOpacity} from 'react-native';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {searchInputCss} from '../style/TextInputCss';
import {Strings} from '../constant/String';
import {Colors} from '../constant/Colors';
import {TextCss} from '../style/TextCss';



const SearchView = (Props) => {

    const [searchValue, setSearchValue]= useState("");
    return (
            <View style={[{flexDirection:'row',marginTop:responsiveWidth(1)},searchInputCss.mainView]}>

                <TouchableOpacity style={{ alignSelf:'center',margin:10
                }} onPress={searchValue === "" ? Props.onClose :()=>setSearchValue("")}>
                    <Icon name={'close'} size={responsiveWidth(4)} color={Colors.placeholderTextColor}
                          />
                </TouchableOpacity>

                <TextInput
                    onChangeText={(text)=>setSearchValue(text)}
                    value={searchValue}
                           placeholder={searchValue===""?Strings.search_txt:""}
                           placeholderTextColor={Colors.placeholderTextColor}
                           style={[TextCss.menualText,{alignSelf:'flex-end',marginEnd:responsiveWidth(2), width:responsiveWidth(70)}]}
                />
                <Icon name={'search'} size={responsiveWidth(4)} color={Colors.placeholderTextColor}
                      style={{ alignSelf:'center',margin:2
                      }}/>
            </View>

    );

};

export default SearchView;

export const styles = StyleSheet.create({

});
