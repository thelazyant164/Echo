import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, Model,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

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

  useEffect(() => {
    axios.get('http://100.90.250.177:3001/api/me', { Authorization: 'Bearer' })
      .then((response) => { setName(response.name); })
      .catch((err) => { console.log(err); });
  }, []);
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
    </View>

  );
}
