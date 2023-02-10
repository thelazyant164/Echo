import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TouchableOpacity,
} from 'react-native';
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
        name="Home Screen"
        component={Homepage}
        options={({ navigation, route }) => ({
          headerLeft: () => null,
          headerTitle: 'Home',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('Profile'); }}>
              <MaterialCommunityIcons name="account-circle-outline" size={40} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#D9D9D9',
          },
        })}
      />
      <Stack.Screen
        key="Volume adjust"
        name="Volume adjust"
        component={VolumeAdjustPage}
        options={{
          headerStyle: {
            backgroundColor: '#D9D9D9',
          },
        }}
      />
      <Stack.Screen
        key="Noise cancelling"
        name="Noise cancelling"
        component={NoisecancellingPage}
        options={{
          headerStyle: {
            backgroundColor: '#D9D9D9',
          },
        }}
      />
      <Stack.Screen
        key="Speech to text"
        name="Speech to text"
        component={SpeechToTextPage}
        options={{
          headerStyle: {
            backgroundColor: '#D9D9D9',
          },
        }}
      />
      <Stack.Screen
        key="Noise reduction record"
        name="Noise reduction record"
        component={RecordPage}
        options={{
          headerStyle: {
            backgroundColor: '#D9D9D9',
          },
        }}
      />
      <Stack.Screen
        key="Normalization"
        name="Normalization"
        component={NormalizationPage}
        options={{
          headerStyle: {
            backgroundColor: '#D9D9D9',
          },
        }}
      />
      <Stack.Screen
        key="Silence"
        name="Silence"
        component={SilencePage}
        options={{
          headerStyle: {
            backgroundColor: '#D9D9D9',
          },
        }}
      />
    </Stack.Navigator>
  );
}
