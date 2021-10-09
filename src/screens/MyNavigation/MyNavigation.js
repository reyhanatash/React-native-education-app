import {Strings} from '../../constant/String';
const Navigation = require('../../navigation/Navigation');


export const goToMain = (screenName, Props) => Navigation.setRoot({

    root: {
        stack: {
            id: 'App',
            children: [
                {
                    component: {
                        id: screenName,
                        name: screenName,
                        passProps: {
                            screenTitle: Strings[screenName],
                        },
                        options: {
                            topBar: {
                                visible: false,
                                height: 0,
                            },
                        },
                    },
                },
            ],
        },
    },

});

export const goToDashboard = (screenName, Props) => Navigation.setRoot({

    root: {
        stack: {
            id: 'App',
            children: [
                {
                    component: {
                        id: screenName,
                        name: screenName,
                        passProps: {
                            screenTitle: Strings[screenName],
                            screenName: screenName,
                        },
                        options: {
                            topBar: {
                                visible: false,
                                height: 0,
                            },
                        },
                    },
                },
            ],
        },
    },

});

export const push = (Props, screenName, lastScreen,params) => {


        Navigation.push(Props.componentId, {
            component: {
                id: screenName,
                name: screenName,
                passProps: {
                    screenTitle: Strings[screenName],
                    text: 'This is an external component',
                    currentScreen: screenName,
                    previousScreen: Props.componentId,
                    params:params
                },
                options: {
                    topBar: {
                        visible: false,
                        // height: 0,
                    },
                },
            },
        });
    }
;
