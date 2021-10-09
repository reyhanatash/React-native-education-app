import React,{useState,useEffect} from 'react';
import {Text, SafeAreaView, View,Image,Dimensions, TouchableOpacity,ScrollView,StyleSheet,Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/Colors';
import {ImageViewCss} from '../style/ImageViewCss';
import {Strings,Screens} from '../constant/String';
import {SaveAnswerQuestion} from '../redux/action';
import { number, string } from 'prop-types';
import {downloadFile, isEmpty} from '../store/GlobalFunction';
import {push,pop} from "../screens/MyNavigation/MyNavigation";
import {Navigation} from 'react-native-navigation';
import {getAllExam,deleteAnswer} from '../redux/action';
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import Buton from '../component/Button'
import Pdf from 'react-native-pdf';

const {width,height}=Dimensions.get("window")

const DedicatedExam: (Props) => React$Node = (Props) =>{
    // data=Props.params.items.fldNumberQuestions
  const [Number,setNumber]=useState([])
  const [Questions,setQuestions]=useState(true)
  const [AnswerSheet,setAnswerSheet]=useState(false)
  const item= useSelector(state=>{return state.CourseId})
  const examdetail=useSelector(state=>{return state.globalReducer.ComprehensiveExam})
//   const [ExamTime,setExamTime]=useState(0)
//   const [PdfUrl,setPdfUrl]=useState(0)

  // console.warn("examdetail",item)
  const dispatch=useDispatch()

  const ShowAnswerSheet=()=>{
      if(examdetail!==undefined){
      for(let i=1;i<=examdetail.data.data[1].fldNumberQuestions ;i=i+1){
          if(Number.length<30){
       
        setNumber(Number => [...Number,{questionNumber:i,option:0}]);
        console.warn("111111111");
          <Text style={{fontSize:50}}>jkbkfjsk</Text>
   
     }

  }
}
  }
  useEffect(()=>{
 dispatch(getAllExam(item.fldPkCourseStepCo))
  },[])


const finishedQuiz=()=>{
    Alert.alert(
       "هشدار",
       "زمان آزمون شما به پایان رسیده است",
       [
        
         { text: "باشه", onPress: () => console.log("OK Pressed") }
       ],
       { cancelable: false }
     );

  if(examdetail!==undefined  ){
     push(Props,Screens.ReportCard,"",{id:Props.params.id})

  }else{

  }
 }


const source = {uri:examdetail!==undefined && examdetail.data.data[1].fldFileUrl,cache:true};

const selectOption=async(NumberQuestion,option)=>{
   var newItems = Number;
    newItems[NumberQuestion].option=option;  
    setNumber(Number=>[...Number])
    console.warn("@@@@",Props.params.ID)
    var data={    
            courseStepId:Props.params.ID,
            questionNum:NumberQuestion,
            answer:option
    }  
    dispatch(SaveAnswerQuestion(data)) 
}



const deletePress=(questionNumber)=>{
    var newItems = Number;
    newItems[questionNumber].option=0;  
    setNumber(Number=>[...Number])
    dispatch(deleteAnswer(questionNumber))
   

}
console.warn("exam detail",examdetail!==undefined && examdetail.data.data[1])
    return(
        <View>
         <View style={{alignSelf:"flex-start",marginLeft:width*0.050}}>
                      {/* <Text style={{alignSelf:"center",fontSize:width*0.025,marginTop:width*0.050,fontFamily:Strings.fontFamilyLight}}>زمان آزمون</Text> */}
                      <CountDown
                        timeLabelStyle={{fontSize:width*0.020,color:"black"}}
                        timeToShow={[ 'M', 'S']}
                        timeLabels={{ m: 'دقیقه', s: 'ثانیه'}}
                        until={examdetail!==undefined &&  examdetail.data.data[1].fldTestTime*60}
                        onFinish={() =>finishedQuiz()}
                        // onPress={() => alert('hello')}
                        size={13}
                        digitStyle={{backgroundColor:"#7986CB",marginTop:width*0.030}}
                        digitTxtStyle={{color: "#FFF" }}
                      />
                     
            </View>  
              <View  style={{flexDirection:"row",justifyContent:"center"}}>             
                      <TouchableOpacity style={{borderColor:"blue",borderWidth:1,padding:5,alignSelf:"center",backgroundColor:AnswerSheet===true?"#7986CB":"white",width:width*0.50,alignItems:"center",justifyContent:"center",borderTopLeftRadius:20}} onPress={()=>{setQuestions(false),setAnswerSheet(true)}}>
                        <Text style={{color:AnswerSheet===true?"white":"black",fontFamily:Strings.fontFamilyLight}}>پاسخنامه</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={{borderColor:"blue",borderWidth:1,padding:5,backgroundColor:Questions===true?"#7986CB":"white",width:width*0.50,alignSelf:"center",alignItems:"center",justifyContent:"center",borderTopRightRadius:20}} onPress={()=>{setQuestions(true),setAnswerSheet(false)}}>
                         <Text style={{color:Questions===true?"white":"black",fontFamily:Strings.fontFamilyLight}}>سوالات آزمون</Text>
                     </TouchableOpacity>
            </View>
        
      {/* <ScrollView> */}
      { Questions===true &&  <View style={styles.container}>       
            <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={styles.pdf}/>
        </View>}
        { 
        <View>      
         {ShowAnswerSheet()}
         <ScrollView style={{marginBottom:width*0.50}}>
         {AnswerSheet===true &&  Number.map((items,index)=>{
             console.warn(items,"ss")
            
         return (  
             <View style={{padding:10,flexDirection:"row-reverse",alignSelf:"center"}}>
              <Text style={{justifyContent:"center"}}> . {items.questionNumber}</Text>
                <View key={index}  style={{flexDirection:"row-reverse",alignSelf:"center",marginTop:5}}>
                    <TouchableOpacity onPress={()=>selectOption(index,1)} style={{width:width*0.17,borderRadius:5,borderWidth:0.5,borderColor:"blue",alignItems:"center",justifyContent:"center",margin:3,backgroundColor:items.option===1?"#7986CB":"white"}}>
                        <Text style={{fontFamily:Strings.fontFamilyLight,color:items.option===1?"white":"black"}}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>selectOption(index,2)} style={{width:width*0.17,borderRadius:5,borderWidth:0.5,borderColor:"blue",alignItems:"center",justifyContent:"center",margin:3,backgroundColor:items.option===2?"#7986CB":"white"}}>
                        <Text style={{fontFamily:Strings.fontFamilyLight,color:items.option===2?"white":"black"}}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>selectOption(index,3)}  style={{width:width*0.17,borderRadius:5,borderWidth:0.5,borderColor:"blue",alignItems:"center",justifyContent:"center",margin:3,backgroundColor:items.option===3?"#7986CB":"white"}}>
                        <Text style={{fontFamily:Strings.fontFamilyLight,color:items.option===3?"white":"black"}}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>selectOption(index,4)} style={{width:width*0.17,borderRadius:5,borderWidth:0.5,borderColor:"blue",alignItems:"center",justifyContent:"center",margin:3,backgroundColor:items.option===4?"#7986CB":"white"}}>
                        <Text style={{fontFamily:Strings.fontFamilyLight,color:items.option===4?"white":"black"}}>4</Text>
                    </TouchableOpacity>
                   {items.option!==0  && <TouchableOpacity  onPress={()=>deletePress(index)} style={{width:width*0.1,borderRadius:5,backgroundColor:"red",alignItems:"center",justifyContent:"center",margin:3}} >
                        <Icon name="eraser" color="white"/>
                    </TouchableOpacity>  }                
              </View>
             
            </View>)

         })}
         </ScrollView>
         </View>
      }
   
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        // flex:1,
        width:Dimensions.get('window').width,
         minHeight:Dimensions.get('window').height,
    }
});
export default  DedicatedExam;

