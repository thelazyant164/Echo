import {
  React, useState, useEffect, useContext,
} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Model,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Accesstoken } from './state/AccessTokencontext';
import LoadingEffect from './page-component/loadingeffect';
import axiosInstance from './service/axios';

const styles = StyleSheet.create({
  information: {
    marginTop: 20,
    marginBottom: 5,
    width: '70%',
    borderRadius: 12,
    borderColor: 'gray',
    marginLeft: '15%',
    fontSize: 15,
  },
  inputcontainer: {
    marginTop: 50,
    borderRadius: 12,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',

  },
  button: {
    marginLeft: '15%',
    marginTop: '20%',
    width: '70%',
    height: '5%',
    borderRadius: 12,
    backgroundColor: 'rgb(37, 150, 190)',
  },
  text: {
    marginTop: '3%',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  icon: {
    marginTop: '4%',
    textAlign: 'center',
  },
});
export default function Profilepage({ navigation }) {
  const [name, setName] = useState('');
  const [id, setID] = useState('');
  const [Premium, setPremium] = useState(false);
  const [visible, setVisible] = useState(true);
  const accesstoken = useContext(Accesstoken);
  const backendapi = 'api/me';
  useEffect(() => {
    console.log(accesstoken);
    axiosInstance.get('backendapi', { headers: { Authorization: `Bearer ${accesstoken}` } })
      .then((response) => {
        setName(response.data.name);
        setID(response.data.id);
        setPremium(response.data.premium);
        setVisible(false);
      })
      .catch((err) => { console.log(`Error:${err}`); setVisible(false); });
  }, [accesstoken]);
  return (
    <View style={styles.container}>
      <View>
        <MaterialCommunityIcon name="account-circle-outline" size={150} style={styles.icon} />
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.information}>
          Username:
          {' '}
          {name}
        </Text>
        <Text style={styles.information}>
          ID:
          {' '}
          {id}
        </Text>
        <TouchableOpacity onPress={() => { navigation.navigate('Login'); }} style={styles.button}>
          <Text style={styles.text}>Log out </Text>
        </TouchableOpacity>
      </View>
      <LoadingEffect visible={visible} />
    </View>

  );
}
