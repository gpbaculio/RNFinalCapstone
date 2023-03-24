import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {persistStore, persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';

import authentication from './authentication/reducer';
import {useAuthentication} from './hooks';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  authentication,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export type AppReducerType = ReturnType<typeof persistedReducer>;

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

const persistor = persistStore(store);

export {useAuthentication, store, persistor};
