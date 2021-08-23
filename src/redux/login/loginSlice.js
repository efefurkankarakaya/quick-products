import {createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    logIn(state, action) {
      const {isLoggedIn} = action.payload;
      state.isLoggedIn = isLoggedIn;
    },
  },
});

export const {logIn} = loginSlice.actions;
export default loginSlice.reducer;
