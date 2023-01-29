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
import ListallFiles from '../list-all-files/list-all-files';
import { useDocumentReadWritePermission } from '../../utils/documentaryHelper';
import { Accesstoken } from '../../state/AccessTokencontext';
import LoadingEffect from '../loading-effect/loading-effect';
import { Configuration } from '../../../configuration/configuration';
import PlayAudioPage from '../../pages/audioPlayPage/audio-play';
import {
  updateActiveDirectory, updateFiles, showLoading, hideLoading, showFilesList,
} from './file-upload-form-slider';
import ShowTextFilePage from '../../pages/showTextFile/show-text-file';

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
  } = useDocumentReadWritePermission();
  const [accesstoken, setAccesstoken] = useState('something');
  const [source, setSource] = useState('');
  const [request, Googleresponse, promptAsync] = Google.useAuthRequest({
    expoClientId: Configuration.appKey.expoClientId,
    androidClientId: Configuration.appKey.androidClientId,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const backendapi = `${Configuration.backendAPI}/api/audios`;

  const dispatch = useDispatch();

  const formstate = useSelector((state) => state.form.value);
  async function FetchFolderContent() {
    const result = await getFileContent(formstate.activeDirectory);
    let files = [];
    if (formstate.activeDirectory) {
      result.assets.forEach((file) => {
        files.push({ name: file.filename });
      });
    } else {
      files = result;
    }
    dispatch(updateFiles(files));
  }

  const getFileCloud = () => {
    setSource('cloud');
    dispatch(showLoading());
    axios.get(backendapi, { headers: { Authorization: `Bearer ${DBaccesstoken}` } })
      .then((response) => {
        dispatch(showFilesList());
        dispatch(hideLoading());
        const files = [];
        response.data.forEach((file) => {
          files.push({ name: file.name });
        });
        dispatch(updateFiles(files));
      }).catch((err) => { console.error(err); dispatch(hideLoading()); });
  };

  const getFileDevice = async () => {
    setSource('device');
    dispatch(showLoading());
    await getPermissionFirstTime();
    const result = await getFileContent(formstate.activeDirectory);
    dispatch(updateFiles(result));
    dispatch(hideLoading());
    dispatch(showFilesList());
  };

  const getFileDrive = async (res) => {
    setSource('drive');
    GDrive.init();
    if (GDrive.isInitialized) {
      GDrive.setAccessToken(res.authentication.accessToken);
      dispatch(showLoading());
      const result = await GDrive.files.list({ q: "'root' in parents" });
      const finalresult = await result.json();
      dispatch(hideLoading());
      const audioExtensions = ['.mp3', '.wav', '.pcm', 'aiff', '.aac', '.ogg', '.wma', 'flac', 'alac'];
      finalresult.files = finalresult.files.filter((file) =>
        _.includes(audioExtensions, file.name.slice(-4), 0));
      const files = [];
      finalresult.files.forEach((file) => {
        files.push({ name: file.name });
      });
      dispatch(updateFiles(files));
      dispatch(showFilesList());
    }
  };
  useEffect(() => {
    if (Googleresponse?.type === 'success') {
      setAccesstoken(Googleresponse.authentication.accessToken);
    }
  }, [accesstoken]);

  useEffect(() => {
    dispatch(hideLoading());
    console.log(formstate.activeDirectory);
    FetchFolderContent();
  }, [formstate.activeDirectory]);

  return (
    <View>
      { formstate.isVisible ? <LoadingEffect /> : <View />}
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
      {service !== 'speechtotext' ? <PlayAudioPage /> : <ShowTextFilePage />}
      <ListallFiles
        service={service}
        source={source}
      />
    </View>
  );
}
