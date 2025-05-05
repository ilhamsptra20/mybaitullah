import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving to AsyncStorage", error);
    }
};

export const getItem = async (key) => {
    try {
        const item = await AsyncStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error("Error reading from AsyncStorage", error);
        return null;
    }
};

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing item from AsyncStorage", error);
    }
};

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error("Error clearing AsyncStorage", error);
    }
};
