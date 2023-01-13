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
      state.value.files = action.payload;
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
  updateActiveDirectory, updateFiles, updateFolders, showModal, hideModal,
} = fileSlice.actions;

export default fileSlice.reducer;