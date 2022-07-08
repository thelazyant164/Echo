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

export default function Timer(props) {
  const { start } = props;
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const Increment = () => {
    if (second < 60) {
      setSecond(second + 1);
    } else {
      setSecond(0);
      if (minute < 60) {
        setMinute(minute + 1);
      } else {
        setMinute(0);
        if (hour < 24) {
          setHour(hour + 1);
        } else {
          setSecond(0);
          setMinute(0);
          setHour(0);
        }
      }
    }
  };
  const StartTimer = () => {
    setInterval(Increment, 1000);
  };

  if (start === true) {
    StartTimer();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{`${hour.toString()}:${minute.toString()}:${second.toString()}`}</Text>
    </View>
  );
}
