  
import React, { useEffect, useState } from 'react'
import { View ,Dimensions, TouchableOpacity, ScrollView,Modal,Text} from 'react-native';


const {width,height}=Dimensions.get("window")
const TestModal = (Props) => { 
        return (
            <Modal
            animationType="slide"
            visible={TestModal}             
            transparent={true}>              
              <View style={{backgroundColor:"white",justifyContent:"center",alignItems:"center",alignSelf:"center",borderRadius:10,width:width*0.90,padding:10}}>
              <TouchableOpacity onPress={()=>setTestModal(false)}>
                  <Text style={{color:"red"}}>تایید و بستن</Text>
              </TouchableOpacity>
               <Text>سوال:{TestItems.Message || TestItems} </Text>
               <Text style={{marginTop:10}}>گزینه ها</Text>
               <ScrollView>
               {
               Options.length!==0 && Options.map((items,index)=>{
                 return(
                  <TouchableOpacity onPress={()=>SetOptionsindex(index)} style={{borderRadius:5,borderWidth:0.5,width:width*0.80,height:width*0.10,padding:5,marginTop:5,backgroundColor:index===Optionindex?"rgb(56, 80, 146)":"white"}}>
                     <Text style={{color:index===Optionindex?"white":"black"}}>{items.text}</Text>
                  </TouchableOpacity>
                 )
               }) 
                 }
               </ScrollView>
               <TouchableOpacity  onPress={()=>SendAnswer()} style={{backgroundColor:"#d51c29",borderRadius:5,padding:10,alignSelf:"center",marginTop:5,width:width*0.20,justifyContent:"center",alignItems:"center"}}>
                 <Text style={{color:"white"}}>ارسال</Text>
               </TouchableOpacity>
            </View>       
        </Modal>
           
        )
    }



export default TestModal