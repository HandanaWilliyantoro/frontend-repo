"use client"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserAPI } from '../../apis/userApi';

import {User} from '../../entities/user'

interface UserState {
  data: User;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  data: null,
  status: 'idle',
  error: null
};

export const fetchUser = createAsyncThunk('user/fetch', async () => {
  const response = await UserAPI.fetchUser();
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user data';
      });
  }
});

export default userSlice.reducer;
