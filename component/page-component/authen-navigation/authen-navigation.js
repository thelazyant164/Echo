import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from '../navigation/navigation';
import LoginPage from '../../pages/loginPage/login';
import SignupPage from '../../pages/signupPage/sign-up';
import Profilepage from '../../pages/profilePage/profile';
import PlanSignupPage from '../../pages/planSignUpPage/plan-signup';

const Stack = createStackNavigator();
export default function AuthenticationNavigation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Pricing" component={PlanSignupPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="Profile" component={Profilepage} />
        <Stack.Screen name="Mainpage" component={Navigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
