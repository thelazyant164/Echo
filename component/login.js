import { React, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput,
} from 'react-native';
import axios from 'axios';

export default function LoginPage(props) {
  const backendapi = '';
  const [userInfo, setUser] = useState({ username: '', password: '' });
  const SubmitData = async () => {
    axios.post(backendapi, {
      username: userInfo.username,
      password: userInfo.password,
    }).then((response) => { console.log(response); }).catch((err) => { console.log(err); });
  };

  return (
    <View>
      <View>
        <TextInput
          onChangeText={setUser}
          value={userInfo.usernamwe}
          placeholder=" Username"
        />
        <TextInput
          onChangeText={setUser}
          value={userInfo.usernamwe}
          placeholder=" Password"
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
