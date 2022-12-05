import { React, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import PlanSignupPage from './plansignup';
import axiosInstance from './service/axios';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    width: '70%',
    height: 50,
    borderRadius: 12,
    borderColor: 'gray',
    textAlign: 'center',
    marginLeft: '15%',
  },
  inputcontainer: {
    justifyContent: 'center',
    borderRadius: 12,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',

  },
  button: {
    marginLeft: '15%',
    marginTop: '10%',
    width: '70%',
    height: 60,
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
  const backendapi = 'management/users';
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [premium, setPremium] = useState(null);
  const [showmodal, setModal] = useState(true);
  const SubmitData = async () => {
    if (confirmpassword === password && username !== '' && password !== null) {
      axiosInstance.post(backendapi, {
        name,
        username,
        password,
        premium,
      }).then((response) => { console.log(response); }).catch((err) => { console.log(err); });
      navigation.navigate('Login');
    } else {
      Alert.alert('Your passworfd and confirmation are not match');
    }
  };
  return (

    <View style={styles.inputcontainer}>
      <TextInput
        onChangeText={setName}
        value={name}
        placeholder=" Name"
        style={styles.input}
      />
      <TextInput
        onChangeText={setUsername}
        value={username}
        placeholder=" Username"
        style={styles.input}
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder=" Password"
        style={styles.input}
      />
      <TextInput
        onChangeText={setConfirmPassword}
        value={confirmpassword}
        placeholder="Re-enter your password"
        style={styles.input}
      />
      <View>
        {premium === null
          ? (
            <TouchableOpacity onPress={() => { setModal(!showmodal); }} style={styles.button}>
              <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity onPress={SubmitData} style={styles.button}>
              <Text style={styles.text}>Sign up</Text>
            </TouchableOpacity>
          )}

      </View>
      <PlanSignupPage showmodal={showmodal} setModal={setModal} setPremium={setPremium} />
    </View>
  );
}
