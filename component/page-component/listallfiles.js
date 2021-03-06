import { React, useState, useEffect } from 'react';
import {
  View, StyleSheet, Modal, Pressable, Text, FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Filebutton from './file-button';
import Folderbutton from './folder-button';
import axiosInstance from '../service/axios';

const styles = StyleSheet.create({
  appear: {

  },
  disappear: {},
  modal: {

  },
  buttonview: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    margin: 10,
  },
});

export default function ListallFiles({ filelists, setFiles, goToFolder }) {
  const SendFileInformation = (file) => {
    /* axiosInstance.post('', { fileid: file.id }); */
  };

  if (filelists.length === 0) {
    return (
      <View />
    );
  }
  if (filelists.length > 0 && filelists[0].name === undefined) {
    return (
      <View>
        <Modal style={styles.modal}>
          <Pressable onPress={() => { setFiles([]); }}>
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
                  <Folderbutton activeDirectory={item} goToFolder={goToFolder} />
                )
              }
          />
        </Modal>
      </View>
    );
  }
  if (filelists.length > 0 && filelists[0].name !== undefined) {
    return (
      <View>
        <Modal style={styles.modal}>
          <Pressable onPress={() => { setFiles([]); }}>
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
                <Filebutton file={item} setFiles={setFiles} source="cloud" />
              )
            }
          />

        </Modal>
      </View>
    );
  }
  return (
    <View>
      <Modal style={styles.modal}>
        <Pressable onPress={() => { setFiles([]); }}>
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
              <Filebutton file={item} setFiles={setFiles} source="drive" />
            )
          }
        />

      </Modal>
    </View>
  );
}
