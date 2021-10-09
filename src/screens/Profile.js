import React, {useState, useRef, useEffect, useCallback} from 'react';
import {SafeAreaView, TouchableOpacity, View, Text, KeyboardAvoidingView, Modal, ScrollView, Dimensions} from 'react-native';
import Orientation from 'react-native-orientation';
import {CustomView} from '../style/CustomView';
import {ImageViewCss} from '../style/ImageViewCss';
import {Colors} from '../constant/Colors';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import TemplateView from '../component/TemplateView';
import Button from '../component/Button';
import {Strings} from '../constant/String';
import CustomTextInput from '../component/CustomTextInput';
import InfoUserModal from '../dataModal/InfoUserModal';
import DropDown from '../component/dropdown/DropDown';
import {sexList, tabsData} from '../constant/StaticLists';
import {TextCss} from '../style/TextCss';
import DropDownView from '../component/dropdown/DropDownView';
import {useDispatch, useSelector} from 'react-redux';
import {checkConnection, clearData, loadAudience, loadInfo, saveInfo,LOGOUTt} from '../redux/action';
import Calendar from '../component/Calender';
import CustomImage from '../component/Image';
import CustomConnectionSnackbar from '../component/CustomConnectionSnackbar';
import {CLEAR_MESSAGE_PROFILE} from '../redux/action/types';
import {isEmpty} from "../store/GlobalFunction";

