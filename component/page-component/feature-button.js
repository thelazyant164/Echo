import { React } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const style = StyleSheet.create({
  button: {
    width: 90,
    height: 90,
    backgroundColor: '#D9D9D9',
    marginBottom: 10,
    marginTop: 10,
    marginRight: 4,
    marginLeft: 4,
    borderRadius: 12,
  },
  content: {
    margin: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export function Featurebutton(props) {
  const { feature, navigation } = props;
  if (feature != null) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(feature)} style={style.button}>
        <View style={style.content}>
          <MaterialCommunityIcons
            name={
              () => {
                if (feature.toLowerCase() === 'noise cancelling') {
                  return 'headphones';
                } if (feature.toLowerCase() === 'volume adjust') {
                  return 'volume-plus';
                } if (feature.toLowerCase() === 'speech to text') {
                  return 'file-document-online';
                }
                return 'mic';
              }

            }
            size={20}
          />
          <Text>{feature}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View />
  );
}
