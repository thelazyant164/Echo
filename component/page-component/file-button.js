import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    margin: 30,
    width: '20%',
    height: '60%',
  },
  content: {
    margin: 4,
  },
});
export default function Filebutton(props) {
  const { file, setFiles } = props;
  const SendFileInformation = () => {
    setFiles('');
    axios.post('', { fileid: file.id });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={SendFileInformation} style={styles.content}>

        <FontAwesome name="file-audio-o" size={40} />

        <View>
          <Text>{`${file.name.slice(0, 6)}...`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
