import Login from '../screens/Login';

const React = require('react');
const {Navigation} = require('react-native-navigation');

import {Screens} from '../constant/String';

import {Provider, ReduxProvider } from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';
import RegisterCode from '../screens/RegisterCode';
import LessonSectionView from '../screens/LessonSectionView';
import configureStore from '../store/configureStore';
import InformationSpcificCourse from '../screens/InformationSpcificCourse';
import PublicNotification from '../screens/PublicNotification';
import Censure from '../screens/Censure';
import Profile from '../screens/Profile';
import MediaPlayer from '../screens/MediaPlayer';
import VideoWeb from "../screens/VideoWeb";
import ChatView from '../screens/ChatView'
import MiddlePageForMessage from '../screens/MidlePageForMessage'
import NormalVideo from '../screens/NormalVideo'
import StartExam from '../screens/StartExam'
import Exam from '../screens/Exam'
import PublicExam from '../screens/PublicExam'
import ExamResult from '../screens/ExamResult'
import DedicatedExam from '../screens/DedicatedExam'
import ReportCard from '../screens/ReportCard'
// import InformationSpcificCourse from '../screens/InformationSpcificCourse'

const ScreensR ={};
ScreensR[Screens.SplashScreen] = SplashScreen;
ScreensR[Screens.Home] = Home;
ScreensR[Screens.Login] = Login;
ScreensR[Screens.RegisterCode] = RegisterCode;
ScreensR[Screens.lessonSection] = LessonSectionView;
ScreensR[Screens.InfoCourse] = InformationSpcificCourse;
ScreensR[Screens.PublicNotification] = PublicNotification;
ScreensR[Screens.Censure] = Censure;
ScreensR[Screens.Profile] = Profile;
ScreensR[Screens.VideoPlayer] = MediaPlayer;
ScreensR[Screens.VideoWeb] = VideoWeb;
ScreensR[Screens.ChatVeiw] = ChatView;
ScreensR[Screens.MiddlePageForMessage]= MiddlePageForMessage;
ScreensR[Screens.NormalVideo]= NormalVideo;
ScreensR[Screens.StartExam]=StartExam
ScreensR[Screens.Exam]=Exam
ScreensR[Screens.ExamResult]=ExamResult
ScreensR[Screens.PublicExam]=PublicExam
ScreensR[Screens.DedicatedExam]=DedicatedExam
ScreensR[Screens.ReportCard]=ReportCard

const {store}= configureStore();



function registerScreens() {

    Object.keys(ScreensR).forEach(function(key) {
        Navigation.registerComponentWithRedux(key,
            () =>ScreensR[key],
            Provider, store);
    });
}

module.exports = {
    registerScreens,
};
