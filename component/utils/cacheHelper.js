import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCached = async (value) => {
  try {
    await AsyncStorage.setItem('@recentFeatures', JSON.stringify(value));
  } catch (err) {
    console.log('Error while saving cache', err);
  }
};
export const getCached = async () => {
  try {
    const stringifiedValue = await AsyncStorage.getItem('@recentFeatures');
    console.log(stringifiedValue);
    const value = JSON.parse(stringifiedValue);
    if (value !== null) {
      return value;
    }
  } catch (err) {
    console.log('Error while reading cache', err);
  }
};
export const cachePermission = async (value) => {
  try {
    await AsyncStorage.setItem('@readWriteURI', JSON.stringify(value));
  } catch (err) {
    console.log('Error while saving cache', err);
  }
};
export const getCachedPermission = async () => {
  try {
    const stringifiedValue = await AsyncStorage.getItem('@readWriteURI');
    const value = JSON.parse(stringifiedValue);
    if (value !== null) {
      return value;
    }
  } catch (err) {
    console.log('Error while reading cache', err);
  }
};
