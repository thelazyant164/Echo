import {
  React, useEffect, useContext, useState, useRef,
} from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import SwitchCustom from 'expo-custom-switch';
import Entypo from 'react-native-vector-icons/Entypo';
import { FolderInput } from '../../page-component/newfolder-input/newfolder-input';
import Folderbutton from '../../page-component/folder-button/folder-button';
import Filebutton from '../../page-component/file-button/file-button';
import FileOptions from '../../page-component/file-options/file-options';
import FolderOptions from '../../page-component/folder-options/folder-options';
import PlayAudioPage from '../audioPlayPage/audio-play';
import { Configuration } from '../../../configuration/configuration';
import BannerAds from '../../page-component/advertisement/BannerAds';
import { listAllAlbumsAsync, listAllFilesAsync } from '../../utils/albumHelper';
import {
  showModal,
  updateActiveDirectory,
  updateFiles,
  updateAlbum,
  updateAlbums,
} from './files-slider';

const style = StyleSheet.create({
  feature_container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  outer_container: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
    height: '100%',
  },
  outer_container_faded: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
  },
  container: {
    marginBottom: 80,
    borderRadius: 12,
    justifyContent: 'center',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addbutton: {
    backgroundColor: '#D9D5D5',
    width: 50,
    height: 50,
    borderRadius: 30,
    position: 'absolute',
    marginTop: 550,
    marginLeft: 350,
  },

});

export function Files() {
  const dispatch = useDispatch();
  const [source, setSource] = useState(null);
  const filesstate = useSelector((state) => state.files.value);

  async function FirstTimeFetching() {
    // await getPermissionFirstTime(filesstate.activeDirectory);
    const files = await listAllAlbumsAsync();
    const result = [];
    files.forEach((file) => {
      result.push(file.title);
    });
    dispatch(updateAlbums(result));
  }
  async function FetchContent() {
    try {
      if (filesstate.album) {
        const files = await listAllFilesAsync(filesstate.album);
        if (files.assets !== undefined) {
          dispatch(updateFiles(files.assets));
        } else {
          dispatch(updateFiles(files));
        }
      } else {
        const files = await listAllAlbumsAsync();
        const result = [];
        files.forEach((file) => {
          result.push(file.title);
        });
        dispatch(updateAlbums(result));
      }
    } catch (err) {
      dispatch(updateFiles([]));
      console.log(err);
      Alert.alert('Cannot read file from this album');
    }
  }

  const refRBSheet = useRef();
  const filesrefRBSheet = useRef();
  useEffect(() => {
    dispatch(updateAlbum(''));
    FirstTimeFetching();
  }, []);

  useEffect(() => {
    FetchContent();
  }, [filesstate.album]);

  useEffect(() => {
    FetchContent();
  }, [filesstate.isVisible]);

  if (source) {
    return (
      <View style={filesstate.isVisible ? style.outer_container_faded : style.outer_container}>
        <BannerAds />
        <View style={{ marginTop: 20, marginBottom: 100 }}>
          <View style={style.feature_container}>
            { filesstate.album
              ? (
                <View style={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'row',
                  marginBottom: 20,
                }}
                >
                  <TouchableOpacity onPress={() => { dispatch(updateAlbum('')); }} style={{ display: 'flex', flexDirection: 'row' }}>
                    <AntDesign name="arrowleft" size={30} style={{ marginLeft: 5, marginRight: 5 }} />
                    <Text style={{ fontSize: 20 }}>Back </Text>
                  </TouchableOpacity>
                </View>
              )

              : (
                <TouchableOpacity onPress={() => { setSource(null); }} style={{ display: 'flex', flexDirection: 'row' }}>
                  <AntDesign name="arrowleft" size={30} style={{ marginLeft: 5, marginRight: 5 }} />
                  <Text style={{ fontSize: 20 }}>Back </Text>
                </TouchableOpacity>
              )}
            <View style={style.container}>
              {filesstate.album
                ? (
                  <FlatList
                    numColumns={3}
                    data={filesstate.files}
                    renderItem={(item) => (
                      <Filebutton
                        file={item}
                        location="file"
                        setVisible={filesrefRBSheet}
                      />
                    )}
                  />
                ) : (
                  <FlatList
                    numColumns={3}
                    data={filesstate.albums}
                    renderItem={({ item }) => (
                      typeof item !== 'object'
                        ? (
                          <Folderbutton
                            location="files"
                            activeDirectory={item}
                            setVisible={refRBSheet}
                          />
                        ) : <View />
                    )}
                  />
                )}
            </View>
          </View>
          {filesstate.album ? (
            <View />
          )
            : (
              <TouchableOpacity
                style={style.addbutton}
                onPress={() => dispatch(showModal())}
              >
                <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 2 }}>+</Text>
              </TouchableOpacity>
            )}

          {filesstate.isVisible && (
          <FolderInput
            activeDirectory={filesstate.activeDirectory}
          />
          )}
        </View>
        <FolderOptions
          folder={filesstate.album}
          refRBSheet={refRBSheet}
        />
        <FileOptions refRBSheet={filesrefRBSheet} location="file" />
        <PlayAudioPage location="file" />
      </View>
    );
  }
  return (
    <View style={filesstate.isVisible ? style.outer_container_faded : style.outer_container}>
      <BannerAds />
      <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '10%' }}> Choose the storage</Text>
      <View style={{
        flex: 1,
        marginTop: '20%',
        // justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Pressable
          onPress={() => {
            setSource('cloud');
          }}
          style={{
            width: '70%',
            height: 50,
            borderRadius: 12,
            backgroundColor: 'rgb(37, 150, 190)',
            justifyContent: 'center',
          }}
        >
          <Text style={{
            fontSize: 20, textAlign: 'center', justifyContent: 'center', color: '#ffffff',
          }}
          >
            Cloud
          </Text>
        </Pressable>

        <Pressable
          style={{
            marginTop: '20%',
            width: '70%',
            height: 50,
            borderRadius: 12,
            backgroundColor: 'rgb(37, 150, 190)',
            justifyContent: 'center',
          }}
          onPress={() => {
            setSource('file');
          }}
        >
          {/* <Entypo name="icloud" size={30} /> */}
          <Text style={{
            fontSize: 20, textAlign: 'center', justifyContent: 'center', color: '#ffffff',
          }}
          >
            Local
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
