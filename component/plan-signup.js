import {
  React, useState,
} from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import CarouselCards from './page-component/carouse';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: '10%',
    marginBottom: '30%',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default function PlanSignupPage({ navigation }) {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Choose your plan</Text>
        <CarouselCards navigation={navigation} />
      </View>
    </View>

  );
}
