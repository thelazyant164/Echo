import {
  React, useState, useEffect, useRef,
} from 'react';
import {
  View, StyleSheet, Modal, Pressable, Text, FlatList,
} from 'react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import Filebutton from '../file-button/file-button';
import Folderbutton from '../folder-button/folder-button';
import FolderOptions from '../folder-options/folder-options';
import {
  updateActiveDirectory, updateFiles, showLoading, hideLoading, showFilesList, hideFilesList,
} from '../file-upload-form/file-upload-form-slider';

const styles = StyleSheet.create({
  appear: {

  },
  disappear: {},
  modal: {
    width: '100%',
    height: '100%',

  },
  buttonview: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    margin: 10,
  },
});

export default function ListallFiles({
  service,
  source,
}) {
  const refRBSheet = useRef();
  const dispatch = useDispatch();

  const formstate = useSelector((state) => state.form.value);

  useEffect(() => { }, [formstate.files]);

  if ((!formstate.isFilesListVisible)) {
    return (
      <View />
    );
  }
  if (formstate.files.length > 0 && formstate.files[0].name === undefined) {
    return (
      <Modal style={styles.modal}>
        <Pressable onPress={() => {
          if (!formstate.activeDirectory) {
            dispatch(hideFilesList());
          }
          dispatch(updateFiles([]));
          dispatch(updateActiveDirectory(''));
        }}
        >
          <View style={styles.buttonview}>
            <AntDesign name="arrowleft" size={30} style={{ marginLeft: 5, marginRight: 5 }} />
            <Text style={{ fontSize: 20 }}>Back</Text>
          </View>
        </Pressable>
        <FlatList
          numColumns={3}
          data={formstate.files}
          renderItem={
                ({ item }) => (
                  <Folderbutton
                    location="form"
                    activeDirectory={item}
                    setVisible={refRBSheet}
                  />
                )
              }
        />

        <FolderOptions
          folder={formstate.folder}
          refRBSheet={refRBSheet}
        />

      </Modal>
    );
  }
  if (formstate.files.length > 0 && formstate.files[0].name !== undefined) {
    return (
      <Modal style={styles.modal}>
        <Pressable onPress={() => {
          if (!formstate.activeDirectory) {
            dispatch(hideFilesList());
          }
          dispatch(updateFiles([]));
          dispatch(updateActiveDirectory(''));
        }}
        >
          <View style={styles.buttonview}>
            <AntDesign name="arrowleft" size={30} style={{ marginLeft: 5, marginRight: 5 }} />
            <Text style={{ fontSize: 20 }}>Back</Text>
          </View>
        </Pressable>
        <FlatList
          numColumns={3}
          data={formstate.files}
          renderItem={
              ({ item }) => (
                <Filebutton file={item} source={source} mission={service} />
              )
            }
        />

      </Modal>

    );
  }
  return (

    <Modal style={styles.modal}>
      <Pressable onPress={() => {
        if (!formstate.activeDirectory) {
          dispatch(showFilesList());
        }
        dispatch(updateFiles([]));
        dispatch(updateActiveDirectory(''));
      }}
      >
        <View style={styles.buttonview}>
          <AntDesign name="arrowleft" size={30} style={{ marginLeft: 5, marginRight: 5 }} />
          <Text style={{ fontSize: 20 }}>Back</Text>
        </View>
      </Pressable>
      <FlatList
        numColumns={3}
        data={formstate.files}
        renderItem={
            ({ item }) => (
              <Filebutton file={item} source={source} mission={service} />
            )
          }
      />
    </Modal>

  );
}
