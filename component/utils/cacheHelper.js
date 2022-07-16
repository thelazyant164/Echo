import AsyncStorage from '@react-native-async-storage/async-storage';

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
