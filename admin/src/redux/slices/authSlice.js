import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  isAuthenticated: false,
  loading: false,
  success: false,
  error: null,
  token: null, 
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload.error;
    },
    logoutRequest: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.isAuthenticated = false;
      state.token = null; 
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload.error;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logoutRequest, logoutSuccess, logoutFailure } = authSlice.actions;

export default authSlice.reducer;
