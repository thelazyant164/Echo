import { React, useState } from 'react';
import {
  Platform,
  StyleSheet, Text, View, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import axios from 'axios';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import { useSelector, useDispatch } from 'react-redux';
import { Configuration } from '../../../configuration/configuration';

const APIKeys = {
  apple: 'your_revenuecat_apple_api_key',
  google: 'your_revenuecat_google_api_key',
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
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
  modal: {
    width: '100%',
    height: '100%',
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
export default function SignupPage({ route, navigation }) {
  const backendapi = `${Configuration.backendAPI}/management/users`;
  const { premium } = route.params;

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [currentOffering, setCurrentOffering] = useState(null);
  const dispatch = useDispatch();

  const Payment = async () => {
    const offerings = await Purchases.getOfferings();
    setCurrentOffering(offerings);
    Purchases.setDebugLogsEnabled(true);
    if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: APIKeys.google });
    } else {
      Purchases.configure({ apiKey: APIKeys.apple });
    }
  };

  const SubmitData = async () => {
    if (confirmpassword === password && username !== '' && password !== null) {
      if (premium === false) {
        axios.post(backendapi, {
          name,
          username,
          password,
          premium,
        }).then((response) => {
          navigation.navigate('Login');
        }).catch((err) => { Alert.alert('Sign up failed'); });
      } else {
        Payment().then((res) => {
          axios.post(backendapi, {
            name,
            username,
            password,
            premium,
          }).then((response) => {
            navigation.navigate('Login');
          }).catch((err) => { Alert.alert('Sign up failed'); });
        }).catch((err) => { Alert.alert('Sign up failed'); });
      }
    } else {
      Alert.alert('Your password and confirmation are not match');
    }
  };
  return (
    <View style={styles.inputcontainer}>
      <Text style={styles.title}>Sign up </Text>
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
        <TouchableOpacity onPress={() => { SubmitData(); }} style={styles.button}>
          <Text style={styles.text}>Finish</Text>
        </TouchableOpacity>
      </View>
      {/* <PlanSignupPage
        showmodal={showmodal}
        style={styles.modal}
      /> */}
    </View>
  );
}
