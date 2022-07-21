import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from './component/page-component/header';
// places to import components of the application
import AuthenticationNavigation from './component/page-component/authennavigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <AuthenticationNavigation />
    </View>
  );
}
