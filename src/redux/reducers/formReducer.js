import {createSlice} from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'activeForm',
  initialState: {
    formId: -1,
    formTitle: '',
  },
  reducers: {
    updateActiveForm(state, action) {
      const {formId, formTitle} = action.payload;
      state.formId = formId;
      state.formTitle = formTitle;
    },
  },
});

export const {updateActiveForm} = formSlice.actions;
export default formSlice.reducer;
