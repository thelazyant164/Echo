import { React, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Featurebutton } from './page-component/feature-button';
import { Header } from './page-component/header';
import { FolderInput } from './page-component/newfolder-input';
import { useCachedReadWritePermission } from './hooks/index';

const style = StyleSheet.create({
  feature_container: {
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    backgroundColor: '#F8F5F5',
    borderRadius: 12,
    justifyContent: 'center',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addbutton: {
    backgroundColor: '#D9D5D5',
    width: 50,
    height: 50,
    borderRadius: 30,
    position: 'absolute',
    marginTop: 600,
    marginLeft: 350,
  },
  folderbutton: {
    justifyContent: 'center',
    width: 70,
    height: 70,
    margin: 30,
  },
});

export function Files({ navigation }) {
  const {
    getPermissionFirstTime,
    getFileContent,
    activeDirectory,
    setActiveDirectory,
    files,
    setFiles,
    showModal,
    setShowModal,
    goToFolder,
  } = useCachedReadWritePermission();
  useEffect(async () => {
    await getPermissionFirstTime();
    await getFileContent();
  }, []);
  useEffect(async () => {
    setFiles([]);
    await getFileContent();
  }, [activeDirectory]);
  return (
    <View>
      <Header />
      <View style={{ marginTop: 60 }}>

        <Text style={{ textAlign: 'center', fontSize: 20 }}>Files Storage</Text>
        <View style={style.feature_container}>
          { activeDirectory
            ? <Text style={{ fontSize: 20 }}>{activeDirectory.replace('%20', ' ')}</Text>
            : <Text style={{ fontSize: 20 }}>Library</Text>}
          <View style={style.container}>
            <FlatList
              numColumns={3}
              data={files}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={style.folderbutton}
                  onPress={() => { goToFolder(item.slice(94, item.length)); }}
                >
                  <AntDesign name="folder1" size={40} />
                  <Text key={item}>{item.slice(94, item.length).replace('%20', ' ')}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <TouchableOpacity
          style={style.addbutton}
          onPress={() => setShowModal(true)}
        >
          <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 2 }}>+</Text>
        </TouchableOpacity>

        {showModal && (
          <FolderInput
            setShowModal={setShowModal}
            activeDirectory={activeDirectory}
            setActiveDirectory={setActiveDirectory}
          />
        )}

      </View>
    </View>
  );
}
