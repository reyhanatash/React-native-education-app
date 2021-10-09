import { ToastAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const backgroundNotificationHandler = async (message) => {
        
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
    return Promise.resolve();
}