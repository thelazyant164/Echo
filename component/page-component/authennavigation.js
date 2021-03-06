import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation';
import LoginPage from '../login';
import SignupPage from '../signup';
import Profilepage from '../profile';

const Stack = createStackNavigator();
export default function AuthenticationNavigation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="Profile" component={Profilepage} />
        <Stack.Screen name="Mainpage" component={Navigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
