import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Homepage } from '../home-page';
import { RecordPage } from '../record';
import { VolumeAdjustPage } from '../volume-adjust';
import { NoisecancellingPage } from '../noise-cancelling';
import { SpeechToTextPage } from '../speech-to-text';
import { NormalizationPage } from '../normalization';
import { SilencePage } from '../silence';

const Stack = createStackNavigator();
export default function FeatureNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
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
