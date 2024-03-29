import {
  React, useState, useEffect, useContext,
} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert,
} from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import { useSelector, useDispatch } from 'react-redux';
import { Asset } from 'expo-asset';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import GDrive from 'expo-google-drive-api-wrapper';
import { Accesstoken } from '../../state/AccessTokencontext';
import LoadingEffect from '../loading-effect/loading-effect';
import { Configuration } from '../../../configuration/configuration';
import { updateAudioFile } from '../file-upload-form/file-upload-form-slider';
import { updateAudio } from '../../pages/filesStoragePage/files-slider';
import { createAlbumAsync, createAssetsAsync, addAssettoAlbum } from '../../utils/albumHelper';

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
  const {
    file, source, mission, location, setVisible,
  } = props;
  const accesstoken = useContext(Accesstoken);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const ShowFileOption = () => {
    setVisible.current.open();
  };
  const GetFileFromCloud = () => {
    axios.get(Configuration.backendAPI`/api/audios/${file.id}`, { headers: { Authorization: `Bearer ${accesstoken}` } })
      .then((response) => {
        dispatch(updateAudioFile(response.data.content.buffer));
      })
      .catch((err) => { console.log(err); });
  };
  const GetFileFromDevice = async () => {
    const fileDir = `${FileSystem.documentDirectory}/${file}`;
    const result = await FileSystem.readAsStringAsync(fileDir);
    return result;
  };
  const GetFileFromDrive = async () => {
    const queryParams = { acknowledgeAbuse: true, fields: '*' };
    const result = await GDrive.files.download(
      file.id,
      file.name,
      queryParams,
    );
    return result;
  };

  const FileProcessing = async (service) => {
    setLoading(true);
    if (source === 'cloud') {
      FileSystem.downloadAsync(`${Configuration.backendAPI}/api/audio/${service}/${file.id}`, `${`${FileSystem.documentDirectory}/Download`}`, {
        headers: { Authorization: `Bearer ${accesstoken}` },
      })
        .then(async (response) => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('...');
          }
          const asset = await createAssetsAsync(response.uri);
          const album = await createAlbumAsync('Download');
          if (album !== undefined && asset !== undefined) {
            await addAssettoAlbum(asset, album);
            dispatch(updateAudioFile(response));
          }
          setLoading(false);
        })
        .catch((err) => {
          Alert.alert('Error while processing. Please try again.');
          setLoading(false);
        });
    } else if (source === 'drive') {
      const result = await GetFileFromDrive();
      const buffer = await FileSystem.readAsStringAsync(result.uri);
      FileSystem.downloadAsync(`${Configuration.backendAPI}/api/audio/${service}/${file.id}`, `${FileSystem.documentDirectory}`, {
        headers: { Authorization: `Bearer ${accesstoken}` },
      })
        .then((response) => {
          dispatch(updateAudioFile(response));
          // setVisible(true);
          setLoading(false);
        })
        .catch((err) => {
          Alert.alert('Error while processing. Please try again.');
          setLoading(false);
        });
    } else {
      const result = await GetFileFromDevice();
      const bufffer = await FileSystem.readAsStringAsync(result);

      FileSystem.downloadAsync(`${Configuration.backendAPI}/api/audio/${service}/${file.id}`, `${FileSystem.documentDirectory}`, {
        headers: { Authorization: `Bearer ${accesstoken}` },
      })
        .then((response) => {
          dispatch(updateAudioFile(response));
          // setVisible(true);
          setLoading(false);
        })
        .catch((err) => {
          Alert.alert('Error while processing. Please try again.');
          setLoading(false);
        });
    }
  };

  const Operate = () => {
    if (location === 'upload') {
      switch (mission) {
        case 'noisecancelling':
          FileProcessing('denoise');
          break;
        case 'volumeadjust':
          FileProcessing('volume');
          break;
        case 'speechtotext':
          FileProcessing('transcribe');
          break;
        case 'normalization':
          FileProcessing('normalize');
          break;
        default:
          break;
      }
    } else {
      dispatch(updateAudio(file));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={Operate}
        style={styles.content}
        onLongPress={ShowFileOption}
      >
        <FontAwesome name="file-audio-o" size={40} />
        <View>
          {location === 'file'
            ? (<Text>{file.item.filename}</Text>)
            : (<Text>{file.name}</Text>)}
        </View>
      </TouchableOpacity>
      {isLoading ? <LoadingEffect /> : <View />}
    </View>
  );
}
