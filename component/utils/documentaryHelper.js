import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { cachePermission, getCachedPermission } from './cacheHelper';
import { listAllFilesAsync, getAlbum } from './albumHelper';

export const useDocumentReadWritePermission = () => {
  const readAllFiles = async (activeDirectory) => {
    if (!activeDirectory) {
      const result = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory
      + activeDirectory);
      return result;
    }
    const album = await getAlbum(activeDirectory);
    console.log('Album read:', album);
    const result = await listAllFilesAsync(album.id);
    console.log('Asset read:', result);
    return result;
  };
  // const readAllFiles = async (activeDirectory) => {
  //   let uri;
  //   if (activeDirectory !== '') {
  //     const permission = await StorageAccessFramework
  //       .requestDirectoryPermissionsAsync(FileSystem.documentDirectory + activeDirectory);
  //     uri = permission.directoryUri;
  //     // Check if cached permission for active directory yet
  //     // If already, retrieve from cache & access
  //     // If not, run above
  //   } else {
  //     const permission = await getCachedPermission();
  //     uri = permission.directoryUri;
  //   }
  //   // Gets all files inside of selected directory
  // eslint-disable-next-line max-len
  //   const localfile = await StorageAccessFramework.readDirectoryAsync(FileSystem.documentDirectory
  //     + activeDirectory);
  //   return localfile;
  // };

  const getFileContent = (activeDirectory) => readAllFiles(activeDirectory);
  // const goToFolder = (path) => {
  //   setActiveDirectory(path);
  // };
  // const gotoRoot = () => {
  //   setActiveDirectory('');
  // };
  const getPermissionFirstTime = async (activeDirectory) => {
    const permission = await getCachedPermission();
    if (!permission) {
      // Manually get permision on first app launch
      const newPermission = await StorageAccessFramework
        .requestDirectoryPermissionsAsync(FileSystem.documentDirectory + activeDirectory);
      await cachePermission(newPermission);
    }
  };
  const createNewFolder = async (newDirectory) => {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}/${newDirectory}`,
      { intermediates: true },
    );
  };

  const deleteDirectory = async (directory) => {
    await FileSystem.deleteAsync(directory);
  };

  return {
    getPermissionFirstTime,
    getFileContent,
    readAllFiles,
    deleteDirectory,
    createNewFolder,
    // goToFolder,
  };
};
