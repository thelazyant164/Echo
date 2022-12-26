import {
  React, useState, useContext, useEffect,
} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
// import * as AppAuth from 'expo-app-auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Google from 'expo-auth-session/providers/google';
import { SetAccesstoken } from './state/AccessTokencontext';
import LoadingEffect from './page-component/loading-effect';
import { Configuration } from '../configuration/configuration';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    width: '70%',
    height: '8%',
    borderRadius: 12,
    borderColor: 'gray',
    textAlign: 'center',
    marginLeft: '15%',
  },
  inputcontainer: {

    borderRadius: 12,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',

  },
  button: {
    marginLeft: '15%',
    marginTop: '10%',
    width: '70%',
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgb(37, 150, 190)',
  },
  text: {
    marginTop: '3%',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
});
const Stack = createStackNavigator();
export default function LoginPage({ navigation }) {
  const setAccessToken = useContext(SetAccesstoken);
  const backendapi = `${Configuration.backendAPI}/login`;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Configuration.appKey.expoClientId,
    // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: Configuration.appKey.androidClientId,
    // webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
    }
  }, [response]);

  const SubmitData = async () => {
    setVisible(true);
    axios.post(backendapi, {
      username,
      password,
    }).then((res) => {
      setVisible(false);
      setAccessToken(res.data.token);
      navigation.navigate('Mainpage');
    }).catch((err) => {
      setVisible(false);
      Alert.alert('Invalid username or password');
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      style={styles.container}
    >
      <View>
        <View style={styles.inputcontainer}>
          <Text style={styles.title}>Welcome back </Text>
          <TextInput
            onChangeText={setUsername}
            value={username}
            placeholder=" Username"
            style={styles.input}
          />
          <TextInput
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder=" Password"
            style={styles.input}
          />
          <View>
            <TouchableOpacity onPress={SubmitData} style={styles.button}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('PlanSignup'); }}>
              <Text style={styles.text}>Sign up</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', marginTop: '10%' }}>OR</Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'black' }]}
              onPress={async () => {
                const result = await promptAsync();
                if (result.authentication.accessToken) {
                  navigation.navigate('Mainpage');
                  setAccessToken(result.authentication.accessToken);
                }
              }}
            >
              <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'center' }}>
                <AntDesign name="google" size={28} style={{ color: 'white', marginTop: '3%', marginRight: '4%' }} />
                <Text style={styles.text}>Google Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      { visible ? <LoadingEffect /> : <View />}
    </KeyboardAvoidingView>
  );
}
