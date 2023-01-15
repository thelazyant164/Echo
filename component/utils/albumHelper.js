import * as MediaLibrary from 'expo-media-library';

export const askforPermissions = async () => {
  const permissions = await MediaLibrary.getPermissionsAsync();
  if (permissions.granted) {
    // Read the files
  }

  if (!permissions.granted && permissions.canAskAgain) {
    const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (status === 'denied' && canAskAgain) {
      // Display alert
      return 'alert';
    }
    if (status === 'granted') {
      // Do something
      return 'success';
    }
    if (status === 'denied' && !canAskAgain) {
      // Display error
      return 'error';
    }
  }
};

export const getAlbum = async (albumName) => {
  const result = await MediaLibrary.getAlbumAsync(albumName);
  return result;
};
export const createAlbumAsync = async (albumName) => {
  const album = await getAlbum('Download');
  if (album == null) {
    const result = await MediaLibrary.createAlbumAsync(albumName);
    return result;
  }
};
export const listAllFilesAsync = async (album) => {
  const result = await MediaLibrary.getAssetsAsync({
    album,
    mediaType: ['audio'],
  });
  return result;
};
export const createAssetsAsync = async (localUri) => {
  const assets = await MediaLibrary.createAssetAsync(localUri);
  return assets;
};

export const addAssettoAlbum = async (assets, album) => {
  await MediaLibrary.addAssetsToAlbumAsync(assets, album, false);
};
