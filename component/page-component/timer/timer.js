import { now } from 'lodash';
import { React, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useInterval } from 'usehooks-ts';
import { useSelector, useDispatch } from 'react-redux';

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
  const { state } = props;
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
    if (state === 'stop') { setCounter(0); } else if (state === 'play') {
      setCounter(counter + 1);
    }
  }, [state]);

  return (
    <View style={styles.container}>
      <Text style={styles.content}>{`${Math.floor((counter % (60 * 60 * 24)) / (60 * 60))}:${Math.floor((counter % (60 * 60)) / (60))}:${Math.floor((counter % 60))}`}</Text>
    </View>
  );
}
