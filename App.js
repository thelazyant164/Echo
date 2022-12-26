import { React, createContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// places to import components of the application
import AuthenticationNavigation from './component/page-component/authen-navigation';
import AccesstokenState from './component/state/AccessTokencontext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <AccesstokenState>
      <View style={styles.container}>
        <AuthenticationNavigation />
      </View>
    </AccesstokenState>

  );
}
