import { React } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import FileUploadForm from './page-component/file-upload-form';

export function VolumeAdjustPage({ navigation }) {
  return (
    <View style={{ marginTop: 60 }}>
      <Text style={{ textAlign: 'center', fontSize: 20 }}> Volume adjust</Text>
      <FileUploadForm />
    </View>
  );
}
