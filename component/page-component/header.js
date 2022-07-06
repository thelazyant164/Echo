import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const style = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: 10,
    marginLeft: 20,
    justifyContent: 'center',

  },
  container: {
    backgroundColor: '#D9D9D9',
    height: 60,
  },
});

export function Header() {
  return (
    <View style={style.container}>
      <Text style={style.title}>Echo</Text>
    </View>
  );
}
