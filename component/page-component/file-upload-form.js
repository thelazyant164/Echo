import {
  React, useState, useEffect, useContext,
} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import Entypo from 'react-native-vector-icons/Entypo';
import GDrive from 'expo-google-drive-api-wrapper';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as FileSystem from 'expo-file-system';
import ListallFiles from './listallfiles';
import { useCachedReadWritePermission } from '../hooks';
import { Accesstoken } from '../state/AccessTokencontext';
import PlayAudioPage from '../audioplay';
import axiosInstance from '../service/axios';

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
  const DBaccesstoken = useContext(Accesstoken);
  const {
    getPermissionFirstTime,
    getFileContent,
    files,
    setFiles,
    activeDirectory,
    goToFolder,
  } = useCachedReadWritePermission();
  const [accesstoken, setAccesstoken] = useState('something');
  const [audiofile, setAudiofile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [request, Googleresponse, promptAsync] = Google.useAuthRequest({
    expoClientId: '407037809807-d11u5dn0pvfm4ar2bi88ev0gc1qd6deg.apps.googleusercontent.com',
    androidClientId: '407037809807-97hgildkbh4b5qgbcca1qrqugnsnb5ff.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const backendapi = 'api/audios';
  useEffect(() => {
    if (Googleresponse?.type === 'success') {
      setAccesstoken(Googleresponse.authentication.accessToken);
    }
  }, [accesstoken]);

  const getFileCloud = () => {
    setVisible(true);
    axiosInstance.get(backendapi, { headers: { Authorization: `Bearer ${DBaccesstoken}` } })
      .then((response) => {
        setVisible(false);
        setFiles(response.data);
        console.log(response.data);
      }).catch((err) => { console.log(err); setVisible(false); });
  };
  const getFileDevice = async () => {
    await getPermissionFirstTime();
    await getFileContent();
  };
  const getFileDrive = async (res) => {
    GDrive.init();
    if (GDrive.isInitialized) {
      GDrive.setAccessToken(res.authentication.accessToken);
      const result = await GDrive.files.list({ q: "'root' in parents" });
      const finalresult = await result.json();
      const audioExtensions = ['.mp3', '.wav', '.pcm', 'aiff', '.aac', '.ogg', '.wma', 'flac', 'alac'];
      finalresult.files = finalresult.files.filter((file) =>
        _.includes(audioExtensions, file.name.slice(-4), 0));
      setFiles(finalresult);
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
          <TouchableOpacity onPress={getFileCloud} style={{ marginLeft: 20, marginRight: 20 }}>
            <Entypo name="icloud" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      {audiofile
        ? <PlayAudioPage audiofile={audiofile} />
        : <ListallFiles filelists={files} setFiles={setFiles} goToFolder={goToFolder} />}
    </View>
  );
}
