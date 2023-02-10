import { React, useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Modal, TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as FileSystem from 'expo-file-system';
import { updateAudioFile } from '../../page-component/file-upload-form/file-upload-form-slider';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#000ff',
    justifyContent: 'center',
    top: '40%',
  },
  text: {
    marginTop: 30,
    fontSize: 20,
  },
  btn: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
    padding: 20,
    marginTop: 100,
  },
  box: {
    height: 100,
  },
});

export default function ShowTextFilePage() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const formstate = useSelector((state) => state.form.value);

  const readTextFile = async () => {
    const result = await FileSystem.readAsStringAsync(formstate.audioFile.uri);
    setText(result);
  };
  useEffect(() => { readTextFile(); }, []);
  if (formstate.audioFile === null) {
    return <View />;
  }

  return (
    <Modal animationType="slide">
      <TouchableOpacity
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          margin: 10,
        }}
        onPress={() => {
          dispatch(updateAudioFile(null));
        }}
      >
        <AntDesign name="arrowleft" size={30} style={{ marginLeft: 5, marginRight: 5 }} />
        <Text style={{ fontSize: 20 }}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    </Modal>
  );
}
