import RNFS from 'react-native-fs';
import {PermissionsAndroid, Alert} from "react-native";

const RNFetchBlob = require('rn-fetch-blob').default;

export const convertImage=(image)=> {
    RNFS.readFile(image, 'base64')
        .then(res => {
            return res;
        });
}

export const actualDownload = async (fileUrl) => {
    
    const { dirs } = RNFetchBlob.fs;

    fetch(fileUrl)
            .then(async response => {
                const fileReader = new FileReader();
               fileReader.onload = async fileLoadedEvent => {
                const base64 = fileLoadedEvent.target.result;
                const filePath = `${dirs.DownloadDir}`+`Tamland_${fileUrl.substring(fileUrl.length-10)}`;
                // console.warn(base64);
                await RNFetchBlob.fs.writeFile(filePath, base64.split(',').pop(), 'base64');
                RNFetchBlob.android.actionViewIntent(filePath, 'application/pdf');
                // RNFS.writeFile(filePath, base64.split(',').pop(), 'base64')
                //     .then(() => console.warn('base64 converted to pdf and saved at ' + filePath)).catch(err=>{
                //         console.warn('error convert base64 to pdf',err)
                //     });
                
                };
                fileReader.readAsDataURL(await response.blob());
            
            })
            .catch(err=>{console.warn(err)})
//     console.warn("##################","http://stream.tamland.ir/tamland/2020/08/1400_Adabiat_TarhDars.pdf")
//     console.warn("ttttt",fileUrl.substring(fileUrl.length-10))
//     try{
//     const res = await RNFetchBlob.config({
//         fileCache: false,
//         addAndroidDownloads: {
//             useDownloadManager: true,
//             notification: true,
//             mediaScannable: true,
//             // title: `Tamland_${fileUrl.substring(fileUrl.length-10)}`,
//             // path:`${dirs.DownloadDir}Tamland_${fileUrl.substring(fileUrl.length-10)}`,
//             title: `استاد طوفان`,
//             path:`${dirs.DownloadDir}Tamland_test.pdf}`,
//         },
//     })
//         .fetch('GET',fileUrl);

//         console.warn("download res",res);
// }
//         // .then((res) => {
//         //     console.warn("wwwww",res)
//         // })
//         // .catch((e) => {
//         //     console.warn("download fail",e)
//         // });}
//         catch(ex){console.warn("ex",ex)}
}

export const downloadFile = async (path) => {
console.warn("paaaaaaaaaaaaaath",path)
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.warn("hsdfjsdfkgsdfgsdh",path)
            actualDownload(path);
        } else {
            Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
        }
    } catch (err) {
        console.warn(err);
    }
}

export const toPersianDigit = a => {
    if (a === null || a === undefined)
        return '';
    if (typeof a === 'number') {
        a = a.toString();
    }
    return a.replace(/\d+/g, function(digit) {
        const enDigitArr = [];

        const peDigitArr = [];

        for (let i = 0; i < digit.length; i++) {
            enDigitArr.push(digit.charCodeAt(i));
        }

        for (let j = 0; j < enDigitArr.length; j++) {
            peDigitArr.push(
                String.fromCharCode(enDigitArr[j] + (!!a && a === true ? 1584 : 1728))
            );
        }
        return peDigitArr.join('');
    });
};

// export const isEmptyy=(input)=>{
//     if (input === undefined || input===null  || input)
//     return true
// }
export const isEmpty = (input) => {
    if (input === undefined || input===null)
        return true
    else{
        const inputSpaceLess= input.toString().split(' ').join('');
        return inputSpaceLess.length === 0;
    }
};

export const videoTiming=(duration)=>{
    // let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration ) % 60),
    minutes = Math.floor((duration /  60) % 60),
    hours = Math.floor((duration / ( 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds ;
}