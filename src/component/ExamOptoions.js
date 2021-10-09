import React, {useEffect, useState} from 'react';
import {
    Text, 
     TouchableOpacity,
     Dimensions
} from 'react-native';
import {Strings,Screens} from '../constant/strings';
const {width,height}=Dimensions.get("window")


const ExamOptions = (Props) => {
    const [DATA,SETDATA]=useState("")

    const onpress=(type,option)=>{
        SETDATA(option)
        // Props.selectedArray(type)
        Props.setselectedOption(type)  
        Props.OptionPress(type,option)   
    }
console.warn("**************",Props.type!==Props.answer)
    return (           
          <TouchableOpacity key={DATA} onPress={()=>onpress(Props.type,Props.exam)} style={{alignItems:"center",alignSelf:"center",borderWidth:1,borderRadius:10,width:width*0.90,padding:5,borderColor:"#7986CB",marginTop:5,backgroundColor:(Props.answer!==undefined && Props.answer!==null) ?(Props.type!==Props.answer.toString()?"white":"#7C4DFF"):(Props.type!==Props.selectoption!==null || Props.selectoption!==undefined && Props.selectoption.toString()?"white":"#7C4DFF")}}>
                     <Text style={{fontFamily:Strings.fontFamilyLight,color:"darkgray",fontSize:width*0.033}}>{Props.exam!==undefined &&Props.exam}</Text>
         </TouchableOpacity>
    );

};

export default ExamOptions;
