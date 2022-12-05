import {
  React, useState, useEffect, useContext,
} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import { Accesstoken } from '../state/AccessTokencontext';
import PlayAudioPage from '../audioplay';
import LoadingEffect from './loadingeffect';

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
    file, setFiles, source, mission,
  } = props;
  const accesstoken = useContext(Accesstoken);
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [audiofile, setAudiofile] = useState(null);
  const ShowFileOption = () => {};
  const GetFileFromCloud = () => {
    axios.get(`http://100.90.250.177:3001/api/audios/${file.id}`, { headers: { Authorization: `Bearer ${accesstoken}` } })
      .then((response) => {
        // setFiles('');
        setAudiofile(response.data.content.buffer);
      })
      .catch((err) => { console.log(err); });
  };
  const GetFileFromDevice = async () => {
    const fileDir = `${FileSystem.documentDirectory}/${file}`;
    const result = await FileSystem.readAsStringAsync(fileDir);
    return result;
  };
  const GetFileFromDrive = () => {
    FileSystem.createDownloadResumable(FileSystem.documentDirectory + file);
  };
  const GetFile = () => {
    if (source === 'drive') {
      GetFileFromDrive();
    } else if (source === 'cloud') {
      GetFileFromCloud();
    } else {
      GetFileFromDevice();
    }
  };
  const FileProcessing = async (service) => {
    setLoading(true);
    axios.get(`http://100.90.250.177:3001/api/audio/${service}/${file.id}`, { headers: { Authorization: `Bearer ${accesstoken}` } })
      .then((response) => {
        setAudiofile(response.data.buffer);
        setVisible(true);
      })
      .catch((err) => { console.log(err); });
  };

  const Work = () => {
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
      case 'normalize':
        FileProcessing('normalize');
        break;
      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={Work}
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
