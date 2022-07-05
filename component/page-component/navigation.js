import React from 'react';
import { Files } from '../files';
import { Homepage } from '../homepage';
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
      component={Homepage}        
      options={{
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