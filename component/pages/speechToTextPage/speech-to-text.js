import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import FileUploadForm from '../../page-component/file-upload-form/file-upload-form';
import BannerAds from '../../page-component/advertisement/BannerAds';

export function SpeechToTextPage({ navigation }) {
  return (
    <View>
      <BannerAds />
      <View style={{ marginTop: '10%' }}>
        <FileUploadForm service="speechtotext" navigation={navigation} />
      </View>
    </View>
  );
}
