import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatureNavigation from '../feature-navigation';
import { Files } from '../../files';

const Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={FeatureNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Files storage"
        component={Files}
        options={{
          headerShown: false,
          tabBarLabel: 'Files storage',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="devices" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>

  );
}
