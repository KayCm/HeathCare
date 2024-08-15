import {combineReducers} from "redux";
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../features/auth'

const persistConfig = {
  key:'root',
  storage,
  // blacklist:['authReducer']
};

const rootReducer = combineReducers({authReducer});

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
  reducer:persistedReducer,
});

export const persistor = persistStore(store)
