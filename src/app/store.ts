import { configureStore } from '@reduxjs/toolkit';
import showsReducer from '../components/showsSlice.ts';

export const store = configureStore({
  reducer: {
    shows: showsReducer
  }
});