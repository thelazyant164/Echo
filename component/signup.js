import { React, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import axios from 'axios';

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
    height: '25%',
    borderRadius: 12,
    backgroundColor: 'rgb(37, 150, 190)',
  },
  text: {
    marginTop: '5%',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
});
export default function SignupPage({ navigation }) {
  const backendapi = '';
  const [userInfo, setUser] = useState({ username: '', password: '', confirmpassword: '' });
  const SubmitData = async () => {
    if (userInfo.confirmpassword === userInfo.password && userInfo.username !== '' && userInfo.password !== null) {
      /*  axios.post(backendapi, {
        username: userInfo.username,
        password: userInfo.password,
      }).then((response) => { console.log(response); }).catch((err) => { console.log(err); }); */
      navigation.navigate('Login');
    } else {
      Alert.alert('Your passworfd and confirmation are not match');
    }
  };
  return (

    <View style={styles.inputcontainer}>
      <TextInput
        onChangeText={setUser}
        value={userInfo.username}
        placeholder=" Username"
        style={styles.input}
      />
      <TextInput
        onChangeText={setUser}
        value={userInfo.password}
        placeholder=" Password"
        style={styles.input}
      />
      <TextInput
        onChangeText={setUser}
        value={userInfo.confirmpassword}
        placeholder="Re-enter your password"
        style={styles.input}
      />
      <View>
        <TouchableOpacity onPress={SubmitData} style={styles.button}>
          <Text style={styles.text}>Sign up</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const style = StyleSheet.create({
  button: {},
  inputplace: {},
  inputfield: {},
});
