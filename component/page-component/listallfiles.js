import { React, useState, useEffect } from 'react';
import {
  View, StyleSheet, Modal, Pressable, Text, FlatList,
} from 'react-native';
import axios from 'axios';
import Filebutton from './file-button';

const styles = StyleSheet.create({
  appear: {

  },
  disappear: {},
  modal: {

  },
  buttonview: {},
});

export default function ListallFiles({ filelists }) {
  const SendFileInformation = (file) => {
    axios.post('', { fileid: file.id });
  };
  if (filelists.length === 0) {
    return (
      <View />
    );
  }

  return (
    <View>
      <Modal style={styles.modal}>
        <FlatList
          numColumns={3}
          data={filelists.files}
          renderItem={
                ({ item, key }) => (
                  <Filebutton file={item} />
                )
              }
        />
      </Modal>
    </View>
  );
}
