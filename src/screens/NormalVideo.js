import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {getAsyncStorage} from '../store/AsyncStorageFunction';
import ClickableIcon from '../component/ClickableIcon';
import {qualityList} from '../constant/StaticLists';
import SeekBar from '../component/SeekBar';
import {TextCss} from '../style/TextCss';
import {videoTiming} from '../store/GlobalFunction'
import { useSelector,useDispatch } from 'react-redux';
import { property, set } from 'lodash';
import { getschoolID } from '../redux/action';


const NormalVideo = Props => {
  const [qualityView, setQualityView] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quality, setQuality] = useState(480);
  const [duration, setDuration] = useState(0);
  const [isLand, setLand] = useState(false);
  const [pause, setPause] = useState(false);
  const [volume, setVolume] = useState(50);
  const [height, setheight] = useState(0);
  const [width, setWidht] = useState(0);
  const [id,setid]=useState("")
  const schoolIDdata = useSelector(state =>state.SchoolIDReducer);
  const dispatch = useDispatch();



useEffect(()=>{
  dispatch(getschoolID(Props.params.item.fldPkCourseStepCo))
    data=schoolIDdata
    if(data===-1){
    setid(1)}else{
      setid(2)
    }
},[])

  Orientation.addOrientationListener(orientation => {
    if (Orientation === 'PORTRAIT') Orientation.lockToLandscape();
  });


  useEffect(() => {
    Orientation.lockToLandscape();
    setheight(responsiveWidth(100));
    setWidht(responsiveHeight(100));
  }, [Props.params.item]);
//  console.warn("normalvideo*************************",)
  const qualityItem = (inner, item, onPress) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.item,
          {
            backgroundColor: inner ? 'rgba(13,13,13,0.5)' : 'transparent',
            borderRightColor: inner ? '#000' : 'transparent',
            borderRightWidth: inner ? 0.5 : 0,
            alignItems: 'center',
          },
        ]}>
        <Text
          style={[
            TextCss.menualText,
            {
              marginTop: 5,
              color: '#ffffff',
              textAlign: 'center',
              alignSelf: 'center',
            },
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const onLoadVideo = data => {
    setDuration(data.duration);
  };

  return (
    <View style={[styles.container]}>
      <View
        style={{
          flexDirection: 'row',
          width: responsiveHeight(100),
          position: 'absolute',
          bottom: 30,
          backgroundColor: 'transparent',
        }}>
       {pause? <ClickableIcon
          onPress={() => setPause(!pause)}
          iconName={'play'}
          style={{paddingEnd: 3}}
        />:
         <ClickableIcon
          onPress={() => setPause(!pause)}
          iconName={'pause'}
          style={{paddingEnd: 3}}
        />}
        <ClickableIcon
          onPress={() => [setShowVolume(!showVolume), setQualityView(false)]}
          iconName={'volume-off'}
        />

        {showVolume ? (
          <SeekBar
            width={width * 0.25}
            step={0.5}
            max={3}
            min={0.0}
            changeVolume={volumeRate => setVolume(volumeRate)}
          />
        ) : null}

        {qualityItem(false, {name: quality}, () => [
          setQualityView(!qualityView),
          setShowVolume(false),
        ])}
        {qualityView ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={qualityList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) =>
              qualityItem(true, item, () => [
                setQuality(item.name),
                setQualityView(!qualityView),
              ])
            }
            horizontal={true}
          />
        ) : null}

        {!qualityView && !showVolume ? (
          <View style={{flexDirection:'row', justifyContent:'center', width:width*0.75}}>
            <Text style={TextCss.menualText}>{videoTiming(currentTime)}</Text>
            <SeekBar
              current={currentTime}
              width={width * 0.55}
              step={0.1}
              max={duration}
              min={0}
              changeVolume={rate => useRef.vp.seek(rate)}
            />
            <Text style={TextCss.menualText}>{videoTiming(duration)}</Text>
          </View>
        ) : null}
      </View>
      
      <Video
        ref={vp => {
          useRef.vp = vp;
        }}
        source={{uri:`https://stream.tamland.ir/done/${Props.params.item.fldLocalStream}/${quality}_${Props.params.item.fldLocalStream}_${id}.m3u8`}}
       
        autoplay={true}
        style={[styles.fullScreen, {width: width, height: height*0.94}]}
        paused={pause}
        volume={volume}
        resizeMode={'contain'}
        // onLoad={() => setLoading(false)}
        onLoad={data => onLoadVideo(data)}
        onLoadStart={() => setLoading(false)}
        onEnd={() => console.warn('onEnd')}
        onVideoLoad={() => console.warn('onVideoLoad')}
        fullscreenOrientation={'landscape'}
        onError={null}
        onVideoBuffer={() => console.warn('onVideoBuffer')}
        onProgress={data => setCurrentTime(data.currentTime)}
      />
    </View>
  );
};
export default NormalVideo;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  fullScreen: {
    zIndex: -1,
    alignSelf: 'center',
  },
  item: {
    paddingHorizontal: responsiveWidth(3),
  },
});