import { React, useState, useEffect } from 'react';
import {
  View, Modal, Text, TouchableOpacity, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    marginTop: '30%',
  },
  innercontainer: {
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
});
export default function PlanSignupPage(props) {
  const { showmodal, setModal, setPremium } = props;
  useEffect(() => {
  }, [showmodal]);
  if (showmodal) {
    return (
      <Modal>
        <View style={styles.container}>
          <Text style={styles.title}>Choose your plan</Text>
          <View style={styles.innercontainer}>
            <View>
              <TouchableOpacity onPress={() => { setPremium(false); setModal(false); }}>
                <Text> Free</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => { setPremium(true); setModal(false); }}>
                <Text> Premium</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <View />
  );
}
