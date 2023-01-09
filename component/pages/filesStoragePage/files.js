import {
  React, useEffect, useContext, useState, useRef,
} from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../page-component/header/header';
import { FolderInput } from '../../page-component/newfolder-input/newfolder-input';
import { useDocumentReadWritePermission } from '../../utils/documentaryHelper';
import Folderbutton from '../../page-component/folder-button/folder-button';
import { Accesstoken } from '../../state/AccessTokencontext';
import FolderOptions from '../../page-component/folder-options/folder-options';
import { Configuration } from '../../../configuration/configuration';
import {
  showModal,
  updateActiveDirectory,
  updateFiles,
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
    // readAllFiles,
  } = useDocumentReadWritePermission();
  const dispatch = useDispatch();

  const filesstate = useSelector((state) => state.files.value);

  async function FirstTimeFetching() {
    await getPermissionFirstTime();
    const files = await getFileContent(filesstate.activeDirectory);
    dispatch(updateFiles(files));
  }
  async function FetchFolderContent() {
    const files = await getFileContent(filesstate.activeDirectory);
    dispatch(updateFiles(files));
  }

  const refRBSheet = useRef();
  useEffect(() => {
    FirstTimeFetching();
  }, []);

  useEffect(() => {
    FetchFolderContent();
  }, [filesstate.activeDirectory]);

  useEffect(() => {

  }, [filesstate.isVisible]);

  return (
    <View style={filesstate.isVisible ? style.outer_container_faded : style.outer_container}>
      <Header navigation={navigation} />
      <View style={{ marginTop: 60 }}>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>Files Storage</Text>
        <View style={style.feature_container}>
          { filesstate.activeDirectory
            ? (
              <View style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
              }}
              >
                <TouchableOpacity onPress={() => { dispatch(updateActiveDirectory('')); }}>
                  <Text style={{ fontSize: 20 }}>Root Folder/</Text>
                </TouchableOpacity>
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
                  location="files"
                  activeDirectory={item}
                  setVisible={refRBSheet}
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
        folder={filesstate.folder}
        refRBSheet={refRBSheet}
      />
    </View>
  );
}
