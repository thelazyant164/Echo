import { React, useContext } from 'react';
import {
  View, Modal, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, r,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import * as Sharing from 'expo-sharing';
import { Configuration } from '../../../configuration/configuration';
import { updateFiles } from '../file-upload-form/file-upload-form-slider';
import { Accesstoken } from '../../state/AccessTokencontext';

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
  const { refRBSheet } = props;
  const accesstoken = useContext(Accesstoken);
  const dispatch = useDispatch();

  const formstate = useSelector((state) => state.files.value);

  const DeleteFile = async () => {

  };

  const UploadFile = async () => {
    axios.push(Configuration.backendAPI`/api/audios}`, { headers: { Authorization: `Bearer ${accesstoken}` } })
      .then((response) => {

      })
      .catch((err) => { console.log(err); });
  };

  const ShareFile = async () => {
    const condition = await Sharing.isAvailableAsync();
    if (condition) {
      Sharing.shareAsync(FileSystem.documentDirectory + formstate.folder);
    }
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
          <Text style={styles.text}> Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ShareFile} style={styles.button}>
          <Feather name="Share" size={30} style={styles.icon} />
          <Text style={styles.text}> Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { refRBSheet.current.close(); }} style={styles.button}>
          <Feather name="x" size={30} style={styles.icon} />
          <Text style={styles.text}> Cancel </Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
}
