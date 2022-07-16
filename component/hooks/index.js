import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { cachePermission, getCachedPermission } from '../utils/cacheHelper';

export const useCachedReadWritePermission = () => {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [activeDirectory, setActiveDirectory] = useState('');

  const readAllFiles = async () => {
    let uri;
    if (activeDirectory !== '') {
      const permission = await StorageAccessFramework
        .requestDirectoryPermissionsAsync(FileSystem.documentDirectory + activeDirectory);
      uri = permission.directoryUri;
      // Check if cached permission for active directory yet
      // If already, retrieve from cache & access
      // If not, run above
    } else {
      const permission = await getCachedPermission();
      uri = permission.directoryUri;
    }
    // Gets all files inside of selected directory
    const localfile = await StorageAccessFramework.readDirectoryAsync(uri);
    setFiles(localfile);
  };
  const getFileContent = async () => {
    const permission = await getCachedPermission();
    if (permission.granted) {
      await readAllFiles();
    }
  };
  const goToFolder = (path) => {
    setActiveDirectory(path);
  };
  const getPermissionFirstTime = async () => {
    const permission = await getCachedPermission();
    if (!permission) {
      // Manually get permision on first app launch
      const newPermission = await StorageAccessFramework
        .requestDirectoryPermissionsAsync(FileSystem.documentDirectory + activeDirectory);
      await cachePermission(newPermission);
    }
  };
  return {
    getPermissionFirstTime,
    getFileContent,
    activeDirectory,
    setActiveDirectory,
    files,
    setFiles,
    showModal,
    setShowModal,
    goToFolder,
  };
};
