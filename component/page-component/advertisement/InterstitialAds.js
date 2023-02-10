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
    // const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
    //   setLoaded(true);
    // });
    // const subscribe = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
    //   setLoaded(false);

    //   // reload ad
    //   interstitial.load();
    // });

    // // Start loading the interstitial straight away
    // interstitial.load();

    // // Unsubscribe from events on unmount
    // return unsubscribe;

    const eventListener = interstitial.addAdEventsListener((type, payload) => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
      if (type === AdEventType.CLOSED) {
        console.log('ad closed');
        setLoaded(false);

        // reload ad
        interstitial.load();
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
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
