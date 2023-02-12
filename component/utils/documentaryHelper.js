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

    const result = await listAllFilesAsync(album.id);

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

  const renameDirectory = async (directory, newnName) => {
    FileSystem.moveAsync({ from: directory, to: newnName });
  };

  return {
    getPermissionFirstTime,
    getFileContent,
    readAllFiles,
    deleteDirectory,
    renameDirectory,
    createNewFolder,
    // goToFolder,
  };
};
