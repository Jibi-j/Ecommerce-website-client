// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: JSON.parse(localStorage.getItem("userInfo")) || null,
  token: JSON.parse(localStorage.getItem("userInfo"))?.token || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state, action) {
      state.userData = action.payload;
      state.token = action.payload.token;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); 
    },
    logout(state) {
      state.userData = null;
      state.token = null;
      localStorage.removeItem("userInfo"); 
    },
  },
});



export const { saveUser, logout } = userSlice.actions;
export default userSlice.reducer;
