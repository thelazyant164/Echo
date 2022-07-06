import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';

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
      <TouchableOpacity />
      <TouchableOpacity />
      <TouchableOpacity />
    </View>
  );
}
