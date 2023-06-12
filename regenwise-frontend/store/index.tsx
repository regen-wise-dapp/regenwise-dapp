'use client';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@slices/userSlice';
import authenticationSlice from '@slices/authenticationSlice';
import gameModalSlice from '@slices/gameModalSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    authentication: authenticationSlice,
    gameModalSlice: gameModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

