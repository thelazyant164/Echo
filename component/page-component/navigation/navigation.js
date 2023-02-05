import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TouchableOpacity,
} from 'react-native';
import FeatureNavigation from '../feature-navigation/feature-navigation';
import { Files } from '../../pages/filesStoragePage/files';

const Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={FeatureNavigation}
        options={{
          tabBarLabel: 'Home',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerShown: false,
          headerStyle: {
            backgroundColor: '#D9D9D9',
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Files storage"
        component={Files}
        options={({ navigation, route }) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('Profile'); }}>
              <MaterialCommunityIcons name="account-circle-outline" size={40} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#D9D9D9',
          },
          tabBarLabel: 'Files storage',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="devices" color={color} size={size} />
          ),
        })}
      />

    </Tab.Navigator>

  );
}
