import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filesSlider from '../pages/filesStoragePage/files-slider';
import fileUploadFormSlider from '../page-component/file-upload-form/file-upload-form-slider';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  files: filesSlider,
  form: fileUploadFormSlider,
});
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
