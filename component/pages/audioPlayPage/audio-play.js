import { React, useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Modal, TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { updateAudioFile } from '../../page-component/file-upload-form/file-upload-form-slider';
import { updateAudio } from '../filesStoragePage/files-slider';

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

export default function PlayAudioPage({ location }) {
  const [isPlaying, setPlaying] = useState(true);
  const [audio, setAudio] = useState(null);
  const dispatch = useDispatch();
  const formstate = useSelector((state) => state.form.value);
  const filesstate = useSelector((state) => state.files.value);

  const PlayAudio = async () => {
    try {
      const sound = new Audio.Sound();
      if (location === 'upload') {
        await sound.loadAsync({ uri: formstate.audioFile.uri });
      } else {
        await sound.loadAsync({ uri: filesstate.audio.item.uri });
      }
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

  const ShareAudio = async () => {
    const condition = await Sharing.isAvailableAsync();
    if (condition) {
      if (location === 'upload') {
        Sharing.shareAsync(formstate.audioFile.uri);
      } else {
        Sharing.shareAsync(filesstate.audio.item.uri);
      }
    }
  };

  const DeleteAudio = async () => {
    MediaLibrary.deleteAssetsAsync([formstate.audioFile.id]);
    if (location === 'upload') {
      dispatch(updateAudioFile(null));
    } else {
      dispatch(updateAudio(null));
    }
  };

  const DownloadAudio = async () => {
    MediaLibrary.addAssetsToAlbumAsync([formstate.audioFile.id]);
    if (location === 'upload') {
      dispatch(updateAudioFile(null));
    } else {
      dispatch(updateAudio(null));
    }
  };

  const UploadAudio = async () => {};

  if (location === 'upload') {
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
            if (location === 'upload') {
              dispatch(updateAudioFile(null));
              setPlaying(false);
            } else {
              dispatch(updateAudio(null));
              setPlaying(false);
            }
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
            <TouchableOpacity onPress={DownloadAudio}>
              <Feather name="download" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={UploadAudio}>
              <Feather name="share" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ShareAudio}>
              <Feather name="share-2" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={DeleteAudio}>
              <AntDesign name="delete" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  if (filesstate.audio === null) {
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
          if (location === 'upload') {
            dispatch(updateAudioFile(null));
          } else {
            dispatch(updateAudio(null));
          }
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
          <TouchableOpacity onPress={UploadAudio}>
            <Feather name="share" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ShareAudio}>
            <Feather name="share-2" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={DeleteAudio}>
            <AntDesign name="delete" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
