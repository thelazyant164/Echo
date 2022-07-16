import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import Entypo from 'react-native-vector-icons/Entypo';
import GDrive from 'expo-google-drive-api-wrapper';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import ListallFiles from './listallfiles';

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

WebBrowser.maybeCompleteAuthSession();

export default function FileUploadForm(props) {
  const { service } = props;

  const [accesstoken, setAccesstoken] = useState('something');
  const [files, setFiles] = useState([]);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '407037809807-d11u5dn0pvfm4ar2bi88ev0gc1qd6deg.apps.googleusercontent.com',
    androidClientId: '407037809807-97hgildkbh4b5qgbcca1qrqugnsnb5ff.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setAccesstoken(response.authentication.accessToken);
    }
  }, [accesstoken]);

  const getFileDevice = () => {
    const getFileContent = async (path) => {
      const reader = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      setFiles(reader);
    };
  };
  const getFileDrive = async (res) => {
    GDrive.init();
    if (GDrive.isInitialized) {
      GDrive.setAccessToken(res.authentication.accessToken);
      const result = await GDrive.files.list({ q: "'root' in parents" });
      const finalresult = await result.json();
      console.log(finalresult);
      const audioExtensions = ['.mp3', '.wav', '.pcm', 'aiff', '.aac', '.ogg', '.wma', 'flac', 'alac'];
      finalresult.files = finalresult.files.filter((file) =>
        _.includes(audioExtensions, file.name.slice(-4), 0));
      setFiles(finalresult);
      /*
      axios.post(`/${service}`, finalresult, {
        headers: {
          'Content-Type': finalresult.type,
        },
      }).then((respon) => { console.log(respon); })
        .catch((err) => { console.log(err); }); */
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Choosing your file from</Text>
        <View style={{
          display: 'flex', flexDirection: 'row', marginTop: 100, marginLeft: 40,
        }}
        >
          <TouchableOpacity
            style={{ marginLeft: 20, marginRight: 20 }}
            onPress={getFileDevice}
          >
            <Entypo name="mobile" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 20, marginRight: 20 }}
            onPress={async () => {
              promptAsync().then((res) => {
                getFileDrive(res);
              });
            }}
          >
            <Entypo name="google-drive" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 20, marginRight: 20 }}>
            <Entypo name="icloud" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <ListallFiles filelists={files} />
    </View>
  );
}
