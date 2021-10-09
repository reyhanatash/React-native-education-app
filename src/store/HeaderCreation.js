import {getAsyncStorage} from './AsyncStorageFunction';

export const headerCreation = async (type) => {
    const token =  await getAsyncStorage('token');
    switch (type) {
        case 1:
            return {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            };

        case 2:
            return {
                'Authorization': 'Bearer ' +token,
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            case 3:
                

    }

};
