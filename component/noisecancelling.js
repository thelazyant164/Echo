import React from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import FileUploadForm from './page-component/file-upload-form';

export function NoisecancellingPage({ navigation }) {
  return (
    <View style={{ marginTop: 60 }}>
      <Text style={{ textAlign: 'center', fontSize: 20 }}> Noise cancelling</Text>
      <FileUploadForm />
    </View>
  );
}
