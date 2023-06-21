import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from './userSlice';
import roomSlice from './roomSlice';
import { userApi } from '@/api/user/userApi';

// Mock storage for server-side rendering
const dummyStorage = {
    getItem: async () => null,
    setItem: async () => { },
    removeItem: async () => { },
};

const persistConfig = {
    key: 'root',
    // Use a fallback storage if running on server
    storage: typeof globalThis !== 'undefined' ? storage : dummyStorage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        room: roomSlice,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

setupListeners(store.dispatch);
