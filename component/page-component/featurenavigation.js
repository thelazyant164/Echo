import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Homepage } from '../homepage';
import { RecordPage } from '../record';
import { VolumeAdjustPage } from '../volume-adjust';
import { NoisecancellingPage } from '../noisecancelling';
import { SpeechToTextPage } from '../speech-to-text';

const Stack = createStackNavigator();
export default function FeatureNavigation() {
  const allfeature = ['Noise cancelling', 'Volume adjust', 'Speech to text', 'Noise reduction record'];
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Homepage}
        options={{ headerShown: false }}
      />
      {allfeature.map((feature) => (
        <Stack.Screen
          name={feature}
          component={() => {
            if (feature === 'Noise cancelling') {
              return (
                <NoisecancellingPage />
              );
            }
            if (feature === 'Volume adjust') {
              return (
                <VolumeAdjustPage />
              );
            }
            if (feature === 'Speech to text') {
              return (
                <SpeechToTextPage />
              );
            }
            if (feature === 'Noise reduction record') {
              return (
                <RecordPage />
              );
            }
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
