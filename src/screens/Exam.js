
import React,{useState,useEffect} from 'react';
import {Text, View,Image,Dimensions, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Strings,Screens} from '../constant/String';
// import {Strings,Screens} from '../constant/String';
import {push} from "../screens/MyNavigation/MyNavigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Navigation} from 'react-native-navigation';
import CountDown from 'react-native-countdown-component';
import {getDetailExam,getExam,AnswerQuestion} from '../redux/action';
import Options from '../../src/component/ExamOptoions'
const {width,height}=Dimensions.get("window")
const Exam: () => React$Node = (Props) =>{
  const[count,setcount]=useState(1)
  const [selectoption,setselectedOption]=useState("")
  const [Question,setQuestion]=useState([])
  const examdetail=useSelector(state=>{return state.globalReducer.ExamDetail})
  const exam=useSelector(state=>{return state.globalReducer.examData})
  const answerquestion=useSelector(state=>{return state.globalReducer.answerQuestion})
  const dispatch=useDispatch()
  const item= useSelector(state=>{return state.CourseId})
  useEffect(()=>{
    dispatch(getDetailExam(item.fldPkCourseStepCo))  
  },[])
  useEffect(()=>{
   let data={
     courseStepId:item.fldPkCourseStepCo,
     questionId: 0,
     action:1
   }
   dispatch(getExam(data))    
  exam!==undefined && exam!=="" && exam.lenght!==0 && setQuestion(Question=>[...Question,exam!==undefined && exam.data.data[0]])
  
 },[])

   const OptionPress=(type,option)=>{
      // console.warn("7777",exam.data.data[0].fldQuestionNumber)
      if(exam!==undefined){
      setselectedOption(type)
        exam.data.data[0].fldAnswer=type}
   }



   const nextPress=async()=>{
      setselectedOption("")
      if(exam!==undefined &&  count<=examdetail.data[0].column1)
      {
          setcount(count+1)
      let ex={
         courseStepId:item!==undefined && item.fldPkCourseStepCo,
         questionId:exam.data.data[0].fldQuestionNumber,
         action:1
       }
       dispatch(getExam(ex))
       let data={
         questionId:exam.data.data[0].fldPkQuestion,
         answer:selectoption
      }
      dispatch(AnswerQuestion(data))
       } 
       if(examdetail!==undefined && count===examdetail.data[0].column1){
          push(Props,Screens.ExamResult)

       }  
      var option=exam!==undefined && exam.data.data[0].fldAnswer
       setselectedOption(option)
       exam!==undefined && exam!=="" && exam.lenght!==0 && setQuestion(Question=>[...Question,exam.data.data[0]])
   }

   const PreviousPress=()=>{
    setselectedOption("")
      if(examdetail!==undefined && count<=examdetail.data[0].column1 &&count!==1 )
      { setcount(count-1)
         console.warn("ddd")
      let ex={
         courseStepId:item.fldPkCourseStepCo,
         questionId:exam.data.data[0].fldQuestionNumber,
         action:2
       }
       dispatch(getExam(ex))
       let data={
         questionId:exam.data.data[0].fldPkQuestion,
         answer:selectoption
      }
      dispatch(AnswerQuestion(data))
       } 
       var option=exam!==undefined &&  exam.data.data[0].fldAnswer
       setselectedOption(option)
      
   }

   const finishedQuiz=()=>{
      Alert.alert(
         "هشدار",
         "زمان آزمون شما به پایان رسیده است",
         [
          
           { text: "باشه", onPress: () => console.log("OK Pressed") }
         ],
         { cancelable: false }
       );
      // alert('زمان آزمون شما به پایان رسیده است')
      push(Props,Screens.ExamResult)
   }

    return(
       <ScrollView>
        <View style={{backgroundColor:"white",minHeight:height}}>
            <View  style={{backgroundColor:"#7986CB",justifyContent:"space-around",flexDirection:"row-reverse"}}>
                      <Text style={{fontFamily:Strings.fontFamilyBlack,color:"white",fontSize:width*0.040,marginTop:width*0.040,fontWeight:'bold',marginBottom:width*0.03,alignSelf:"center",marginRight:width*0.250}}>{examdetail!==undefined && examdetail.data[0].fldTitle}</Text>
                      <TouchableOpacity onPress={()=> Navigation.pop(Screens.Exam)}>
                         <Icon name="angle-left"  style={{color:"white",fontSize:width*0.060,marginTop:width*0.030}}/>
                     </TouchableOpacity>
            </View>
            <View >
                 
                 <View style={{alignSelf:"flex-start",marginLeft:width*0.050}}>
                      <Text style={{alignSelf:"center",fontSize:width*0.025,marginTop:width*0.050,fontFamily:Strings.fontFamilyLight}}>زمان آزمون</Text>
                      <CountDown
                        timeLabelStyle={{fontSize:width*0.021,color:"black"}}
                        timeToShow={[ 'M', 'S']}
                        timeLabels={{ m: 'دقیقه', s: 'ثانیه'}}
                        until={examdetail!==undefined && examdetail.data[0].fldTestTime*60}
                        onFinish={() =>finishedQuiz()}
                        // onPress={() => alert('hello')}
                        size={13}
                        digitStyle={{backgroundColor:"#7986CB",marginTop:width*0.030,fontWeight:'bold'}}
                        digitTxtStyle={{color: "#FFF" }}
                      />
                     
                 </View>  
                 {exam!==undefined && exam.data.data[0].fldQuestionPicAddress!=="" &&
                 <View style={{flexDirection:"row",alignSelf:"center",marginTop:width*0.050}}>
                      <Icon name="hand-o-right" size={20} style={{marginRight:5}}/>
                      <Text style={{fontFamily:Strings.fontFamilyLight}}> سوال  {exam!==undefined &&exam.data.data[0]!==undefined && exam.data.data[0].fldQuestionNumber!==null && exam.data.data[0].fldQuestionNumber!==undefined && exam.data.data[0].fldQuestionNumber}</Text>
                      <Icon name="hand-o-left" size={20} style={{marginLeft:5}}/>
                  </View> 
                   
                   }
                 {exam!==undefined && exam.data.data[0].fldQuestionPicAddress==="" &&
                   <View style={{flexDirection:"row-reverse",padding:width*0.020}}>
                     <Text style={{fontFamily:Strings.fontFamilyLight}}> . {exam!==undefined &&exam.data.data[0]!==undefined && exam.data.data[0].fldQuestionNumber!==null && exam.data.data[0].fldQuestionNumber!==undefined && exam.data.data[0].fldQuestionNumber}</Text>
                     <Text style={{ffontFamily:Strings.fontFamilyLight}}>{exam!==undefined &&exam.data.data[0]!==undefined && exam.data.data[0].fldQuestionNumber!==null &&exam.data.data[0].fldQuestionTitel}</Text>
                  </View> }
                  {exam!==undefined &&exam.data.data[0]!==undefined && exam.data.data[0].fldQuestionPicAddress!=="" && <View>
                     <Image style={{width:width*0.900,height:width*0.50,borderRadius:5,alignSelf:"center",resizeMode:"contain"}}  source={{uri:`https://api.famiran.com/files/exam/${exam!==undefined && exam.data.data[0].fldQuestionPicAddress!==undefined && exam.data.data[0].fldQuestionPicAddress}`}}/>
                  </View>}
                  
                  <Options answer={exam!==undefined && exam.data.data[0].fldAnswer!==undefined && exam.data.data[0].fldAnswer} selectoption={selectoption}  exam={exam!==undefined && exam.data.data[0].fldAnswerTitel1} type={"1"} setselectedOption={setselectedOption} OptionPress={OptionPress}/>
                  <Options answer={exam!==undefined &&exam.data.data[0].fldAnswer!==undefined && exam.data.data[0].fldAnswer} selectoption={selectoption} exam={exam!==undefined && exam.data.data[0].fldAnswerTitel2} type={"2"} setselectedOption={setselectedOption}  OptionPress={OptionPress}/>
                  <Options answer={exam!==undefined &&exam.data.data[0].fldAnswer!==undefined && exam.data.data[0].fldAnswer} selectoption={selectoption} exam={exam!==undefined && exam.data.data[0].fldAnswerTitel3} type={"3"} setselectedOption={setselectedOption}  OptionPress={OptionPress}/>
                  <Options answer={exam!==undefined &&exam.data.data[0].fldAnswer!==undefined && exam.data.data[0].fldAnswer} selectoption={selectoption} exam={exam!==undefined && exam.data.data[0].fldAnswerTitel4} type={"4"} setselectedOption={setselectedOption}  OptionPress={OptionPress}/>
             
             </View>
            <View style={{flexDirection:"row-reverse",marginTop:width*0.050,justifyContent:"space-between",padding:10}}>
                    <TouchableOpacity onPress={()=>PreviousPress()} style={{flexDirection:"row-reverse",backgroundColor:"#9E9E9E",borderRadius:5,padding:5,width:width*0.20,justifyContent:"center"}}>
                        <Text style={{padding:3,fontFamily:Strings.fontFamilyBlack,marginRight:10,alignItems:"center",color:"white"}}>قبلی</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>nextPress()} style={{flexDirection:"row",backgroundColor:"#7986CB",borderRadius:5,padding:5,width:width*0.20,justifyContent:"center"}}>
                      <Text style={{padding:3,fontFamily:Strings.fontFamilyBlack,marginRight:10,alignItems:"center",color:"white"}}>{count>=examdetail.data[0].column1 ? "پایان" :"بعدی"}</Text>
                    </TouchableOpacity>
             </View>    
        </View>
        </ScrollView>
    )
};
export default  Exam;



