import { React, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const style = StyleSheet.create({
  container: {
    margin: 20,
    width: '20%',
    height: '60%',
  },
  content: {
    margin: 4,
  },
  folderbutton: {
    justifyContent: 'center',
    width: 80,
    height: 70,
    margin: 30,
  },
});
export default function Folderbutton(props) {
  const {
    activeDirectory, goToFolder, setVisible, setFolder,
  } = props;
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.folderbutton}
        onPress={async () => {
          goToFolder(activeDirectory);
        }}
        onLongPress={() => {
          setVisible.current.open();
          setFolder(activeDirectory);
        }}
      >
        <AntDesign name="folder1" size={40} />
        <Text>{activeDirectory.slice(0, 8)}</Text>
      </TouchableOpacity>
    </View>
  );
}
