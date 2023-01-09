import { React } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import FileUploadForm from '../../page-component/file-upload-form/file-upload-form';

export function VolumeAdjustPage({ navigation }) {
  return (
    <View style={{ marginTop: '20%' }}>
      <FileUploadForm service="volumeadjust" navigation={navigation} />
    </View>
  );
}
