import React from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import FileUploadForm from '../../page-component/file-upload-form/file-upload-form';
import BannerAds from '../../page-component/advertisement/BannerAds';

export function NormalizationPage({ navigation }) {
  return (
    <View>
      <BannerAds />
      <View style={{ marginTop: '10%' }}>
        <FileUploadForm service="normalization" navigation={navigation} />
      </View>
    </View>
  );
}
