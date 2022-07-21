import { React, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput,
} from 'react-native';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
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
    height: '15%',
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
    marginLeft: '15%',
  },
});
const Stack = createStackNavigator();
export default function LoginPage({ navigation }) {
  const backendapi = '';
  const [userInfo, setUser] = useState({ username: '', password: '' });
  const SubmitData = async () => {
    /*   axios.post(backendapi, {
      username: userInfo.username,
      password: userInfo.password,
    }).then((response) => {
      console.log(response);
    }).catch((err) => { console.log(err); }); */
    navigation.navigate('Mainpage');
  };

  return (
    <View>
      <View style={styles.inputcontainer}>
        <Text style={styles.title}>Welcome back </Text>
        <TextInput
          onChangeText={setUser}
          value={userInfo.username}
          placeholder=" Username"
          style={styles.input}
        />
        <TextInput
          onChangeText={setUser}
          value={userInfo.username}
          secureTextEntry
          placeholder=" Password"
          style={styles.input}
        />
        <View>
          <TouchableOpacity onPress={SubmitData} style={styles.button}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Signup'); }}>
            <Text style={styles.text}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const style = StyleSheet.create({
  button: {},
  inputplace: {},
  inputfield: {},
});
