  
import React, { useEffect, useState } from 'react'
import { View ,Dimensions, TouchableOpacity, ScrollView,Text} from 'react-native';
import {Strings} from '../constant/String';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    userLiveList,
     getMessageJoin, 
     TOAdmin,
     BroadCastMessage,
     loadInfo,
     DeleteMessage,
     ReplayMessage,
     SendMessageTOUser,
     SendAnswerQusestion,
     getConnection} from "../redux/action";
// import {downloadFile, isEmpty} from '../store/GlobalFunction';
const { width, height } = Dimensions.get("window")

const UserChat = (Props) => { 

    
//  console.warn("8*******************props all messages",Props.MessageToadmin.messageId)
    return(
            <View>
                {Props.MessageToadmin.message!==undefined && <View style={{backgroundColor:"white",borderRadius:10,marginBottom:3,padding:3,width:width*0.66,alignSelf:"center"}}>
                    <View>
                        <View style={{flexDirection:"row-reverse",justifyContent:"space-between",}}>
                            {  <View style={{flexDirection: "row-reverse",alignSelf:"flex-end"}}>
                                <Text style={{ marginLeft: 4, fontWeight: "bold",fontFamily:Strings.fontFamilyBold }}>{(Props.MessageToadmin.type===0 &&Props.MessageToadmin.fullName===null?"کاربر":Props.MessageToadmin.fullName)|| Props.MessageToadmin.type===1 && "ادمین" || Props.MessageToadmin.type===2 && "سوال"|| Props.MessageToadmin.IsAdmin ===true && "ادمین"}</Text>
                                <Text>:</Text>
                            </View>}                   
                        </View>
                        <View>
                        <View style={{marginTop:5,alignSelf:"flex-end",backgroundColor:"white",padding:5,borderRadius:5,justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontFamily:Strings.fontFamilyLight }}>{Props.MessageToadmin.message}</Text>
                        </View>
                        {Props.MessageToadmin.type==2 && <TouchableOpacity onPress={()=>{Props.MessageToadmin.isEnd!==true?Props.showTestModal(Props.MessageToadmin):Props.showchartModal(Props.MessageToadmin)}} style={{backgroundColor:"rgb(56, 80, 146)",width:width*0.30,height:30,alignItems:"center",justifyContent:"center",borderRadius:5}}>
                            <Text style={{color:"white",fontFamily:Strings.fontFamilyLight}}>{Props.MessageToadmin.isEnd!==true?"پاسخ دادن":"مشاهده نتیجه"}</Text>
                        </TouchableOpacity>}
                      {Props.Role==="1" &&  <View style={{flexDirection:"row"}}>
                                    { Props.MessageToadmin.approved!==true && Props.MessageToadmin.type!==2 &&<TouchableOpacity   onPress={()=>Props.ApprovedText(Props.MessageToadmin.message,Props.MessageToadmin.messageId,Props.MessageToadmin.fullName)} style={{backgroundColor:"red",borderRadius:5,width:50,height:25,justifyContent:"center",alignItems:"center",marginLeft:5}}>
                                        <Text style={{color:"white"}}>تایید</Text>
                                    </TouchableOpacity>}
                                    {Props.MessageToadmin.type!==1 && Props.MessageToadmin.type!==2 && <TouchableOpacity onPress={()=>ReplayText(Props.MessageToadmin.message,Props.MessageToadmin.messageId,index,Props.MessageToadmin.fullName)} style={{backgroundColor:"red",borderRadius:5,width:50,height:25,justifyContent:"center",alignItems:"center",marginLeft:5}}>
                                    <Icon name="reply" color={"white"}/>
                                    </TouchableOpacity>}
                                    {Props.MessageToadmin.deleted===false &&Props.MessageToadmin.type!==2 &&  <TouchableOpacity onPress={()=>Props.deleteText(Props.MessageToadmin.message,Props.MessageToadmin.messageId)} style={{backgroundColor:"red",borderRadius:5,width:50,height:25,justifyContent:"center",alignItems:"center",marginLeft:5}}>
                                        <Icon name="close" color={"white"}/>
                                    </TouchableOpacity>}
                       </View>}
                     
                        
                        </View>
                    </View>
                    {
                       
                        Props.MessageToadmin.replay!==null && Props.MessageToadmin.replay!==undefined  && <View style={{width:width*0.30,backgroundColor:"gray",alignItems:"flex-end",padding:5,alignSelf:"flex-end",borderRadius:5,margin:5,borderStyle:"dashed",borderWidth:1,borderColor:"gray"}}>
                            <Text style={{fontWeight:"bold",color:"white",fontFamily:Strings.fontFamilyLight}}>پاسخ :</Text>
                            <Text style={{color:"white"}}>{Props.MessageToadmin.replay}</Text>
                        </View>}
                        
                </View>}
                {/* ) */}
                {/* })} */}
            </View>

    )} 
    
export default UserChat