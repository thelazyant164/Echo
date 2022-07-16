import { React, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import axios from 'axios';

export default function LoginPage(props) {
  const backendapi = '';
  const [userInfo, setUser] = useState({ username: '', password: '', confirmpassword: '' });
  const SubmitData = async () => {
    if (userInfo.confirmpassword === userInfo.password && userInfo.username !== '' && userInfo.password !== null) {
      axios.post(backendapi, {
        username: userInfo.username,
        password: userInfo.password,
      }).then((response) => { console.log(response); }).catch((err) => { console.log(err); });
    } else {
      Alert.alert('Your passworfd and confirmation are not match');
    }
  };

  return (
    <View>
      <View>
        <TextInput
          onChangeText={setUser}
          value={userInfo.username}
          placeholder=" Username"
        />
        <TextInput
          onChangeText={setUser}
          value={userInfo.password}
          placeholder=" Password"
        />
        <TextInput
          onChangeText={setUser}
          value={userInfo.confirmpassword}
          placeholder="Re-enter your password"
        />
      </View>
      <View>
        <TouchableOpacity>
          <Text>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={SubmitData}>
          <Text>Log in</Text>
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
