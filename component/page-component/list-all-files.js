import {
  React, useState, useEffect, useRef,
} from 'react';
import {
  View, StyleSheet, Modal, Pressable, Text, FlatList,
} from 'react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Filebutton from './file-button';
import Folderbutton from './folder-button';
import FolderOptions from './folder-options';

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
  filelists,
  setFiles,
  goToFolder,
  service,
  setActiveDirectory,
  showFileLists,
  setshowFileLists,
  activeDirectory,
  source,
}) {
  const [folder, setFolder] = useState('');
  const refRBSheet = useRef();

  useEffect(() => { }, [filelists]);

  if ((!showFileLists)) {
    return (
      <View />
    );
  }
  if (filelists.length > 0 && filelists[0].name === undefined) {
    return (
      <Modal style={styles.modal}>
        <Pressable onPress={() => {
          if (!activeDirectory) {
            setshowFileLists(false);
          }
          setFiles([]);
          setActiveDirectory('');
        }}
        >
          <View style={styles.buttonview}>
            <AntDesign name="arrowleft" size={30} style={{ marginLeft: 5, marginRight: 5 }} />
            <Text style={{ fontSize: 20 }}>Back</Text>
          </View>
        </Pressable>
        <FlatList
          numColumns={3}
          data={filelists}
          renderItem={
                ({ item }) => (
                  <Folderbutton
                    activeDirectory={item}
                    goToFolder={goToFolder}
                    setVisible={refRBSheet}
                    setFolder={setFolder}
                  />
                )
              }
        />

        <FolderOptions
          folder={folder}
          setFiles={setFiles}
          refRBSheet={refRBSheet}
        />

      </Modal>
    );
  }
  if (filelists.length > 0 && filelists[0].name !== undefined) {
    return (
      <Modal style={styles.modal}>
        <Pressable onPress={() => {
          if (!activeDirectory) {
            setshowFileLists(false);
          }
          setFiles([]);
          setActiveDirectory('');
        }}
        >
          <View style={styles.buttonview}>
            <AntDesign name="arrowleft" size={30} style={{ marginLeft: 5, marginRight: 5 }} />
            <Text style={{ fontSize: 20 }}>Back</Text>
          </View>
        </Pressable>
        <FlatList
          numColumns={3}
          data={filelists}
          renderItem={
              ({ item }) => (
                <Filebutton file={item} setFiles={setFiles} source={source} mission={service} />
              )
            }
        />

      </Modal>

    );
  }
  return (

    <Modal style={styles.modal}>
      <Pressable onPress={() => {
        if (!activeDirectory) {
          setshowFileLists(false);
        }
        setFiles([]);
        setActiveDirectory('');
      }}
      >
        <View style={styles.buttonview}>
          <AntDesign name="arrowleft" size={30} style={{ marginLeft: 5, marginRight: 5 }} />
          <Text style={{ fontSize: 20 }}>Back</Text>
        </View>
      </Pressable>
      <FlatList
        numColumns={3}
        data={filelists.files}
        renderItem={
            ({ item }) => (
              <Filebutton file={item} setFiles={setFiles} source={source} mission={service} />
            )
          }
      />
    </Modal>

  );
}
