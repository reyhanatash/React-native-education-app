import React,{useState,useEffect} from 'react';
import {Text, SafeAreaView, View, FlatList,Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import TemplateView from '../component/TemplateView';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/Colors';
import {CustomView} from '../style/CustomView';
import {ImageViewCss} from '../style/ImageViewCss';
import LongTextCmp from '../component/LongTextCmp'
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextCss} from '../style/TextCss';
import {Strings} from '../constant/String';
import {getAnnouncement,getGlobalAnnoncement,readyApi,loadCourser, LOGOUTt} from '../redux/action';
import PropTypes from 'prop-types';
import {loadingFlatList, renderData} from '../store/GlobalFunction';
import Loading from '../component/Loading';
import WebView  from 'react-native-webview';
import NoData from '../component/NoData';


const PublicNotification: () => React$Node = (Props) =>{

    const[announceList,setAnnounceList]=useState([])
    const userCourseList = useSelector(state => state.userCourseRed.data);
    const list = useSelector(state => state.userCourseRed.announcementLis);
    const globallist=useSelector(state=>state.GlobalAnnoncement.announcementLis)
    const chekToken=useSelector(state=>state.GlobalAnnoncement)
    const message = useSelector(state => state.userCourseRed.message);
    const allSelector = useSelector(state => state.userCourseRed);
    const [orientationLand, setLandOrientation] = useState(false);
    const[listItem,SetListItem]=useState([])
    const dispatch = useDispatch();
// console.warn("!!!!!!!!!!!!list",globallist)
    useEffect(() => {
        Dimensions.addEventListener('change', ({window:{width,height}})=>{
          if (width<height) {
            setLandOrientation(false)
          } else {
            setLandOrientation(true)
        
          }
        })
    
      }, []);
   

useEffect(()=>{
    // console.warn("@@@@@@@checktoken",chekToken.expireToken)
    if(chekToken.expireToken===true){     
        dispatch(LOGOUTt())     
    }
},[chekToken])

    const getinfo=async()=>{
        await  dispatch(loadCourser(-1),2);
        if(userCourseList!==undefined){
        for(let i=0;i<=userCourseList.length;i++){
        
       await  dispatch(getAnnouncement(userCourseList[i].fldPkCourseCo));
        
        }
    }
    }


    useEffect(() => {   
        dispatch(    
           getGlobalAnnoncement(-1)
        );
    }, []);

    useEffect(()=>{
        let array = []
        let DATA
        if(globallist!==undefined && globallist.length!==0){
        globallist.forEach((item)=>{ 
            DATA={Name:item.fldAnnouncement,Date:item.fldCreateDate.slice(0,10),Type:item.typeMessage},
            array.push(DATA)})
    }

        setAnnounceList(array)

    },[globallist]);

  

    return(
        <SafeAreaView   style={CustomView.mainViewScreenStyle}>
            <TemplateView
                BottomTabs={true}
                ImageStyle={ImageViewCss.backImageStyle}
                ViewStyle={[CustomView.templateViewStyleInner,{width:orientationLand?responsiveWidth(100): responsiveWidth(100),top: responsiveHeight(20)}]}
                height={responsiveHeight(85)}
                animHeight={responsiveHeight(53)}
                src={require('../assets/image/03.png')}
                NavigationProps={Props}
                message={message}

            >
                <View style={{flexDirection: 'row-reverse',alignItems:'center',justifyContent:'center', margin:responsiveWidth(3)}}>
                    <Icon name={'flag'} size={responsiveWidth(6)}
                          style={{
                              textAlign: 'center',
                              color: 'white',
                              backgroundColor: Colors.mainTextColor,
                              padding: responsiveWidth(2),
                              width: responsiveWidth(10),
                              height: responsiveWidth(10),
                              borderRadius: responsiveWidth(10) / 2,
                              alignSelf: 'center',
                              alignItems:'center'}}/>

                    <Text style={[TextCss.mediumTitleText, {marginTop: -responsiveWidth(2)}]}>
                        {Strings.announcement}
                    </Text>
                </View>
                {/* {console.warn("@@@@@@@",globallist)} */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        alignContent: 'center',
                        justifyContent: 'flex-end',
                    }}
                    ListEmptyComponent={ allSelector.loadingAnnouncement ? <Loading ViewStyle={{position:'relative', marginTop:responsiveWidth(10)}}/> :list!==undefined && list.length===0 ?  <NoData/>: null}
                    style={{backgroundColor: 'transparent', marginBottom: responsiveWidth(8),
                    }}
                    data= {globallist!==undefined && globallist!==null && globallist.sort((a, b) =>  Date.parse(new Date(b.fldCreateDate1.split("/").reverse().join("-"))) -  Date.parse(new Date(a.fldCreateDate1.split("/").reverse().join("-")))) }
                    renderItem={({item, index}) =>  <LongTextCmp item={item} key={index}/>}
                    horizontal={false}
                />

            </TemplateView>
        </SafeAreaView>
    )
};
export default  PublicNotification;
PublicNotification.propTypes = {
    Props: PropTypes.string.isRequired,
};
