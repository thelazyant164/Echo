import { now } from 'lodash';
import { React, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useInterval } from 'usehooks-ts';

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  content: {
    fontSize: 30,
  },
});
//
export default function Timer(props) {
  const { recording, isPause, reset } = props;
  const [counter, setCounter] = useState(0);
  /* useEffect(() => {
    if (recording && isPause) {
      const newinterval = setInterval(() => {
        if (!isPause) {
          setCounter(new Date().getTime() - starttime);
        }
      }, 1000);
      interval = newinterval;
    }
    return () => clearInterval(interval);
  }, [isPause]); */
  useEffect(() => {
    setCounter(0);
  }, [reset]);
  useInterval(() => {
    setCounter(counter + 1);
  }, isPause ? null : 1000);

  return (
    <View style={styles.container}>
      <Text style={styles.content}>{`${Math.floor((counter % (60 * 60 * 24)) / (60 * 60))}:${Math.floor((counter % (60 * 60)) / (60))}:${Math.floor((counter % 60))}`}</Text>
    </View>
  );
}
