/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Strings} from '../constant/String';
import {Colors} from '../constant/Colors';
import {Dimensions} from '../constant/Dimensions';

class CustomConnectionSnackbar extends Component {
    constructor() {
        super();

        this.animatedValue = new Animated.Value(-70);
        this.ShowSnackBar = false;
        this.HideSnackBar = true;
        this.state = {
            SnackBarInsideMsgHolder: '',
            loadAgain: false,
        };
    }

    ShowConnectionSnackBarFunction(SnackBarInsideMsgHolder = 'Default SnackBar Message...', duration = 2000) {
        this.setState({loadAgain:false});
        if (this.ShowSnackBar === false) {
            this.setState({SnackBarInsideMsgHolder: SnackBarInsideMsgHolder});

            this.ShowSnackBar = true;

            Animated.timing
            (
                this.animatedValue,
                {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: false,
                },
            ).start(this.props.autoHide ? this.hide(duration) : null);
        }
    }

     hide = (duration) => {
         this.timerID = setTimeout(() => {
             if (this.HideSnackBar === true) {
                 this.HideSnackBar = false;

                 Animated.timing
                 (
                     this.animatedValue,
                     {
                         toValue: -70,
                         duration: 400,
                         useNativeDriver: false,
                     },
                 ).start(() => {
                     this.HideSnackBar = true;
                     this.ShowSnackBar = false;
                     clearTimeout(this.timerID);
                 });
             }
         }, duration);
     };

    SnackBarCloseFunction = () => {
        if (this.HideSnackBar === true) {
            this.HideSnackBar = false;
            clearTimeout(this.timerID);

            Animated.timing
            (
                this.animatedValue,
                {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: false,
                },
            ).start(() => {
                this.ShowSnackBar = false;
                this.HideSnackBar = true;
            });
        }
    };

    render() {
        return (

            <Animated.View style={[{transform: [{translateY: this.animatedValue}]}, styles.SnackBarContainer]}>

                <View style={{
                    height: 50, flex: 1, flexDirection: 'row-reverse',
                    alignItems: 'center', justifyContent: 'space-between',
                    paddingHorizontal: 16,
                }}>

                    <Text numberOfLines={1} style={styles.SnackBarMessage}>{this.state.SnackBarInsideMsgHolder}</Text>

                    {this.state.loadAgain === true && !this.props.autoHide ?
                        <ActivityIndicator color={'white'}/> :
                        !this.props.autoHide ?
                        <TouchableOpacity onPress={() =>{
                            this.setState({loadAgain: true});
                            const timer = setTimeout(
                                () => {
                                        this.props.retryOnPress()
                                }, 2000);
                            return () => clearTimeout(timer);
                        }}>
                            <Text numberOfLines={1} style={styles.SnackBarMessage}>{Strings.retry}</Text>
                        </TouchableOpacity>: null
                    }

                </View>

            </Animated.View>

        );
    }
}

//<Text style={styles.SnackBarUndoText} onPress={this.SnackBarCloseFunction}> UNDO </Text>

export default CustomConnectionSnackbar;


const styles = StyleSheet.create({

    SnackBarContainer:
        {
            position: 'absolute',
            backgroundColor: Colors.mainColorOne,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomStartRadius:Dimensions.buttonBorderRadius,
            borderBottomEndRadius:Dimensions.buttonBorderRadius,
            borderBottomLeftRadius:2,
            borderBottomRightRadius:2,
            left: 0,
            top: 0,
            right: 0,
            height: 70,
            zIndex:100
        },

    SnackBarMessage:
        {
            color: '#fff',
            fontSize: 18,
            fontFamily: Strings.fontFamilyLight,
            textAlign:'center',
        },

    SnackBarUndoText: {
        color: '#FFEB3B',
        fontSize: 18,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        padding: 5,

    },
});
