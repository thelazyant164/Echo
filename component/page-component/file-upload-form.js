import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Google from 'expo-google-app-auth';
import GDrive from 'expo-google-drive-api-wrapper';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginTop: 80,
    backgroundColor: '#D9D9D9',
    width: 287,
    height: 331,
    marginLeft: 60,

  },
  title: {
    textAlign: 'center',
    color: '#757575',
    marginTop: 30,
  },
});

export function FileUploadForm() {
  const [accesstoken, setAccessToken] = useState('');
  const getFileDrive = () => {};
  const getFileDevice = () => {
    /*  const getFileContent = async (path) => {
    const reader = await FileSystem.readDirectoryAsync(path);
    reader.forEach((file) => { setFiles(files.concat(file)); });
  }; */
  };
  const getFileICloud = () => {
    if (GDrive.isInitialized) {
      GDrive.setAccessToken(accesstoken);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choosing your file from</Text>
      <View style={{
        display: 'flex', flexDirection: 'row', marginTop: 100, marginLeft: 40,
      }}
      >
        <TouchableOpacity style={{ marginLeft: 20, marginRight: 20 }}>
          <Entypo name="mobile" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20, marginRight: 20 }}>
          <Entypo name="google-drive" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20, marginRight: 20 }}>
          <Entypo name="icloud" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
