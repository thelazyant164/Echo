import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from './component/page-component/header';
// places to import components of the application
import Navigation from './component/page-component/navigation';

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
      <Navigation />
    </View>
  );
}
