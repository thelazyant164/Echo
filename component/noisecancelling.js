import React from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import FileUploadForm from './page-component/file-upload-form';

export function NoisecancellingPage({ navigation }) {
  return (
    <View style={{ marginTop: '20%' }}>

      <FileUploadForm />
    </View>
  );
}
