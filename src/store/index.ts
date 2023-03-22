import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { configureStore } from "@reduxjs/toolkit";

import authentication from "./authentication/reducer";
import { useAuthentication } from "./hooks";

const reducer = combineReducers({
  authentication,
});

export type AppReducerType = ReturnType<typeof reducer>;

export const initializeStore = () =>
  configureStore({
    reducer,
  });

export { useAuthentication };
