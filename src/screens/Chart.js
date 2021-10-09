  
import React, { useEffect, useState } from 'react'
import { BarChart, Grid,PieChart,XAxis,YAxis,StackedBarChart} from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { View ,Dimensions, TouchableOpacity, ScrollView} from 'react-native';
import { fromPairs } from 'lodash';
import * as scale from 'd3-scale';
import TextView from '../../src/screens/Text'
import { Circle, G, Line,Text } from 'react-native-svg'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Strings } from '../constant/String';

const {width,height}=Dimensions.get("window")
const fill = 'rgb(134, 65, 244)'
const data = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]

const ChartView = (Props) => { 
// console.warn("@@@@@@@@@@@@@@@@",Props.CircleChartData)
        // const Labels = ({ slices, height, width }) => {
        //     return slices.map((slice, index) => {
        //         const { labelCentroid, pieCentroid, data } = slice;
        //         return (
        //             <View>
        //             <Text
        //                 key={index}
        //                 x={pieCentroid[ 0 ]}
        //                 y={pieCentroid[ 1 ]}
        //                 fill={'red'}
        //                 textAnchor={'middle'}
        //                 alignmentBaseline={'middle'}
        //                 fontSize={18}
        //                 stroke={'black'}
        //                 strokeWidth={0.2}
                        
        //             >
        //                 {data.amount} 
        //                 {console.warn("ddddddddd",data.amount)}
        //             </Text>
                 
        //             </View>
        //         )
        //     })
        // }
        const CUT_OFF = 20
        const Label = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={ index }
                    x={ x(index) + (bandwidth / 2) }
                    y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
                    fontSize={ 14 }
                    fill={ value >= CUT_OFF ? 'black' : 'black' }
                    alignmentBaseline={ 'middle' }
                    textAnchor={ 'middle' }
                
                  
                >
                    {value+"%"}
                </Text>
            ))
        )

       

        const circleModeData=Props.CircleChartData
        return (
            <ScrollView style={{width:width/2,alignSelf:"center",backgroundColor:"white",padding:10,borderRadius:5,backgroundColor:"white"}}>
                <TouchableOpacity onPress={()=>Props.hideChart()} style={{backgroundColor:"red",borderRadius:20,width:20,height:20,alignItems:"center",justifyContent:"center",marginBottom:10}}>
                    <Icon name="close" color="white"/>
                </TouchableOpacity> 
                <TextView item={ "سوال"+":"+""+Props.Message} style={{alignSelf:"flex-end",fontFamily:Strings.fontFamilyBlack}}/>
                {/* {console.warn("props barchart",Props.chartItems,Props.AllOptions)} */}
              <View style={{ height:160, paddingVertical: 16}}>       
                        <BarChart
                            style={{ flex: 1 }}
                            data={Props.chartItems}
                            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                            contentInset={{ top: 10, bottom: 10 }}
                            spacing={0.2}
                            gridMin={0}
                        > 
                           <Label/>
                            <Grid direction={Grid.Direction.HORIZONTAL}/> 
 
                        </BarChart> 
                         <XAxis
                                style={{ marginTop: 10 , height: 30  }}
                                data={ Props.AllOptions }
                                scale={scale.scaleBand}
                                formatLabel={ (value, index) =>index+1}
                                svg={ { fontSize:15, fill: 'grey' }}
                            />
                 </View>   
                 <View style={{flexDirection:"row-reverse",justifyContent:"space-around"}}>
                 {Props.CircleChartData.map((item,index)=>{
                    //  let filldata=JSON.parse(item.svg)
                    //  console.warn("iems in circle",item)
                     return(
                         <View >
                             <TextView  item={item.option} style={{fontSize:width*0.020}}/>
                             <View style={{width:50,height:10,backgroundColor:item.svg.fill}}></View>
                             <TextView item={item.amount+"%"} style={{alignSelf:"center"}}/>
                         </View>
                     )
                 })}   
                 </View>     
                 <PieChart
                style={{ height:130 }}
                valueAccessor={({ item }) =>item.amount}
                data={Props.CircleChartData}
                spacing={10}
                outerRadius={'70%'}
                contentInset={20}
            >
              
            </PieChart>
            </ScrollView>
           
        )
    }



export default ChartView