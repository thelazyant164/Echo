import { React, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid,
} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

export function RecordPage({ navigation }) {
  const [isVisible, setVisible] = useState(false);
  this;
  return (
    <View>
      <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 60 }}>
        Noise reduction record
      </Text>
      <TouchableOpacity onPress={() => {
        setVisible(true);
      }}
      />
    </View>
  );
}
