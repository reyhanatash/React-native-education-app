import AsyncStorage from '@react-native-community/async-storage';


export const getAsyncStorage = async (key) => {

    try {
        let storedData = await AsyncStorage.getItem(key);
        if (storedData === null) {
            return null;
        }
        return storedData;
    } catch (error) {
        console.log('Error loading from storage', error);
    }
};

export const saveAsyncStorage = (key, value) => {
    AsyncStorage.setItem(key, value);
};

export const removeAsyncStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (exception) {
        return false;
    }
};
