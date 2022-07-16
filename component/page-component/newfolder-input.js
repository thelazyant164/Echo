import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, TextInput, View, Modal, Pressable, Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';

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
    marginTop: 5,
    marginBottom: 5,
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

export function FolderInput({ setShowModal, activeDirectory, setActiveDirectory }) {
  const [newDirectory, setNewDirectory] = useState('New folder');
  // Create new folder in current active directory
  const createNewFolder = async () => {
    // Requests permissions for external directory
    const permissions = await StorageAccessFramework
      .requestDirectoryPermissionsAsync(FileSystem.documentDirectory);

    if (permissions.granted) {
      // Gets SAF URI from response
      const uri = permissions.directoryUri;
      const message = await StorageAccessFramework.makeDirectoryAsync(
        uri,
        activeDirectory,
      );
      return message;
    }
    return '';
  };

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
            <Text style={styles.modalText}>Create new folder</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNewDirectory}
              value={newDirectory}
              placeholder="Folder name"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                createNewFolder()
                  .then(setActiveDirectory(newDirectory))
                  .then(setShowModal(false))
                  .catch(({ message }) => { console.log(message); });
              }}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
