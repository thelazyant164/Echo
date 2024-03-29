import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';

const style = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: 40,
    marginLeft: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#D9D9D9',
    height: 100,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  accountbutton: {
    marginTop: 40,
    marginRight: 20,
  },
});

export function Header({ navigation }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {

  }, [visible]);
  return (
    <View style={style.container}>
      <Text style={style.title}>Echo</Text>
      <TouchableOpacity style={style.accountbutton} onPress={() => { navigation.navigate('Profile'); }}>
        <MaterialCommunityIcon name="account-circle-outline" size={40} />
      </TouchableOpacity>
    </View>

  );
}
