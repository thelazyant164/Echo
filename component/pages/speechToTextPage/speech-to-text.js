import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import FileUploadForm from '../../page-component/file-upload-form/file-upload-form';

export function SpeechToTextPage({ navigation }) {
  return (
    <View style={{ marginTop: '20%' }}>
      <FileUploadForm service="speechtotext" navigation={navigation} />
    </View>
  );
}
