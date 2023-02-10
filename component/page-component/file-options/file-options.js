import { React, useContext } from 'react';
import {
  View, Modal, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, r, Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import * as Sharing from 'expo-sharing';
import { deleteAssetsAsync } from 'expo-media-library';
import { uploadAsync } from 'expo-file-system';
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
  const { refRBSheet, location } = props;
  const accesstoken = useContext(Accesstoken);
  const dispatch = useDispatch();

  const filestate = useSelector((state) => state.files.value);
  const formstate = useSelector((state) => state.form.value);

  const DeleteFile = async () => {
    if (location === 'file') {
      deleteAssetsAsync(filestate.asset);
    } else {
      deleteAssetsAsync(formstate.asset);
    }
  };

  const UploadFile = async () => {
    if (location === 'file') {
      uploadAsync(`${Configuration.backendAPI}/api/audios`, filestate.activeDirectory, {
        fieldName: 'test', // TODO: give user option to name audio file? or take name from file system
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      })
        .then((response) => {
          refRBSheet.current.close();
          Alert.alert('Upload success!');
        })
        .catch((err) => { console.error(err); });
    } else {
      uploadAsync(`${Configuration.backendAPI}/api/audios`, formstate.activeDirectory, {
        fieldName: 'test',
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      })
        .then((response) => {
          refRBSheet.current.close();
          Alert.alert('Upload success!');
        })
        .catch((err) => { console.error(err); });
    }
  };

  const ShareFile = async () => {
    const condition = await Sharing.isAvailableAsync();
    if (condition) {
      if (location === 'file') {
        Sharing.shareAsync(filestate.activeDirectory);
      } else {
        Sharing.shareAsync(formstate.activeDirectory);
      }
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
          <Feather name="share-2" size={30} style={styles.icon} />
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
