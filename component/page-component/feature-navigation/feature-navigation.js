import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Homepage } from '../../pages/homePage/home-page';
import { RecordPage } from '../../pages/recordPage/record';
import { VolumeAdjustPage } from '../../pages/volumeAdjust/volume-adjust';
import { NoisecancellingPage } from '../../pages/noiseCancellingPage/noise-cancelling';
import { SpeechToTextPage } from '../../pages/speechToTextPage/speech-to-text';
import { NormalizationPage } from '../../pages/normalizationPage/normalization';
import { SilencePage } from '../../pages/silencePage/silence';

const Stack = createStackNavigator();
export default function FeatureNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Homepage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        key="Volume adjust"
        name="Volume adjust"
        component={VolumeAdjustPage}
      />
      <Stack.Screen
        key="Noise cancelling"
        name="Noise cancelling"
        component={NoisecancellingPage}
      />
      <Stack.Screen
        key="Speech to text"
        name="Speech to text"
        component={SpeechToTextPage}
      />
      <Stack.Screen
        key="Noise reduction record"
        name="Noise reduction record"
        component={RecordPage}
      />
      <Stack.Screen
        key="Normalization"
        name="Normalization"
        component={NormalizationPage}
      />
      <Stack.Screen
        key="Silence"
        name="Silence"
        component={SilencePage}
      />
    </Stack.Navigator>
  );
}
