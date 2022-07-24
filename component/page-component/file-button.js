import {
  React, useState, useEffect, useContext,
} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert,
} from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';
import { Accesstoken } from '../state/AccessTokencontext';

const styles = StyleSheet.create({
  container: {
    margin: 30,
    width: '20%',
    height: '60%',
  },
  content: {
    margin: 4,
  },
});
export default function Filebutton(props) {
  const { file, setFiles, source } = props;
  const accesstoken = useContext(Accesstoken);
  const GetFileFromCloud = () => {
    axios.get(`http://100.90.250.177:3001/api/audios/${file.id}`, { headers: { Authorization: `Bearer ${accesstoken}` } })
      .then((response) => { setFiles(''); console.log(response.data); })
      .catch((err) => { console.log(err); });
    setFiles('');
  };
  const GetFileFromDevice = () => {};
  const GetFileFromDrive = () => {};
  const GetFile = () => {
    if (source === 'drive') {
      GetFileFromDrive();
    } else if (source === 'cloud') {
      GetFileFromCloud();
    } else {
      GetFileFromDevice();
    }
  };
  const PlayFile = async () => {

  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={GetFileFromCloud} style={styles.content}>

        <FontAwesome name="file-audio-o" size={40} />

        <View>
          <Text>{`${file.name.slice(0, 6)}...`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
