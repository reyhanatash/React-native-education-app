import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Alert, FlatList, SafeAreaView} from 'react-native';
import {ButtonCss} from '../style/ButtonCss';
import {Colors} from '../constant/Colors';
import {Dimensions} from '../constant/Dimensions';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import ImagePicker from 'react-native-image-picker';
import Button from './Button';
import {StaticObjects, Strings} from '../constant/String';
import {ImageViewCss} from '../style/ImageViewCss';
import {TextCss} from '../style/TextCss';
import {convertImage} from '../store/GlobalFunction';
import Orientation from 'react-native-orientation';


const CustomImage = (Props) => {

    const [orientationLand, setLandOrientation] = useState(false);
    const [newImage,setNewImage] = useState("")

    useEffect(() => {
       const initial = Orientation.getInitialOrientation();

        if (initial==='LANDSCAPE')
        setLandOrientation(true)
        else if(initial==='PORTRAIT' )
        setLandOrientation(false)

    }, []);


    Orientation.addOrientationListener((orientation)=>{
        if (orientation==='LANDSCAPE')
        setLandOrientation(true)
        else if(orientation==='PORTRAIT' )
        setLandOrientation(false)

    })

    const selectPhotoTapped = () => {
        const options = {
            title: 'انتخاب عکس',
            cancelButtonTitle: 'انصراف',
            takePhotoButtonTitle: ' جدید با دوربین',
            chooseFromLibraryButtonTitle: ' از تصاویر موجود',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: false,
            },
        };

        ImagePicker.showImagePicker(options, response => {

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {uri: response.uri};
                setNewImage(source);
                Props.importDtataImage(response.data,response.fileName)
            }
        });
    };
    return (
        <View style={{alignSelf: 'center', justifyItems: 'center'}}>
            <Text style={[TextCss.menualText, {alignSelf: 'flex-end', margin: responsiveWidth(2)}]}>{Props.title}</Text>
            <View  style={ImageViewCss.imagePicker}>
            {console.warn("#########",Props.image)}
            <Image
                style={{ width: responsiveWidth(40),
                    height: responsiveWidth(40), alignSelf:'center'}}
                source={Props.image === undefined&&Props.image === '' && newImage=== '' ? require('../assets/image/no_photo_available.png') :
                    newImage !== '' ? newImage : {uri:StaticObjects.imagePrefix+Props.image}}
            />
            </View>
            <TouchableOpacity onPress={() => selectPhotoTapped()}>
                <Button
                    loading={false}
                    style={{marginBottom: 0, marginTop: 20, height: responsiveWidth(10)}}
                    icon={null}
                    widthOfButton={responsiveWidth(28)}
                    buttonType={'Inactive'}
                    textValue={Strings.uploadImage}
                    height={responsiveWidth(10)}
                    textStyle={{fontSize: Dimensions.TextInputFontSize, fontFamily: Strings.fontFamilyLight}}/>
            </TouchableOpacity>
        </View>


    );

};

export default CustomImage;

export const styles = StyleSheet.create({});
