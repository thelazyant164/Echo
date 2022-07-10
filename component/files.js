import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Featurebutton } from './page-component/feature-button';
import { Header } from './page-component/header';
import { FolderInput } from './page-component/newfolder-input';

const style = StyleSheet.create({
  feature_container: {
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    backgroundColor: '#F8F5F5',
    borderRadius: 12,
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
});

export function Files({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [activeDirectory, setActiveDirectory] = useState('');
  const getFileContent = async (path) => {
    const reader = await FileSystem.readDirectoryAsync(path);
    reader.forEach((file) => { setFiles(files.concat(file)); });
  };
  useEffect(() => {
    setFiles([]);
    getFileContent(FileSystem.documentDirectory + activeDirectory);
  }, [activeDirectory]);

  return (
    <View>
      <Header />
      <View style={{ marginTop: 60 }}>

        <Text style={{ textAlign: 'center', fontSize: 20 }}>Files Storage</Text>

        <View style={style.feature_container}>
          <Text>Files in current directory</Text>
          <View style={style.container}>
            <FlatList
              numColumns={1}
              data={files}
              renderItem={({ item }) =>
                <Text key={item}>{item}</Text>}
            />
          </View>
        </View>

        <View style={style.feature_container}>
          <Text>Feature</Text>
          <View style={style.container}>
            <FlatList
              numColumns={4}
              data={files}
              renderItem={({ item, key }) =>
                <Featurebutton feature={item} navigation={navigation} />}
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
          setActiveDirectory={setActiveDirectory}
        />
        )}

      </View>
    </View>
  );
}
