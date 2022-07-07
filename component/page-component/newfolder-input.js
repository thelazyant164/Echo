import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, TextInput, View, Modal, Pressable, Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    width: 100,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    width: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    width: 150,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

export function FolderInput({ setShowModal }) {
  const [files, setFiles] = useState([]);
  // Read all files in current active directory
  const [activeDirectory, setActiveDirectory] = useState('');
  const createNewFolder = async () => {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + activeDirectory, false);
  };
  const getFileContent = async (path) => {
    const reader = await FileSystem.readDirectoryAsync(path);
    reader.forEach((file) => { setFiles(files.concat(file)); });
  };
  // Re-read content of current active directory when folder name changed
  useEffect(() => {
    setFiles([]);
    getFileContent(FileSystem.documentDirectory + activeDirectory);
  }, [activeDirectory]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TextInput
              style={styles.input}
              onChangeText={setActiveDirectory}
              value={activeDirectory}
              placeholder="Folder name"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                createNewFolder()
                  .then(setShowModal(false))
                  .catch((error) => { console.log(error); });
              }}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
