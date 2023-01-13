import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { cachePermission, getCachedPermission } from './cacheHelper';

export const useDocumentReadWritePermission = () => {
  const readAllFiles = async (activeDirectory) => {
    const result = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory
      + activeDirectory);
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
      console.log(FileSystem.documentDirectory + activeDirectory);
      const newPermission = await StorageAccessFramework
        .requestDirectoryPermissionsAsync(FileSystem.documentDirectory + activeDirectory);
      await cachePermission(newPermission);
    }
  };
  return {
    getPermissionFirstTime,
    getFileContent,
    readAllFiles,
    // goToFolder,
  };
};
