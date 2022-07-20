import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid,
} from 'react-native';
import { Audio } from 'expo-av';
import Feather from 'react-native-vector-icons/Feather';
import Timer from './page-component/timer';

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
  const [recording, setRecording] = useState(false);
  const [isPause, setPause] = useState(true);
  const [reset, setReset] = useState(false);
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
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }
  async function pauseRecording() {
    await recording.pauseAsync();
  }
  async function stopRecording() {
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
  }
  useEffect(() => {

  }, [recording]);
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 60 }}>Noise reduction record</Text>

      <TouchableOpacity onPress={() => {
        // eslint-disable-next-line no-unused-expressions

        if (!recording) {
          startRecording();
        }

        setPause(!isPause);
        if (isPause && recording) {
          pauseRecording();
        }
      }}
      >
        { !isPause ? <Feather name="pause" size={50} style={{ marginTop: 200 }} /> : <Feather name="play" size={50} style={{ marginTop: 200 }} />}
      </TouchableOpacity>
      <Timer recording={recording} isPause={isPause} reset={reset} />
      {recording ? (
        <TouchableOpacity
          onPress={async () => {
            setReset(true);
            setPause(true);
            stopRecording();
          }}
          style={styles.buttonactive}
        >
          <Text style={{ textAlign: 'center', marginTop: '10%', fontSize: 20 }}>Save</Text>
        </TouchableOpacity>
      )
        : (
          <View style={styles.buttondisable}>
            <Text style={{ textAlign: 'center', marginTop: '10%', fontSize: 20 }}>Save</Text>
          </View>
        ) }
    </View>
  );
}
