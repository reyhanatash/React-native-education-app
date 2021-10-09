import {combineReducers} from 'redux';

import globalReducer from './GlobalReducer';
import serverErrorReducer from './serverErrorReducer';
import AthurizationReducer from './AthurizationReducer';
import UserCourseReducer from './UserCourseREducer';
import ProfileReducer from './ProfileReducer';
import LiveStream from './LiveStreamReducer';
import ChatConnection from './ChatReducer'
import MessageToAdminReducer from './MessageToAdminReducer';
import ConnectionHubReducer from './ConnectionHubReducer'
import BroadcastMessage from './BroadCastMessage'
import DeleteMessage from './DeleteMessage'
import ReplayMessage from './ReplayMessageReducer'
import MessageToUser from './MessageToUser'
import GetTest from './GetTestFromAdminReducer'
import TestAnswer from './TestAnswerReducer'
import   AnswerQuestionReducer from  './AnswerQuestionReducer'
import GlobalAnnoncement from './GlobalAnnouncement'
import RefreshPageReducer from './RefreshPageReducer'
import LiveTypeReducer from './LiveTypeReducer'
import SchoolIDReducer from './SchoolIDReducer'
import CourseId from './CorseIDReducer'


export default combineReducers({
    globalReducer,
    serverErrorReducer:serverErrorReducer,
    athuReducer:AthurizationReducer,
    userCourseRed:UserCourseReducer,
    profileRed:ProfileReducer,
    liveStream:LiveStream,
    ChatConnection:ChatConnection,
    MessageToAdminReducer:MessageToAdminReducer,
    ConnectionHubReducer:ConnectionHubReducer,
    BroadcastMessage:BroadcastMessage,
    DeleteMessage:DeleteMessage,
    ReplayMessage:ReplayMessage,
    MessageToUser:MessageToUser,
    GetTest:GetTest,
    TestAnswer:TestAnswer,
    AnswerQuestionReducer:AnswerQuestionReducer,
    GlobalAnnoncement:GlobalAnnoncement,
    RefreshPageReducer:RefreshPageReducer,
    LiveTypeReducer:LiveTypeReducer,
    SchoolIDReducer:SchoolIDReducer,
    CourseId:CourseId
})
