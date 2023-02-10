import { createSlice } from '@reduxjs/toolkit';

export const fileUploadFormSlice = createSlice({
  name: 'formState',
  initialState: {
    value: {
      activeDirectory: '',
      files: [],
      albums: [],
      album: '',
      isVisible: false,
      isFilesListVisible: false,
      folder: '',
      audioFile: null,
      asset: null,
    },
  },
  reducers: {
    updateAsset: (state, action) => {
      state.value.asset = action.payload;
    },
    updateActiveDirectory: (state, action) => {
      state.value.activeDirectory = action.payload;
    },
    updateFiles: (state, action) => {
      state.value.files = action.payload;
    },
    updateAlbums: (state, action) => {
      state.value.albums = action.payload;
    },
    updateAlbum: (state, action) => {
      state.value.album = action.payload;
    },
    updateFolder: (state, action) => {
      state.value.folder = action.payload;
    },
    updateAudioFile: (state, action) => {
      state.value.audioFile = action.payload;
    },
    showLoading: (state) => {
      state.value.isVisible = true;
    },
    hideLoading: (state) => {
      state.value.isVisible = false;
    },
    showFilesList: (state) => {
      state.value.isFilesListVisible = true;
    },
    hideFilesList: (state) => {
      state.value.isFilesListVisible = false;
    },
  },
});

export const filestate = (state) => state.form.value;
export const {
  updateActiveDirectory,
  updateFiles,
  updateFolder,
  updateAudioFile,
  updateAlbum,
  updateAlbums,
  updateAsset,
  showFilesList,
  hideFilesList,
  showLoading,
  hideLoading,
} = fileUploadFormSlice.actions;

export default fileUploadFormSlice.reducer;
