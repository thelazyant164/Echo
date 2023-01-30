import React, { useState } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

// importing library to use Stopwatch and Timer
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import StopWatch from 'react-native-stopwatch-timer/lib/stopwatch';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});

const options = {
  container: {
    backgroundColor: 'rgb(37, 150, 190)',
    padding: 5,
    borderRadius: 5,
    width: 200,
    height: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};

export default function CustomTimer(props) {
  const { state } = props;
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.sectionStyle}>
          <Stopwatch
            laps
            msecs
            // Time Duration
            start={state === 'play'}
            // To start
            reset={state === 'stop'}
            // To reset
            options={options}
            // options for the styling
            // can call a function On finish of the time
            getTime={(time) => {

            }}
          />
        </View>
      </View>
    </View>
  );
}
