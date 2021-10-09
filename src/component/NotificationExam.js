import React,{useState,useEffect} from 'react';
import {Text, View,Image,Dimensions} from 'react-native';;
import {Strings} from '../constant/String';
import Icon from 'react-native-vector-icons/FontAwesome';


const {width,height}=Dimensions.get("window")
const InfoExam: () => React$Node = (Props) =>{
    return(
        <View style={{backgroundColor:"white"}}>
            <View style={{padding:width*0.030}}>
                <View style={{borderWidth:1,borderColor:"#7986CB",borderTopRightRadius:10,borderBottomRightRadius:5,padding:8}}>
                      <Text style={{color:"black",fontWeight:"bold",fontSize:width*0.035,fontFamily:Strings.fontFamilyBlack,}}>{Strings.Notifications}</Text>
                      <View style={{flexDirection:"row-reverse",justifyContent:"center"}}>
                           <View style={{width:width*0.050,alignItems:"center",marginRight:width*0.035}}>
                              <Icon name="bell" style={{color:"red",marginTop:5}}/>
                            </View>
                          <Text style={{color:"black",fontSize:width*0.035,fontFamily:Strings.fontFamilyLight}}>{Strings.note1}</Text>
                      </View>
                      <View style={{flexDirection:"row-reverse",justifyContent:"flex-start"}}>
                           <View style={{width:width*0.050,alignItems:"center"}}>
                                    <Icon name="bell" style={{color:"red",marginTop:5}}/>
                            </View> 
                             <Text style={{color:"black",fontSize:width*0.035,fontFamily:Strings.fontFamilyLight}}>{Strings.note2}</Text>
                          
                      </View>
                      <View style={{flexDirection:"row-reverse",marginLeft:width*0.013}}>
                         <View style={{}}>
                            <Icon name="bell" style={{color:"red",marginTop:5}}/>
                         </View>
                          <Text style={{color:"black",fontSize:width*0.035,width:width*0.83,fontFamily:Strings.fontFamilyLight}}>{Strings.note3}</Text>
                      </View>
                      
                </View>
            </View>
            
        </View>
    )
};
export default  InfoExam;

