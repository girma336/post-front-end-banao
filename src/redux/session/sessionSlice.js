// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const user = JSON.parse(localStorage.getItem('currentUser'))

const BASE_URL = 'https://post-api-ihon.onrender.com/api/v1/users';
const initialState = {
  user: user ? user : null,
  token: null,
  error: null,
  loading: false,
  successMessage: null, // Add successMessage field
};

export const signup = createAsyncThunk('auth/signup', async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const login = createAsyncThunk('auth/login', async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const forgot = createAsyncThunk('auth/forgot', async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgetPassword`, userData);
    localStorage.setItem('resetToken', response.data.resetToken);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const reset = createAsyncThunk('auth/reset', async (userData) => {
  try {
    const password = userData.password
    const response = await axios.post(`${BASE_URL}/resetPassword/${userData.resetId}`, {password});
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => { // Add reducer to clear success message
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        // state.token = action.payload.token;
        state.error = null;
        state.successMessage = 'Registration successful!'; // Set success message
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.successMessage = 'User Login successful!';
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(forgot.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgot.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.error = null;
        state.successMessage = 'Forgot sent successful!'; // Set success message
      })
      .addCase(forgot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(reset.pending, (state) => {
        state.loading = true;
      })
      .addCase(reset.fulfilled, (state, action) => {
        state.loading = false;
        // state.token = action.payload;
        state.successMessage = 'Password reset successful!';
        state.error = null;
      })
      .addCase(reset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError, clearSuccessMessage } = authSlice.actions;

export default authSlice.reducer;