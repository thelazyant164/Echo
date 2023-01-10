import { React, useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Modal, TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { updateAudioFile } from '../../page-component/file-upload-form/file-upload-form-slider';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#000ff',
    justifyContent: 'center',
    top: '40%',
  },
  text: {
    marginTop: 30,
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

export default function PlayAudioPage() {
  const [isPlaying, setPlaying] = useState(true);
  const [audio, setAudio] = useState(null);
  const dispatch = useDispatch();
  const formstate = useSelector((state) => state.form.value);

  const PlayAudio = async (link) => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: formstate.audioFile.uri });
      await sound.playAsync();

      setAudio(sound);
      // await sound.unloadAsync();
    } catch (err) {
      console.error(err);
    }
  };
  const PauseAudio = async () => {
    await audio.pauseAsync();
  };
  if (formstate.audioFile === null) {
    return <View />;
  }

  return (
    <Modal>
      <TouchableOpacity
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          margin: 10,
        }}
        onPress={() => {
          dispatch(updateAudioFile(null));
        }}
      >
        <AntDesign name="arrowleft" size={30} style={{ marginLeft: 5, marginRight: 5 }} />
        <Text style={{ fontSize: 20 }}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        {
      isPlaying
        ? (
          <TouchableOpacity onPress={() => { setPlaying(false); PlayAudio(); }}>
            <Feather name="play" size={50} />
          </TouchableOpacity>
        )
        : (
          <TouchableOpacity onPress={() => { setPlaying(true); PauseAudio(); }}>
            <Feather name="pause" size={50} />
          </TouchableOpacity>
        )
    }
        <View style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          margin: 10,
          top: '80%',
          justifyContent: 'space-around',
        }}
        >
          <TouchableOpacity onPress={() => { dispatch(updateAudioFile([])); }}>
            <Feather name="download" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <Feather name="share" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { dispatch(updateAudioFile([])); }}>
            <AntDesign name="delete" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
