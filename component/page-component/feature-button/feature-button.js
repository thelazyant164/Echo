import { React } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';
import { saveCached, getCached } from '../../utils/cacheHelper';

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
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export function Featurebutton(props) {
  const { feature, navigation } = props;
  if (feature.toLowerCase() === 'noise cancelling') {
    return (
      <TouchableOpacity
        onPress={async () => {
          const result = await getCached();
          result.unshift(feature.toLowerCase());
          result.pop(result[result.length() - 1]);
          saveCached(result);
          navigation.navigate(feature);
        }}
        style={style.button}
      >
        <View style={style.content}>
          <MaterialCommunityIcons
            name="headphones"
            size={20}
          />
          <Text>{feature}</Text>
        </View>
      </TouchableOpacity>
    );
  } if (feature.toLowerCase() === 'volume adjust') {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(feature);
          saveCached(feature.toLowerCase());
        }}
        style={style.button}
      >
        <View style={style.content}>
          <MaterialCommunityIcons
            name="volume-plus"
            size={20}
          />
          <Text>{feature}</Text>
        </View>
      </TouchableOpacity>
    );
  } if (feature.toLowerCase() === 'speech to text') {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(feature);
          saveCached(feature.toLowerCase());
        }}
        style={style.button}
      >
        <View style={style.content}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={20}
          />
          <Text>{feature}</Text>
        </View>
      </TouchableOpacity>
    );
  } if (feature.toLowerCase() === 'noise reduction record') {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(feature);
          saveCached(feature.toLowerCase());
        }}
        style={style.button}
      >
        <View style={style.content}>
          <MaterialCommunityIcons
            name="microphone-outline"
            size={20}
          />
          <Text>{feature}</Text>
        </View>
      </TouchableOpacity>
    );
  } if (feature.toLowerCase() === 'normalization') {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(feature);
          saveCached(feature.toLowerCase());
        }}
        style={style.button}
      >
        <View style={style.content}>
          <MaterialCommunityIcons
            name="waveform"
            size={20}
          />
          <Text>{feature}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  if (feature.toLowerCase() === 'silence') {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(feature);
          saveCached(feature.toLowerCase());
        }}
        style={style.button}
      >
        <View style={style.content}>
          <MaterialIcons
            name="leak-remove"
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
