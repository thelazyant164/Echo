import { React, useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Button, Modal, TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';
import WaveformSeekBar from 'react-native-waveform-seekbar';
import Feather from 'react-native-vector-icons/Feather';

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
  const { audiofile } = props;
  const { isPlaying, setPlaying } = useState(false);
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
      {
        isPlaying
          ? (
            <TouchableOpacity onPress={() => { setPlaying(false); }}>
              <Feather name="play" size={50} style={{ marginTop: 200 }} />
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity onPress={() => { setPlaying(true); }}>
              <Feather name="pause" size={50} style={{ marginTop: 200 }} />
            </TouchableOpacity>
          )
      }
    </Modal>
  );
}
