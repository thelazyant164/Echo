import React from 'react';
import {
  View,
} from 'react-native';
import FileUploadForm from '../../page-component/file-upload-form/file-upload-form';

export function NoisecancellingPage({ navigation }) {
  return (
    <View style={{ marginTop: '20%' }}>
      <FileUploadForm service="noisecancelling" navigation={navigation} />
    </View>
  );
}
