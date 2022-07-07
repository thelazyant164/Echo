import { React, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid,
} from 'react-native';
import { Audio } from 'expo-av';
import Feather from 'react-native-vector-icons/Feather';

export function RecordPage({ navigation }) {
  const [recording, setRecording] = useState(false);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { newrecording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      setRecording(newrecording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
  }

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 60 }}>Noise reduction record</Text>

      <TouchableOpacity onPress={() => {
        setRecording(!recording);
        // eslint-disable-next-line no-unused-expressions
        recording ? stopRecording() : startRecording();
      }}
      >
        { recording ? <Feather name="play" size={50} style={{ marginTop: 200 }} /> : <Feather name="pause" size={50} style={{ marginTop: 200 }} />}
      </TouchableOpacity>
    </View>
  );
}
