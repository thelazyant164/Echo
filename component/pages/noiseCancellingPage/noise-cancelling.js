import React from 'react';
import {
  View,
} from 'react-native';
import FileUploadForm from '../../page-component/file-upload-form/file-upload-form';
import BannerAds from '../../page-component/advertisement/BannerAds';

export function NoisecancellingPage({ navigation }) {
  return (
    <View>
      <BannerAds />
      <View style={{ marginTop: '20%' }}>
        <FileUploadForm service="noisecancelling" navigation={navigation} />
      </View>
    </View>
  );
}
