import { React, useState } from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';

export function Filebutton(props) {
  const { type, name } = props;
  return (
    <View>
      <Text>{name}</Text>
      <Image />
    </View>
  );
}

const style = StyleSheet.create({

});
