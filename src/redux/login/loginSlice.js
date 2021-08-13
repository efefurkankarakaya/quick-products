import {createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    logIn(state, action) {
      console.log(state);
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const {logIn} = loginSlice.actions;
export default loginSlice.reducer;
