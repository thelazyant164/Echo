import { createSlice } from '@reduxjs/toolkit';

export const fileSlice = createSlice({
  name: 'fileState',
  initialState: {
    value: {
      activeDirectory: '',
      files: [],
      albums: [],
      album: '',
      isVisible: false,
      audio: null,
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
    updateAlbums: (state, action) => {
      state.value.albums = action.payload;
    },
    updateAlbum: (state, action) => {
      state.value.album = action.payload;
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
    updateAudio: (state, action) => {
      state.value.audio = action.payload;
    },
  },
});

export const filestate = (state) => state.files.value;
export const {
  updateActiveDirectory,
  updateFiles,
  updateFolders,
  showModal,
  hideModal,
  updateAudio,
  updateAlbum,
  updateAlbums,
  updateAsset,
} = fileSlice.actions;

export default fileSlice.reducer;
