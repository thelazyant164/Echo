import { now } from 'lodash';
import { React, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  content: {
    fontSize: 30,
  },
});
let interval;
export default function Timer(props) {
  const { recording, isPause } = props;
  const starttime = new Date().getTime();
  const [counter, setCounter] = useState(new Date().getTime() - starttime);
  useEffect(() => {
    if (recording) {
      const newinterval = setInterval(() => {
        if (!isPause) {
          setCounter(new Date().getTime() - starttime);
        }
      }, 1000);
      interval = newinterval;
    }
    return () => clearInterval(interval);
  }, [recording]);
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{`${Math.floor((counter % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}:${Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60))}:${Math.floor((counter % (1000 * 60)) / 1000)}`}</Text>
    </View>
  );
}
