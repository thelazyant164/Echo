import {
  React, useEffect, useRef,
} from 'react';
import {
  View, StyleSheet, Modal, Pressable, Text, FlatList,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import Filebutton from '../file-button/file-button';
import Folderbutton from '../folder-button/folder-button';
import FolderOptions from '../folder-options/folder-options';
import FileOptions from '../file-options/file-options';
import {
  updateAlbum, updateFiles, hideFilesList,
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

  useEffect(() => {
    console.log(formstate.albums);
  }, [formstate.files, formstate.album]);

  if ((!formstate.isFilesListVisible)) {
    return (
      <View />
    );
  }
  if (formstate.files.length === 0) {
    return (
      <Modal style={styles.modal} animationType="slide">
        <Pressable onPress={() => {
          if (!formstate.album) {
            dispatch(hideFilesList());
          }
          dispatch(updateFiles([]));
          dispatch(updateAlbum(''));
        }}
        >
          <View style={styles.buttonview}>
            <AntDesign name="arrowleft" size={30} style={{ marginLeft: 5, marginRight: 5 }} />
            <Text style={{ fontSize: 20 }}>Back</Text>
          </View>
        </Pressable>
        <FlatList
          numColumns={3}
          data={formstate.albums}
          renderItem={
                ({ item }) => (
                  typeof item !== 'object'
                    ? (
                      <Folderbutton
                        location="form"
                        activeDirectory={item}
                        setVisible={refRBSheet}
                      />
                    ) : <View />
                )
              }
        />

        <FolderOptions
          folder={formstate.album}
          refRBSheet={refRBSheet}
        />

      </Modal>
    );
  }
  if (formstate.files.length > 0) {
    <Modal style={styles.modal} animationType="slide">
      <Pressable onPress={() => {
        if (!formstate.album) {
          dispatch(hideFilesList());
        }
        dispatch(updateFiles([]));
        dispatch(updateAlbum(''));
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
            <Filebutton file={item} source={source} mission={service} location="upload" setVisible={refRBSheet} />
          )
        }
      />
      <FileOptions refRBSheet={refRBSheet} location="upload" />
    </Modal>;
  }

  return (
    <Modal style={styles.modal} animationType="slide">
      <Pressable onPress={() => {
        if (!formstate.album) {
          dispatch(hideFilesList());
        }
        dispatch(updateFiles([]));
        dispatch(updateAlbum(''));
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
              <Filebutton file={item} source={source} mission={service} location="upload" setVisible={refRBSheet} />
            )
          }
      />
      <FileOptions refRBSheet={refRBSheet} location="upload" />
    </Modal>
  );
}
