import { React } from 'react';
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
    width: 70,
    height: 70,
    margin: 30,
  },
});
export default function Folderbutton(props) {
  const { activeDirectory, goToFolder } = props;
  console.log(activeDirectory);
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.folderbutton}
        onPress={() => { goToFolder(activeDirectory.slice(94, activeDirectory.length)); }}
      >
        <AntDesign name="folder1" size={40} />
        <Text>{activeDirectory.slice(94, activeDirectory.length).replace('%20', ' ')}</Text>
      </TouchableOpacity>
    </View>
  );
}
