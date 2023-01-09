import React from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import FileUploadForm from '../../page-component/file-upload-form/file-upload-form';

export function SilencePage({ navigation }) {
  return (
    <View style={{ marginTop: '20%' }}>
      <FileUploadForm service="silence" navigation={navigation} />
    </View>
  );
}
