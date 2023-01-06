import {
  React, useState, useEffect, useContext,
} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert,
} from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import GDrive from 'expo-google-drive-api-wrapper';
import { useSelector, useDispatch } from 'react-redux';
import { Accesstoken } from '../../state/AccessTokencontext';
import PlayAudioPage from '../../audio-play';
import LoadingEffect from '../loading-effect';
import { Configuration } from '../../../configuration/configuration';

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
    file, source, mission,
  } = props;
  const accesstoken = useContext(Accesstoken);
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [audiofile, setAudiofile] = useState(null);

  const ShowFileOption = () => {};
  const GetFileFromCloud = () => {
    axios.get(Configuration.backendAPI`/api/audios/${file.id}`, { headers: { Authorization: `Bearer ${accesstoken}` } })
      .then((response) => {
        setAudiofile(response.data.content.buffer);
      })
      .catch((err) => { console.log(err); });
  };
  const GetFileFromDevice = async () => {
    const fileDir = `${FileSystem.documentDirectory}/${file}`;
    const result = await FileSystem.readAsStringAsync(fileDir);
    return result;
  };
  const GetFileFromDrive = async () => {
    // const queryParams = { acknowledgeAbuse: true, fields: '*' };
    // const result = await GDrive.files.download(
    //   file.id,
    //   file.name,
    //   queryParams,
    // );
    // const contain = await FileSystem.readAsStringAsync(result.uri);
    // setAudiofile(file.id);
  };

  const GetFile = async () => {
    if (source === 'drive') {
      GetFileFromDrive();
    } else if (source === 'cloud') {
      GetFileFromCloud();
    } else {
      await GetFileFromDevice();
    }
  };
  const FileProcessing = async (service) => {
    setLoading(true);
    if (source === 'cloud') {
      axios.get(`http://192.168.1.7:3001/api/audio/${service}/${file.id}`, { headers: { Authorization: `Bearer ${accesstoken}` } })
        .then((response) => {
          setAudiofile(response);
          setVisible(true);
          setLoading(false);
        })
        .catch((err) => {
          Alert.alert('Error while processing. Please try again.');
          setLoading(false);
        });
    } else if (source === 'drive') {
      axios.get(`http://192.168.1.7:3001/api/audio/${service}/${file.id}`, { headers: { Authorization: `Bearer ${accesstoken}` } })
        .then((response) => {
          setAudiofile(response);
          setVisible(true);
          setLoading(false);
        })
        .catch((err) => {
          Alert.alert('Error while processing. Please try again.');
          setLoading(false);
        });
    } else {
      axios.get(`http://192.168.1.7:3001/api/audio/${service}/${file.id}`, { headers: { Authorization: `Bearer ${accesstoken}` } })
        .then((response) => {
          setAudiofile(response);
          setVisible(true);
          setLoading(false);
        })
        .catch((err) => {
          Alert.alert('Error while processing. Please try again.');
          setLoading(false);
        });
    }
  };

  const Operate = () => {
    GetFile();
    switch (mission) {
      case 'play':
        setVisible(true);
        break;
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
          <Text>{`${file.name.slice(0, 6)}...`}</Text>
        </View>
      </TouchableOpacity>
      {isVisible ? <PlayAudioPage audiofile={audiofile} /> : <View />}
      {isLoading ? <LoadingEffect /> : <View />}
    </View>
  );
}
