import VideoWeb from "../screens/VideoWeb";


export const Screens = {
    SplashScreen: 'SplashScreen',
    Home: 'Home',
    Login: 'login',
    RegisterCode: 'RegisterCode',
    lessonSection: 'lessonSection',
    InfoCourse: 'InfoCourse',
    PublicNotification: 'PublicNotification',
    Censure: 'Censure',
    Profile: 'Profile',
    VideoPlayer: 'VideoPlayer',
    VideoWeb: 'VideoWeb',
    ChatVeiw:'ChatView',
    MiddlePageForMessage:'MiddlePageForMessage'

};

export const Strings = {

    /*******global *****/
    serverError:'خطای دریافت اطلاعات',
    search_txt:'جستجو',
    exit:'خروج',
    uploadImage:'آپلود عکس',
    certificateImage:'اشتغال به تحصیل',
    nationalCardImage:'کارت ملی',
    province:'منطقه  ',
    education:' تحصیلی   ',
    noData:'  اطلاعاتی موجود نیست   ',
    editProfileDone:'تغییر اطلاعات با موفقیت انجام شد',
    video:'ویدیو',
    event:'رویداد',


    /************connection*************/
    checkConnection: 'اینترنت شما قطع میباشد لطفا بعدا تلاش کنید',
    checkLater: 'خطای سرور',
    retry: 'تلاش مجدد',
    /**********************fonts*************************/
    fontFamilyBlack:"IRANSansMobile_Medium",
    fontFamilyBold:"IRANSansMobile_Bold",
    fontFamilyLight:"IRANSans",

    /*****************login*******************/
    login:'ورود',
    changeNumber:'تغییر شماره',
    send:'ارسال ',
    name:' * نام',
    cellphone:'شماره',
    password:'رمز ورود',
    loginwelComeText:'به اپلیکیشن تاملند خوش‌آمدید',
    signupDesText:'لطفا برای ورود عضو شوید',
    ///********************//
    announcement:'اعلانات',
    CensureTitle:'انتقادات و پیشنهادات',
    Profile:'پروفایل',
    VideoPlayer:'درس آنلاین',
    edit:'ویرایش',
    noVideo:'در حال حاضر شما هیچ ویدیو ندارید',

    /************profile*********************/
    email:'ایمیل',
    address:'آدرس',
    postalCode:'کد پستی',
    phoneNumber:'شماره ثابت',
    personal:'شخصی',
    picture:'تصاویر',

    /************offline*******************/
    fileDl:'دانلود جزوه',

};


export const CollorArray= ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#67c9cc', 'rgba(8,146,29,0.88)', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

export const StaticObjects={
    'imagePlaceholdr':'https://api.famiran.com/files/course/e99888d6-2ea5-45b9-8072-37a347a1aadf.jpg',
    'imagePrefix':'https://api.famiran.com/files/'
}
