
import React,{useState,useEffect} from 'react';
import {Text, View,Image,Dimensions, TouchableOpacity,BackHandler,ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Strings,Screens} from '../constant/String';
import {push} from "../screens/MyNavigation/MyNavigation";
import {Navigation} from 'react-native-navigation';
import {GetResult} from '../redux/action';
const {width,height}=Dimensions.get("window")
const ExamResult: () => React$Node = (Props) =>{
  const dispatch=useDispatch()
  const userCourseList = useSelector(state => state.userCourseRed.data);
  const item= useSelector(state=>{return state.CourseId})
  const [courseList,setCourseList]= useState([])
  const result= useSelector(state=>{return state.globalReducer.QuizResult})
    useEffect(()=>{
        dispatch(GetResult(item.fldPkCourseStepCo))
    },[])

    useEffect(() => {

        if (userCourseList !== undefined)
            if (!userCourseList.includes("message"))
                     setCourseList(userCourseList)
    }, [userCourseList]);
    const backAction = () => {
      
    //    push(Props,Screens.Home)  
        // Navigation.push(Props.componentId, {
        //     component: {
        //       name:Screens.Profile,
        //       id:Screens.Profile,  
        //     },
        //   });
        // Navigation.popToRoot(Props.componentId)
        Navigation.push(Props.componentId, {
            component: {
              name:'login',
            },
          });
        }
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);
    const examdetail=useSelector(state=>{return state.globalReducer.ExamDetail})

    return(
        <ScrollView style={{backgroundColor:"white",minHeight:height}}>
             <View  style={{backgroundColor:"#7986CB",justifyContent:"center",flexDirection:"row-reverse"}}>
                      <Text style={{color:"white",fontSize:width*0.040,marginTop:width*0.040,fontFamily:Strings.fontFamilyLight,marginBottom:width*0.03,alignSelf:"center"}}> نتایج {examdetail!==undefined && examdetail.data[0].fldTitle}</Text>
            </View>
            <Image  style={{width:width,height:width*0.70,alignSelf:"center",resizeMode:"contain"}} source={require('../assets/image/Result.png')}/>
            <View style={{padding:width*0.080}}>
                    <View style={{flexDirection:"row-reverse",justifyContent:'space-between'}}>
                        <Text style={{fontFamily:Strings.fontFamilyLight,fontSize:width*0.035}}>{Strings.TotalQuestionNumber}:</Text>
                        <Text style={{fontFamily:Strings.fontFamilyLight,fontSize:width*0.035}}>{result!==undefined &&result.data.data[0].totalCount}</Text>
                    </View>
                    <View style={{borderWidth:0.2,marginTop:width*0.020}}></View>
                    <View style={{flexDirection:"row-reverse",justifyContent:'space-between'}}>
                        <Text style={{fontFamily:Strings.fontFamilyLight,marginTop:width*0.050,fontSize:width*0.035}}>{Strings.YoureTime}:</Text>
                        <Text style={{fontFamily:Strings.fontFamilyLight,marginTop:width*0.050,fontSize:width*0.035}}>{"0"}</Text>
                    </View>
                    <View style={{borderWidth:0.2,marginTop:width*0.020}}></View>
                    <View style={{flexDirection:"row-reverse",justifyContent:'space-between'}}>
                        <Text style={{fontFamily:Strings.fontFamilyLight,marginTop:width*0.050,fontSize:width*0.035}}>{Strings.CorrctAnswer}:</Text>
                        <Text style={{fontFamily:Strings.fontFamilyLight,marginTop:width*0.050,fontSize:width*0.035}}>{result!==undefined &&result.data.data[0].trueCount}</Text>
                    </View>
                    <View style={{borderWidth:0.2,marginTop:width*0.020}}></View>
                    <View style={{flexDirection:"row-reverse",justifyContent:'space-between'}}>
                        <Text style={{fontFamily:Strings.fontFamilyLight,marginTop:width*0.050,fontSize:width*0.035}}>{Strings.WrongAnswer}:</Text>
                        <Text style={{fontFamily:Strings.fontFamilyLight,marginTop:width*0.050,fontSize:width*0.035}}>{result!==undefined &&result.data.data[0].falseCount}</Text>
                    </View>
                    <View style={{borderWidth:0.2,marginTop:width*0.020}}></View>
                    <View style={{flexDirection:"row-reverse",justifyContent:'space-between'}}>
                        <Text style={{fontFamily:Strings.fontFamilyLight,marginTop:width*0.050,fontSize:width*0.035}}>{Strings.WithoutAnswer}:</Text>
                        <Text style={{fontFamily:Strings.fontFamilyLight,marginTop:width*0.050,fontSize:width*0.035}}>{result!==undefined &&result.data.data[0].noAnswerCount}</Text>
                    </View>
                    <View style={{borderWidth:0.2,marginTop:width*0.020}}></View>
                    <View style={{flexDirection:"row-reverse",justifyContent:'space-between'}}>
                        <Text style={{fontFamily:Strings.fontFamilyLight,marginTop:width*0.050,fontSize:width*0.035}}>{Strings.Percent}:</Text>
                        <Text style={{fontFamily:Strings.fontFamilyLight,marginTop:width*0.050,fontSize:width*0.035}}>{result!==undefined &&result.data.data[0].result}</Text>
                    </View>
            </View>
        </ScrollView>
    )
};
export default  ExamResult;



