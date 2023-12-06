import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH,REHYDRATE,PERSIST,PURGE,REGISTER, PAUSE} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { userSlice } from "./Auth/UserSlice.jsx"
import { adminSlice } from "./Auth/AdminSlice.jsx";
const persistConfig = { key:'user',storage,version:1};
const adminPersistConfig = { key: 'admin', storage, version: 1 };

const userPersistReducer = persistReducer(persistConfig,userSlice.reducer);
const adminPersistReducer = persistReducer(adminPersistConfig, adminSlice.reducer);


export const Store = configureStore({
    reducer: {
        user: userPersistReducer,
        admin: adminPersistReducer,
    },
    middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
});


export const persistor = persistStore(Store);