import AsyncStorage from '@react-native-async-storage/async-storage';

const ASYNC_STORAGE_STATE = {
  accessToken: 'accessToken',
  scoresData: 'scoresData',
};

const clearStorage = async () =>
  await AsyncStorage.multiRemove([
    ASYNC_STORAGE_STATE.accessToken,
    ASYNC_STORAGE_STATE.scoresData,
  ]);

const setAccessToken = async (accessToken: string | null) => {
  await AsyncStorage.setItem(ASYNC_STORAGE_STATE.accessToken, accessToken!);
};

const getAccessToken = async () =>
  await AsyncStorage.getItem(ASYNC_STORAGE_STATE.accessToken);

const removeAccessToken = async () =>
  await AsyncStorage.removeItem(ASYNC_STORAGE_STATE.accessToken);

const setScoresData = async (data: string) =>
  await AsyncStorage.setItem(ASYNC_STORAGE_STATE.scoresData, data);
const getScoresData = async () =>
  await AsyncStorage.getItem(ASYNC_STORAGE_STATE.scoresData);

export {
  clearStorage,
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  setScoresData,
  getScoresData,
};
