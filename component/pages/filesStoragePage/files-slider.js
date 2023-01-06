import { createSlice } from '@reduxjs/toolkit';

export const fileSlice = createSlice({
  name: 'fileState',
  initialState: {
    value: {
      activeDirectory: '',
      files: [],
      isVisible: false,
      folder: '',
    },
  },
  reducers: {
    updateActiveDirectory: (state, action) => {
      state.value.activeDirectory = action.payload;
    },
    updateFiles: (state, action) => {
      action.payload.forEAch((item) => {
        state.value.files.push(item);
      });
    },
    updateFolders: (state, action) => {
      state.value.folder = action.payload;
    },
    showModal: (state) => {
      state.value.isVisible = true;
    },
    hideModal: (state) => {
      state.value.isVisible = false;
    },
  },
});

export const filestate = (state) => state.files.value;
export const {
  updateActiveDirectory, updateFiles, showModal, hideModal,
} = fileSlice.actions;

export default fileSlice.reducer;
