import React from 'react';
import {
  View, Modal, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, r,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import { uploadFiles } from 'react-native-fs';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
export default function FileOptions(props) {
  const { folder, setFiles, refRBSheet } = props;

  const DeleteFile = async () => {

  };

  const UploadFile = async () => {

  };

  const RenameFile = () => {
    refRBSheet.current.close();
  };
  return (
    <RBSheet
      ref={refRBSheet}
      animationType="fade"
      closeOnDragDown
      closeOnPressMask
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={RenameFile} style={styles.button}>
          <Feather name="edit" size={30} style={styles.icon} />
          <Text style={styles.text}> Rename</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={DeleteFile} style={styles.button}>
          <Feather name="trash-2" size={30} style={styles.icon} />
          <Text style={styles.text}> Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={UploadFile} style={styles.button}>
          <Feather name="upload" size={30} style={styles.icon} />
          <Text style={styles.text}> Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { refRBSheet.current.close(); }} style={styles.button}>
          <Feather name="x" size={30} style={styles.icon} />
          <Text style={styles.text}> Cancel </Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
}
