// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://post-api-ihon.onrender.com/api/v1/posts';
const initialState = {
  data: [],
  error: null,
  loading: false,
  successMessage: null, // Add successMessage field
};

export const createPost = createAsyncThunk('post/create', async (postData) => {
  try {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    };

    const response = await axios.post(`${BASE_URL}/`, postData, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getPosts = createAsyncThunk('posts/get', async () => {
  try {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    };
    const response = await axios.get(`${BASE_URL}/`, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deletePost = createAsyncThunk('post/delete', async (postId) => {
  try {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    };
    const response = await axios.delete(`${BASE_URL}/${postId}`, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const likesPost = createAsyncThunk('post/likes', async (postId) => {
  try {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    };
    const response = await axios.post(`${BASE_URL}/${postId}/likes`, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});


const postSlice = createSlice({
  name: 'post',
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
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        state.successMessage = 'Post Create successful!'; // Set success message
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        // state.successMessage = 'User Login successful!';
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.successMessage = 'Deleted successful!';
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(likesPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likesPost.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        state.successMessage = 'Liked successful!';
        state.error = null;
      })
      .addCase(likesPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError, clearSuccessMessage } = postSlice.actions;

export default postSlice.reducer;