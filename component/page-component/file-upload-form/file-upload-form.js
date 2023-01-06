import {
  React, useState, useEffect, useContext,
} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import GDrive from 'expo-google-drive-api-wrapper';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import ListallFiles from '../list-all-files';
import { useCachedReadWritePermission } from '../../hooks';
import { Accesstoken } from '../../state/AccessTokencontext';
import LoadingEffect from '../loading-effect';
import { Configuration } from '../../../configuration/configuration';
import PlayAudioPage from '../../audio-play';

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
  const { service, navigation } = props;
  const DBaccesstoken = useContext(Accesstoken);
  const {
    getPermissionFirstTime,
    getFileContent,
    files,
    setFiles,
    activeDirectory,
    setActiveDirectory,
    goToFolder,
  } = useCachedReadWritePermission();
  const [accesstoken, setAccesstoken] = useState('something');
  const [audiofile, setAudiofile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showFileLists, setshowFileLists] = useState(false);
  const [source, setSource] = useState('');
  const [request, Googleresponse, promptAsync] = Google.useAuthRequest({
    expoClientId: Configuration.appKey.expoClientId,
    androidClientId: Configuration.appKey.androidClientId,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const backendapi = `${Configuration.backendAPI}/api/audios`;
  async function FetchFolderContent() {
    setFiles([]);
    await getFileContent();
  }

  const getFileCloud = () => {
    setSource('cloud');
    setVisible(true);
    axios.get(backendapi, { headers: { Authorization: `Bearer ${DBaccesstoken}` } })
      .then((response) => {
        setshowFileLists(true);
        setVisible(false);
        setFiles(response.data);
      }).catch((err) => { console.log(err); setVisible(false); });
  };
  const getFileDevice = async () => {
    setSource('device');
    await getPermissionFirstTime();
    await getFileContent();
    setshowFileLists(true);
  };
  const getFileDrive = async (res) => {
    setSource('drive');
    GDrive.init();
    if (GDrive.isInitialized) {
      GDrive.setAccessToken(res.authentication.accessToken);
      setVisible(true);
      const result = await GDrive.files.list({ q: "'root' in parents" });
      const finalresult = await result.json();
      setVisible(false);
      const audioExtensions = ['.mp3', '.wav', '.pcm', 'aiff', '.aac', '.ogg', '.wma', 'flac', 'alac'];
      finalresult.files = finalresult.files.filter((file) =>
        _.includes(audioExtensions, file.name.slice(-4), 0));
      setFiles(finalresult.files);
      console.log(`files: ${JSON.stringify(finalresult.files)}`);
      setshowFileLists(true);
    }
  };
  useEffect(() => {
    if (Googleresponse?.type === 'success') {
      setAccesstoken(Googleresponse.authentication.accessToken);
    }
  }, [accesstoken]);

  useEffect(() => {
    FetchFolderContent();
  }, [activeDirectory]);

  return (
    <View>
      { visible ? <LoadingEffect /> : <View />}
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
      <PlayAudioPage audiofile={audiofile} setAudiofile={setAudiofile} />

      <ListallFiles
        filelists={files}
        setFiles={setFiles}
        goToFolder={goToFolder}
        service={service}
        activeDirectory={activeDirectory}
        setActiveDirectory={setActiveDirectory}
        showFileLists={showFileLists}
        setshowFileLists={setshowFileLists}
        source={source}
      />
    </View>
  );
}
