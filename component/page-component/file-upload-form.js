import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginTop: 80,
    backgroundColor: '#D9D9D9',
    width: 287,
    height: 331,
    marginLeft: 60,

  },
  title: {
    textAlign: 'center',
    color: '#757575',
    marginTop: 30,
  },
});

export function FileUploadForm() {
  const getFileDrive = () => {};
  const getFileDevice = () => {};
  const getFileICloud = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choosing your file from</Text>
      <View style={{
        display: 'flex', flexDirection: 'row', marginTop: 100, marginLeft: 40,
      }}
      >
        <TouchableOpacity style={{ marginLeft: 20, marginRight: 20 }}>
          <Entypo name="mobile" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20, marginRight: 20 }}>
          <Entypo name="google-drive" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20, marginRight: 20 }}>
          <Entypo name="icloud" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
