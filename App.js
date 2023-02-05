import { React, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// places to import components of the application
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import AuthenticationNavigation from './component/page-component/authen-navigation/authen-navigation';
import AccesstokenState from './component/state/AccessTokencontext';
import { store, persistor } from './component/state/store';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'expo-dev-client';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default function App() {
  useEffect(() => {
    // mobileAds()
    //   .setRequestConfiguration({
    //     // Update all future requests suitable for parental guidance
    //     maxAdContentRating: MaxAdContentRating.PG,

    //     // Indicates that you want your content treated as child-directed for purposes of COPPA.
    //     tagForChildDirectedTreatment: true,

    //     // Indicates that you want the ad request to be handled in a
    //     // manner suitable for users under the age of consent.
    //     tagForUnderAgeOfConsent: true,

    //     // An array of test device IDs to allow.
    //     testDeviceIdentifiers: ['EMULATOR'],
    //   })
    //   .then(() => {
    //     // Request config successfully set!
    //   });
    // mobileAds()
    //   .initialize()
    //   .then((adapterStatuses) => {
    //   // Initialization complete!
    //   }).catch((error) => {

    //   });
  }, []);
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
