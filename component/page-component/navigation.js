import React from 'react';
import { Files } from '../files';
import {Header} from './header'
import {View} from 'react-native';
import FeatureNavigation from './featurenavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const  Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
  
   
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen 
      
      name="Home" 
      component={FeatureNavigation}        
      options={{
          headerShown: false,
          tabBarLabel: 'Home',
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
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="devices" color={color} size={size} />
        ),
      }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}