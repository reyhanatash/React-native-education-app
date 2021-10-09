import {push} from '../screens/MyNavigation/MyNavigation';
import {Screens, Strings} from './String';

export const homeItemList=[
    {
        title:'اطلاعیه ها',
        subTitle:'',
        screenNavigationName:'',
        icon:'flag',
        colorBackIcon:'#1AB399',
        colorIcon:'white',
        screen:Screens.PublicNotification
    },
    {
        title:'درس های من',
        subTitle:'',
        screenNavigationName:'',
        icon:'book',
        colorBackIcon :'#3366E6',
        colorIcon:'white',
        screen:Screens.lessonSection

    },
    {
        title:'انتقادات و پیشنهادات',
        subTitle:'',
        screenNavigationName:'',
        icon:'bullhorn',
        colorBackIcon :'#B50014',
        colorIcon:'white',
        screen:Screens.Censure

    }
];
export const tabsData=[

    {
        id: 3,
        name:Strings.picture
    },
    {
        id:2,
        name:Strings.address
    },

    {
        id: 1,
        name:Strings.personal
    },
];
export const sexList=[
    {
        id:1,
        name:'زن'
    },
    {
        id:2,
        name:'مرد'
    },
];
    export const qualityList=[
        {
            id:1,
            name:'360'
        },
        {
            id:2,
            name:'480'
        },
        {
            id:3,
            name:'720'
        },
        
        {
            id:4,
            name:'1080'
        },
    ];

    export  const courseList=[

        {
            id:1,
            name:'اطلاعیه ها'
        },
        {
            id:2,
            name:'محتوا کلاس'
        },
    ]
