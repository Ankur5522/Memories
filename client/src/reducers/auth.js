import { createSlice } from "@reduxjs/toolkit";
import { auth, signup, signin } from "../actions/auth";

const initialState = {
  user: {},
  token: null,
  error: null,
  loading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('profile');
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state) => {
        state.loading = true;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
        localStorage.setItem("profile", JSON.stringify(action.payload));
      })
      .addCase(auth.rejected, (state, action) => {
        state.user = {};
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
        localStorage.setItem("profile", JSON.stringify(action.payload));
      })
      .addCase(signup.rejected, (state, action) => {
        state.user = {};
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        if(action.payload) {
          state.user = action.payload.userData;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.error = null;
          state.loading = false;
          localStorage.setItem("profile", JSON.stringify(action.payload));
        }
      })
      .addCase(signin.rejected, (state, action) => {
        state.user = {};
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
