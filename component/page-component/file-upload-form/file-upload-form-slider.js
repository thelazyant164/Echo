import { createSlice } from '@reduxjs/toolkit';

export const fileUploadFormSlice = createSlice({
  name: 'formState',
  initialState: {
    value: {
      activeDirectory: '',
      files: [],
      isVisible: false,
    },
  },
  reducers: {
    updateActiveDirectory: (state, action) => {
      state.value.activeDirectory = action.payload;
    },
    updateFiles: (state, action) => {
      state.value.files.push(action.payload);
    },
    showModal: (state) => {
      state.value.isVisible = true;
    },
    hideModal: (state) => {
      state.value.isVisible = false;
    },
  },
});

export const filestate = (state) => state.form.value;
export const {
  updateActiveDirectory, updateFiles, showModal, hideModal,
} = fileUploadFormSlice.actions;

export default fileUploadFormSlice.reducer;
