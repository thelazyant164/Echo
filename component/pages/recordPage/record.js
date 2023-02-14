import {
  React, useState, useEffect, useContext,
} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid, Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as MediaLibrary from 'expo-media-library';
import CustomTimer from '../../page-component/timer/timer';
import { Configuration } from '../../../configuration/configuration';
import { Accesstoken } from '../../state/AccessTokencontext';
import { askforPermissions } from '../../utils/albumHelper';
import LoadingEffect from '../../page-component/loading-effect/loading-effect';

const styles = StyleSheet.create({
  buttondisable: {
    marginTop: '20%',
    borderRadius: 12,
    backgroundColor: 'gray',
    width: '40%',
    height: '10%',
  },
  buttonactive: {
    marginTop: '20%',
    borderRadius: 12,
    backgroundColor: 'rgb(37, 150, 190)',
    width: '40%',
    height: '10%',
  },
});
export function RecordPage({ navigation }) {
  const accesstoken = useContext(Accesstoken);
  const [recording, setRecording] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState('stop');

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const dispatch = useDispatch();
  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      // eslint-disable-next-line no-shadow
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      setRecording(recording);
      setState('play');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }
  async function pauseRecording() {
    await recording.pauseAsync();
    setState('pause');
  }
  async function stopRecording() {
    setIsLoading(true);
    await recording.stopAndUnloadAsync();
    setState('stop');
    const uri = recording.getURI();
    // await askforPermissions();
    await askforPermissions();
    const asset = await MediaLibrary.createAssetAsync(uri);
    const album = await MediaLibrary.getAlbumAsync('Echo recorder');
    const assets = await MediaLibrary.getAssetsAsync({ album: album.id, mediaType: ['audio', 'video', 'photo', 'unknown'] });
    const isMigrate = await MediaLibrary.albumNeedsMigrationAsync(album.id);
    if (isMigrate) {
      try {
        await MediaLibrary.migrateAlbumIfNeededAsync(album.id);
      } catch (err) {
        setIsLoading(false);
      }
      console.log('Here');
    }
    try {
      await MediaLibrary.addAssetsToAlbumAsync([asset.id], album.id);
      setIsLoading(false);
      Alert.alert('Saving success');
    } catch (err) {
      setIsLoading(false);
      Alert.alert('There was an error saving the files. Please try again');
    }
    // eslint-disable-next-line max-len
    // Asset.downloadAsync(`${Configuration.backendAPI}/api/audio/denoise`, { headers: { Authorization: `Bearer ${accesstoken}` } })
    //   .then((response) => {

    //   })
    //   .catch((err) => {
    //     Alert.alert('Error while processing. Please try again.');
    //   });
  }

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={() => {
        // eslint-disable-next-line no-unused-expressions
        switch (state) {
          case 'stop':
            startRecording();
            break;
          case 'pause':
            startRecording();
            break;
          case 'play':
            pauseRecording();
            break;
          default:
        }
      }}
      >
        { state !== 'play' ? <Feather name="play" size={50} style={{ marginTop: '70%' }} /> : <Feather name="pause" size={50} style={{ marginTop: '70%' }} />}
      </TouchableOpacity>
      <CustomTimer recording={recording} setState={setState} state={state} />
      <TouchableOpacity
        onPress={async () => {
          stopRecording();
        }}
        disabled={!recording}
        style={state !== 'stop' ? styles.buttonactive : styles.buttondisable}
      >
        <Text style={{
          textAlign: 'center', justifyContent: 'center', fontSize: 20, top: '20%',
        }}
        >
          Save
        </Text>
      </TouchableOpacity>
      {isLoading ? <LoadingEffect /> : <View />}
    </View>
  );
}
