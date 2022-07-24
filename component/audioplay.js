import { React, useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Button, Modal,
} from 'react-native';
import { Audio } from 'expo-av';
import WaveformSeekBar from 'react-native-waveform-seekbar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 30,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  btn: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
    padding: 20,
    marginTop: 100,
  },
  box: {
    height: 100,
  },
});
export default function PlayAudioPage(props) {
  const { audiofile, typeoffile } = props;
  const PlayAudio = async (link) => {
    try {
      const { sound } = await Audio.Sound.createAsync();
      await sound.playAsync();
      await sound.unloadAsync();
    } catch (err) {
      console.error(err);
    }
  };
  const PauseAudio = async () => {

  };
  return (
    <Modal>
      <Text />
      <WaveformSeekBar
        style={styles.box}
        data={audiofile}
        backgroundColor="#fff"
        progressColor="gray"
        onChange={(e) => console.log(e.nativeEvent)}
      />
    </Modal>
  );
}
