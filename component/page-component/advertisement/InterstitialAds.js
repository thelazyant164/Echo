// import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

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
//     console.log('Configuration success');
//   }).catch((err) => {
//     console.log(`Error: ${err}`);
//   });

// mobileAds()
//   .initialize()
//   .then((adapterStatuses) => {
//     console.log(adapterStatuses);
//   });

import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2452578756262316/4737929582';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export default function InterstitialAds() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <Button
      title="Show Interstitial"
      onPress={() => {
        interstitial.show();
      }}
    />
  );
}
