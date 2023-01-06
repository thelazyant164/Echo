import {
  React, useEffect, useContext, useState, useRef,
} from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../page-component/header';
import { FolderInput } from '../../page-component/newfolder-input';
import { useCachedReadWritePermission } from '../../hooks/index';
import Folderbutton from '../../page-component/folder-button';
import { Accesstoken } from '../../state/AccessTokencontext';
import FolderOptions from '../../page-component/folder-options';
import { Configuration } from '../../../configuration/configuration';
import {
  updateActiveDirectory, updateFiles, filestate,
} from './files-slider';

const style = StyleSheet.create({
  feature_container: {
    marginTop: 70,
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

export function Files({ navigation }) {
  const {
    getPermissionFirstTime,
    getFileContent,
    activeDirectory,
    setActiveDirectory,
    files,
    setFiles,
    showModal,
    setShowModal,
    goToFolder,
  } = useCachedReadWritePermission();
  const [folder, setFolder] = useState('');
  const dispatch = useDispatch();
  const filesstate = useSelector((state) => state.files);

  async function FirstTimeFetching() {
    await getPermissionFirstTime();
    await getFileContent();
    dispatch(updateFiles(files));
  }
  async function FetchFolderContent() {
    setFiles([]);
    dispatch(updateFiles([]));
    await getFileContent();
    dispatch(updateFiles(files));
  }

  const refRBSheet = useRef();
  useEffect(() => {
    FirstTimeFetching();
  }, []);

  useEffect(() => {
    FetchFolderContent();
  }, [activeDirectory]);

  return (
    <View style={filesstate.isVisble ? style.outer_container_faded : style.outer_container}>
      <Header navigation={navigation} />
      <View style={{ marginTop: 60 }}>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>Files Storage</Text>
        <View style={filesstate.isVisble ? style.feature_container : style.feature_container}>
          { filesstate.activeDirectory
            ? (
              <View style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
              }}
              >
                <TouchableOpacity onPress={() => { dispatch(updateActiveDirectory('')); }}><Text style={{ fontSize: 20 }}>Root Folder/</Text></TouchableOpacity>
                <Text style={{ fontSize: 20 }}>
                  {filesstate.activeDirectory.replace('%20', ' ')}
                </Text>
              </View>
            )
            : <Text style={{ fontSize: 20 }}>Root Folder</Text>}
          <View style={style.container}>
            <FlatList
              numColumns={3}
              data={filesstate.files}
              renderItem={({ item }) => (
                <Folderbutton
                  activeDirectory={item}
                  goToFolder={goToFolder}
                  setVisible={refRBSheet}
                  setFolder={setFolder}
                />
              )}
            />
          </View>
        </View>
        {filesstate.activeDirectory ? (
          <TouchableOpacity
            style={style.addbutton}
            onPress={() => {
              navigation.navigate('Home');
            }}
          >
            <AntDesign name="addfile" size={25} style={{ textAlign: 'center', justifyContent: 'center', marginTop: 10 }} />
          </TouchableOpacity>
        )
          : (
            <TouchableOpacity
              style={style.addbutton}
              onPress={() => setShowModal(true)}
            >
              <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 2 }}>+</Text>
            </TouchableOpacity>
          )}

        {showModal && (
          <FolderInput
            setShowModal={setShowModal}
            activeDirectory={filesstate.activeDirectory}
            setActiveDirectory={setActiveDirectory}
          />
        )}
      </View>
      <FolderOptions
        folder={filesstate.folder}
        refRBSheet={refRBSheet}
        setFiles={setFiles}
      />
    </View>
  );
}
