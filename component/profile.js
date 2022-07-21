import React from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, Model,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Profilepage(props) {
  return (
    <Model>
      <View>
        <MaterialCommunityIcon name="account-circle-outline" />
      </View>
      <View>
        <Text>Username: account@gmail.com</Text>
        <Text>Password: ***********</Text>
      </View>
    </Model>
  );
}