const moment = require('moment-jalaali');
const {width,height}=Dimensions.get('window')
const Profile: () => React$Node = (Props) => {

    const [view, setView] = useState(1);
    const [modalType, setModalType] = useState(null);
    const [message, setMessage] = useState("");
    const [field, setField] = useState({id: -1, name: ' * رشته'});
    const [sex, setSex] = useState({id: -1, name: ' * جنسیت'});
    const [userInfo, setUserInfo] = useState({InfoUserModal});
    const [modalVisible, setModalVisible] = useState(false);
    const [birthDate, setBirthDate] = useState('');
    const [fieldArray, setFieldArray] = useState([]);
    const fieldList = useSelector(state => state.profileRed.fieldList);
    const profileInfo = useSelector(state => state.profileRed.profileInfo);
    const CheckToken = useSelector(state => state.profileRed);
    const allSelector = useSelector(state => state.profileRed);
    const [orientationLand, setLandOrientation] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        Dimensions.addEventListener('change', ({window:{width,height}})=>{
          if (width<height) {
            setLandOrientation(false)
          } else {
            setLandOrientation(true)
        
          }
        })
    
      }, []);

    const DesplaySnackbar = message => {
        useRef.ReactNativeConnectionSnackBar.ShowConnectionSnackBarFunction(
          message,
        );
      };

    useEffect(()=>{
        console.warn("dfdjfhsdkfhksjd",CheckToken.expireToken)
        if(CheckToken.expireToken===true){     
            dispatch(LOGOUTt())
           
        }
    },[CheckToken])

    useEffect(() => {
        async function profileApi() {
            await dispatch(loadInfo());
            await dispatch(loadAudience(-1));
        }
        profileApi().then(
        );     
    }, []);
    
    useEffect(() => {
        if (fieldList !== '' && fieldList !== undefined && fieldList.length !== 0) {
            let array = [];
            fieldList.forEach((value) => {
                array.push({
                    id: value.fldPkAudienceCo,
                    name: value.fldAudience,
                });
            });
            setFieldArray(array);
        }
        if (profileInfo !== '' && profileInfo !== undefined && profileInfo.length !== 0) {
           
            InfoUserModal.setName(profileInfo.fldName);
            InfoUserModal.setPhoneNumber(profileInfo.fldMobile);
            InfoUserModal.setEmail(profileInfo.fldEmail);
            InfoUserModal.setPhone(profileInfo.fldPhone);
            InfoUserModal.setPostalCode(profileInfo.fldPostalCode);
            InfoUserModal.setAddress(profileInfo.fldAddress);
            InfoUserModal.setFieldId(profileInfo.fldFkAudienceCo);
            InfoUserModal.setNationalCardImage(profileInfo.fldIDCardPicAddress);
            InfoUserModal.setCardFileName(profileInfo.fldIDCardPicAddress);
            InfoUserModal.setCardImage("");
            InfoUserModal.setUser(-1)
            InfoUserModal.setCertificateImage(profileInfo.fldCerificetePicAddress);
            InfoUserModal.setEduFileName(profileInfo.fldCerificetePicAddress);
            InfoUserModal.setEduImage("");
            InfoUserModal.setGradeId(3);
            InfoUserModal.setEmergencyCall("09129615106,09193965383");
            InfoUserModal.setSex(profileInfo.fldGender);
            InfoUserModal.setRegion(profileInfo.fldFkRegionCo);
            InfoUserModal.setBirthDay(profileInfo.fldBirthDay !== null ? moment(profileInfo.fldBirthDay, "YYYY-M-D'T'HH:mm:ss").format('YYYY/M/D') : '');
            setBirthDate(InfoUserModal.BirthDate !== '' ? moment(InfoUserModal.BirthDate, "YYYY/M/D").format('jYYYY/jM/jD') : '');
        }

    }, [fieldList, profileInfo]);
    useEffect(() => {
        console.warn("profileInfo.fldCerificetePicAddress",profileInfo)
        setMessage(allSelector.message)
        dispatch(clearData(CLEAR_MESSAGE_PROFILE));

    }, [allSelector.message]);

    const changeInputs = (value, id) => {
        switch (id) {
            case 0:
                InfoUserModal.setName(value)
                break;
            case 1:
                InfoUserModal.setEmail(value)
                break;
            case 2:
                InfoUserModal.setAddress(value)
                break;
            case 3:
                InfoUserModal.setPostalCode(value)
                break;
            case 4:
                InfoUserModal.setPhone(value)
                break;
        }
        setUserInfo({InfoUserModal})
    }
    const personalData = [
        {
            label: Strings.name,
            placeholder: userInfo.InfoUserModal.FullName,
            returnKeyType: 'next',
            currentRef: (input) => {
                useRef.one = input;
            },
            onSubmitEditing: () => {
                useRef.two.focus();
            },
            maxLength: 30,
            keyboardType: 'default', type: 'name',
            onFocus: (type) => null,
            onBlur: (type) => null,
            onChange: value => changeInputs(value, 0),
            inputValue: userInfo.InfoUserModal.FullName,
            iconName:'user',
            id: 0,
        },
        {
            label: Strings.email,
            placeholder: userInfo.InfoUserModal.Email,
            returnKeyType: 'done',
            currentRef: (input) => {
                useRef.two = input;
            },
            onSubmitEditing: () => null,
            maxLength: 30,
            keyboardType: 'email', type: 'email',
            onFocus: (type) => null,
            onBlur: (type) => null,
            onChange: value => changeInputs(value, 1),
            inputValue: userInfo.InfoUserModal.Email,
            iconName: 'inbox',
            id: 1,

        },
    ];
    const addressData = [
        {
            label: Strings.address,
            placeholder: userInfo.InfoUserModal.Address,
            returnKeyType: 'next',
            currentRef: (input) => {
                useRef.one = input;
            },
            onSubmitEditing: () => {
                useRef.two.focus();
            },
            maxLength: 30,
            keyboardType: 'default', type: 'address',
            onFocus: (type) => null,
            onBlur: (type) => null,
            onChange: value => changeInputs(value, 2),
            inputValue: userInfo.InfoUserModal.Address,
            iconName: 'map',
            id: 2,

        },
        {
            label: Strings.postalCode,
            keyboardType:"numeric",
            placeholder: userInfo.InfoUserModal.PostalCode,
            returnKeyType: 'next',
            currentRef: (input) => {
                useRef.two = input;
            },
            onSubmitEditing: () => {
                useRef.three.focus();
            },
            maxLength:10,
            type: 'postal',
            onFocus: (type) => null,
            onBlur: (type) => null,
            onChange: value => changeInputs(value, 3),
            inputValue: userInfo.InfoUserModal.PostalCode,
            iconName: 'code',
            id: 3,

        },
        {
            label: Strings.phoneNumber,
            placeholder: userInfo.InfoUserModal.Phone,
            returnKeyType: 'done',
            currentRef: (input) => {
                useRef.three = input;
            },
            onSubmitEditing: () => null,
            maxLength:11,
            keyboardType:"numeric", type: 'phone',
            onFocus: (type) => null,
            onBlur: (type) => null,
            onChange: value => changeInputs(value, 4),
            inputValue: userInfo.InfoUserModal.Phone,
            iconName: 'phone',
            id: 4,
        },
    ];


    const personalInfoView = () => {
        return (
            <ScrollView style={[CustomView.usualViewStyle,{marginBottom:responsiveHeight(5)}]}>

                {personalData.map((item) => {
                    return (
                        <KeyboardAvoidingView behavior={'position'}>
                            <CustomTextInput
                            //    iconStyle={orientationLand?"LANDSCAPE":undefined}
                                required={true}
                                editable={true}
                                setBorderColorItem={'#fff'}
                                item={item}
                                // height={width*0.150}
                                textAlignVertical={null}
                                styleLable={{fontSize:width*0.035}}
                                paddingVertical={null}/>
                        </KeyboardAvoidingView>
                    );
                })}
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <DropDown
                        title={InfoUserModal.AudienceId !== undefined && InfoUserModal.AudienceId !== null && (fieldArray.length !== 0 && fieldArray !== undefined) ? [fieldArray[InfoUserModal.AudienceId].name] : field.name}
                        icon={'chevron-down'}
                        onPressModal={() => [setModalType(2), setModalVisible(true)]}/>
                    <DropDown
                        title={InfoUserModal.Gender === undefined ? sex.name : InfoUserModal.Gender === 1 ? 'زن' : 'مرد'}
                        icon={'chevron-down'}
                        onPressModal={() => [setModalType(1), setModalVisible(true)]}/>
                </View>
                <DropDown title={birthDate === '' ? ' * تاریخ تولد' : birthDate} icon={'chevron-down'}
                          onPressModal={() => [setModalType(3), setModalVisible(true)]} style={{
                    marginTop: responsiveWidth(3),
                }}/>
                <TouchableOpacity style={{ bottom: responsiveWidth(4), alignSelf: 'center'}}
                                  onPress={() =>SubmitEdit() } >
                    <Button
                        loading={allSelector.loading}
                        style={{ marginBottom: 0, marginTop: responsiveWidth(5)}}
                        icon={null}
                        widthOfButton={responsiveWidth(85)}
                        buttonType={'Active'}
                        textValue={Strings.edit}
                        height={orientationLand?responsiveWidth(8):responsiveWidth(15)}
                    />
                </TouchableOpacity>

            </ScrollView>
        );
    };
    const addressInfoView = () => {
        return (
            <View style={CustomView.usualViewStyle}>
                {addressData.map((item) => {
                    return (
                        <KeyboardAvoidingView behavior={'position'}>
                            <CustomTextInput
                                required={true}
                                editable={true}
                                setBorderColorItem={'#fff'}
                                item={item}
                                height={null}
                                textAlignVertical={null}
                                paddingVertical={null}/>
                        </KeyboardAvoidingView>
                    );
                })}
                {InfoUserModal.Region !== null ? <Text
                    style={TextCss.menualText}>{Strings.province + InfoUserModal.Region + Strings.education}</Text> : null}
            </View>
        );
    };

    const pictureInfoView = () => {
        return (
            <View style={[{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignContent: 'center',
                width: responsiveWidth(89),
                marginBottom:responsiveWidth(5)
            },
                CustomView.usualViewStyle]}>
                
                <CustomImage image={'edu/'+profileInfo.fldCerificetePicAddress}
                 title={Strings.certificateImage}
                             importDtataImage={(value, name) => {
                            
                                 InfoUserModal.setEduImage(value);
                                 InfoUserModal.setEduFileName(name)
                             }}/>
                <CustomImage image={'card/'+profileInfo.fldIDCardPicAddress}
                 title={Strings.nationalCardImage}
                             importDtataImage={(value, name) => {
                                 InfoUserModal.setCardImage(value);
                                 InfoUserModal.setCardFileName(name)
                             }}/>
            </View>
        );
    };
    const choosedView = () => {
        switch (view) {
            case 1:
                return personalInfoView();
            case 2:
                return addressInfoView();
            case 3:
                return pictureInfoView();

        }

    };
    const modalPicker = () => {
        switch (modalType) {
            case 1:
                return <DropDownView ModalSize={orientationLand} List={sexList} onClose={() => setModalVisible(false)} title={'جنسیت'}
                                     onSelectedItem={(value) => [InfoUserModal.setSex(value.id), setSex({
                                         id: value.id,
                                         name: value.name,
                                     }), setModalVisible(false)]}/>;

            case 2:
                return <DropDownView   ModalSize={orientationLand} List={fieldArray} onClose={() => setModalVisible(false)} title={'رشته'}
                                     onSelectedItem={(value) => [InfoUserModal.setFieldId(parseInt(value.id) - 1), setField({
                                         id: value.id,
                                         name: value.name,
                                     }), setModalVisible(false)]}/>;
            case 3:
                return <Calendar ModalSize={orientationLand}
                    onDateChange={(date) => [InfoUserModal.setBirthDay(moment(date, 'jYYYY/jM/jD').format('YYYY/M/D')), setBirthDate(date), setModalVisible(false)]}/>;

        }

    };
    const checkInfo = () => {
       
        let returnedValue = true;
        if (isEmpty(InfoUserModal.FullName) )
            returnedValue = false;
        if (isEmpty(InfoUserModal.Gender))
            returnedValue = false;
        if (isEmpty(InfoUserModal.AudienceId ))
            returnedValue = false;
        if (isEmpty(InfoUserModal.BirthDate))
            returnedValue = false;
      
        return returnedValue
    }


    SubmitEdit=async()=>{
        // console.warn("the phone number in wrong",userInfo.InfoUserModal.Phone)
        let reg =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(InfoUserModal.Email!==null && reg.test(InfoUserModal.Email) === false) {
            DesplaySnackbar('ایمیل وارد شده صحیح نمی باشد')
        }else
 
        if(userInfo.InfoUserModal!==null &&  userInfo.InfoUserModal.Phone!==null && (userInfo.InfoUserModal.Phone.length<11 || userInfo.InfoUserModal.Phone.length>11)){
            DesplaySnackbar('شماره تماس وارد شده صحیح نمی باشد')
         console.warn("phonenumber is not valid")
        }
         else{
        if(userInfo.InfoUserModal.PostalCode!==null &&( userInfo.InfoUserModal.PostalCode.length<10 || userInfo.InfoUserModal.PostalCode.length>10)){
            DesplaySnackbar('کد پستی وارد شده صحیح نمی باشد')
         console.warn("phonenumber is not valid")
        } 
        
        else{
        if(checkInfo()){dispatch(saveInfo(InfoUserModal)) 
            await dispatch(loadInfo());}
        else {setMessage(' مقادیر ستاره دار را با فرمت مناسب پر کنید')}
        }
       }
        dispatch(loadInfo());
    }
    return (
        <SafeAreaView   keyboardShouldPersistTaps={'always'}
           style={{flex:1}}
           showsVerticalScrollIndicator={false} style={CustomView.mainViewScreenStyle}>
            <TemplateView
                Profile={true}
                BottomTabs={true}
                ImageStyle={ImageViewCss.backImageStyle}
                ViewStyle={[CustomView.templateViewStyleInner,{width: responsiveWidth(100),top: responsiveHeight(20)}]}
                height={orientationLand?responsiveHeight(65):responsiveHeight(68)}
                // animHeight={responsiveHeight(53)}
                src={require('../assets/image/03.png')}
                NavigationProps={Props}
                message={message}

            >
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => {
                    }}
                    transparent={true}>
                    {modalPicker()}
                </Modal>
                <View style={{
                    alignSelf: 'center',
                    width: responsiveWidth(90),
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    marginTop: responsiveWidth(5),
                }}>
                    {tabsData.map(value => {
                        return (
                            <TouchableOpacity onPress={() => {setView(value.id),
                   scrollView.scrollTo(0)
                    }}><Text
                                style={[TextCss.menualText, {
                                    borderBottomColor: view === value.id ? Colors.mainColorOne : 'transparent',
                                    borderBottomWidth: 1,
                                    paddingBottom: responsiveWidth(2),
                                }]}>{value.name}</Text></TouchableOpacity>

                        );
                    })}

                </View>
            <ScrollView ref={(view) =>
            scrollView = view}>
                <KeyboardAvoidingView style={{flex:1,minHeight:view!==1?height:height*0.9}} behavior="padding" enabled  >
                {choosedView()}
            
               {view!==1 && <TouchableOpacity style={{ bottom: responsiveWidth(5), alignSelf: 'center'}}
                                  onPress={() =>SubmitEdit() } >
                    <Button
                        loading={allSelector.loading}
                        style={{ marginBottom: 0, marginTop: responsiveWidth(5)}}
                        icon={null}
                        widthOfButton={responsiveWidth(85)}
                        buttonType={'Active'}
                        textValue={Strings.edit}
                        height={orientationLand?responsiveWidth(8):responsiveWidth(15)}
                    />
                </TouchableOpacity>}
              </KeyboardAvoidingView>
            </ScrollView>
            </TemplateView>


        </SafeAreaView>);

};
export default Profile;
