import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { updateAlbum, updateActiveDirectory } from '../../pages/filesStoragePage/files-slider';
import { updateAlbum as FormUpdateAlbum, updateActiveDirectory as FormUpdateActiveDirectory } from '../file-upload-form/file-upload-form-slider';

const style = StyleSheet.create({
  container: {
    margin: 20,
    width: '20%',
    height: '60%',
  },
  content: {
    margin: 4,
  },
  folderbutton: {
    justifyContent: 'center',
    width: 80,
    height: 70,
    margin: 30,
  },
});
export default function Folderbutton({ activeDirectory, setVisible, location }) {
  const dispatch = useDispatch();
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.folderbutton}
        onPress={async () => {
          if (location === 'files') {
            dispatch(updateAlbum(activeDirectory));
          } else {
            dispatch(FormUpdateAlbum(activeDirectory));
          }
        }}
        onLongPress={() => {
          setVisible.current.open();
          if (location === 'files') { dispatch(updateActiveDirectory(activeDirectory)); } else {
            dispatch(FormUpdateActiveDirectory(activeDirectory));
          }
        }}
      >
        <AntDesign name="folder1" size={40} />
        <Text>{activeDirectory.slice(0, 9)}</Text>
      </TouchableOpacity>
    </View>
  );
}
