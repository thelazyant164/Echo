import { React, useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Modal, TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

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

export default function PlayAudioPage({ audiofile, setAudiofile }) {
  const [isPlaying, setPlaying] = useState(false);
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
  if (audiofile == null) {
    return <View />;
  }

  return (
    <Modal style={styles.container}>
      {/* <WaveformSeekBar
        style={styles.box}
        data={[1, 2]}
        backgroundColor="#fff"
        progressColor="gray"
        onChange={(e) => console.log(e.nativeEvent)}
      /> */}
      {
      isPlaying
        ? (
          <TouchableOpacity onPress={() => { setPlaying(false); PlayAudio(); }}>
            <Feather name="play" size={50} style={{ marginTop: 200 }} />
          </TouchableOpacity>
        )
        : (
          <TouchableOpacity onPress={() => { setPlaying(true); PauseAudio(); }}>
            <Feather name="pause" size={50} style={{ marginTop: 200 }} />
          </TouchableOpacity>
        )
    }

      <TouchableOpacity onPress={() => {
        setAudiofile(null);
      }}
      >
        <Text>Back</Text>
      </TouchableOpacity>
    </Modal>
  // <Text>{JSON.stringify(audiofile)}</Text>
  );
}
