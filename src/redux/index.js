// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './session/sessionSlice';
import postReducer from './session/postSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export default store;