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
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
  modalInput: {
    height: 20,
    margin: 15,
    borderWidth: 1,
    padding: 10,
  },
});

export function FolderInput({ setShowModal }) {
  const [files, setFiles] = useState([]);
  // Read all files in current active directory
  const getFileContent = async (path) => {
    const reader = await FileSystem.readDirectoryAsync(path);
    reader.forEach((file) => { setFiles(files.concat(file)); });
  };

  const [activeDirectory, setActiveDirectory] = useState('');

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
              style={styles.modalInput}
              onSubmitEditing={setActiveDirectory}
              value={activeDirectory}
              placeholder="Name your new export folder..."
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
