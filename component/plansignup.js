import { React, useState, useEffect } from 'react';
import {
  View, Modal, Text, TouchableOpacity,
} from 'react-native';

export default function PlanSignupPage(props) {
  const { showmodal, setModal, setPremium } = props;
  useEffect(() => {
  }, [showmodal]);
  if (showmodal) {
    return (
      <Modal>
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
      </Modal>
    );
  }
  return (
    <View />
  );
}
