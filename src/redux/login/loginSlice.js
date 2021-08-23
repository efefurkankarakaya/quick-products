import {createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    logIn(state, action) {
      console.log(action);
      state.isLoggedIn = action.payload;
      console.log(state);
      console.log(action.payload);
    },
  },
});

export const {logIn} = loginSlice.actions;
export default loginSlice.reducer;
