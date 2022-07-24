import { React } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as FileSystem from 'expo-file-system';

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
  const { activeDirectory, goToFolder } = props;
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.folderbutton}
        onPress={async () => {
          /* await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}/JasonMraz`,
          { intermediates: true });
          console.log(await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}/Songs`));
          console.log(await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)); */
          // goToFolder(activeDirectory.slice(94, activeDirectory.length));
          goToFolder(activeDirectory);
        }}
      >
        <AntDesign name="folder1" size={40} />
        <Text>{activeDirectory}</Text>
        <Text>{activeDirectory.slice(94, activeDirectory.length).replace('%20', ' ')}</Text>
      </TouchableOpacity>
    </View>
  );
}
