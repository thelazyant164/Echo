import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
export default function LoadingEffect(props) {
  return (
    <AnimatedLoader
      visible
      overlayColor="rgba(255,255,255,0.75)"
      // eslint-disable-next-line global-require
      source={require('../../../assets/97203-loader.json')}
      animationStyle={styles.lottie}
      speed={1}
    />
  );
}
