import React from 'react';
import {
  View, Modal, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import Feather from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    backgroundColor: '#E3DFDF',
    marginTop: '100%',
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'row',

  },
  innercontainer: {
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  text: {
    marginTop: 3,
    fontSize: 15,
  },
  icon: {
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
});
export default function FolderOptions(props) {
  console.log('folder options');
  const { folder, setVisible, setFiles } = props;
  const DeleteFolder = async () => {
    const folderDir = FileSystem.documentDirectory + folder;
    await FileSystem.deleteAsync(folderDir);
    const newFiles = FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    setFiles(newFiles);
    setVisible(false);
  };
  const RenameFile = () => {

  };
  return (

    <View style={styles.container} animationType="slide" animationDuration={2000}>
      <TouchableOpacity onPress={RenameFile} style={styles.button}>
        <Feather name="edit" size={30} style={styles.icon} />
        <Text style={styles.text}> Rename</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={DeleteFolder} style={styles.button}>
        <Feather name="trash-2" size={30} style={styles.icon} />
        <Text style={styles.text}> Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { setVisible(false); }} style={styles.button}>
        <Feather name="x" size={30} style={styles.icon} />
        <Text style={styles.text}> Cancel </Text>
      </TouchableOpacity>
    </View>

  );
}
