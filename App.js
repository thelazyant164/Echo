import { React, createContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// places to import components of the application
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AuthenticationNavigation from './component/page-component/authen-navigation/authen-navigation';
import AccesstokenState from './component/state/AccessTokencontext';
import { store, persistor } from './component/state/store';

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
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <AuthenticationNavigation />
          </View>
        </PersistGate>
      </Provider>
    </AccesstokenState>

  );
}
