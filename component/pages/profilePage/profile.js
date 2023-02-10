import {
  React, useState, useEffect, useContext,
} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Platform, Alert,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import { Accesstoken } from '../../state/AccessTokencontext';
import LoadingEffect from '../../page-component/loading-effect/loading-effect';
import { Configuration } from '../../../configuration/configuration';

const styles = StyleSheet.create({
  information: {
    marginTop: 20,
    marginBottom: 5,
    width: '70%',
    borderRadius: 12,
    borderColor: 'gray',
    marginLeft: '15%',
    fontSize: 15,
  },
  inputcontainer: {
    marginTop: 50,
    borderRadius: 12,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',

  },
  button: {
    marginLeft: '15%',
    marginTop: '20%',
    width: '70%',
    height: '5%',
    borderRadius: 12,
    backgroundColor: 'rgb(37, 150, 190)',
  },
  text: {
    marginTop: '3%',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  icon: {
    marginTop: '4%',
    textAlign: 'center',
  },
});
export default function Profilepage({ navigation }) {
  const [name, setName] = useState('');
  const [id, setID] = useState('');
  const [Premium, setPremium] = useState(false);
  const [visible, setVisible] = useState(true);
  const accesstoken = useContext(Accesstoken);
  const backendapi = `${Configuration.backendAPI}/api/me`;
  const APIKeys = {
    apple: 'your_revenuecat_apple_api_key',
    google: 'goog_pqalQAnQyNnZFTaJCyXUvNnJHIZ',
  };
  const Payment = async () => {
    try {
      Purchases.setDebugLogsEnabled(true);
      if (Platform.OS === 'android') {
        Purchases.configure({ apiKey: APIKeys.google });
        try {
          const offerings = await Purchases.getOfferings();
          if (offerings.current !== null) {
            try {
              const purchaseMade = await Purchases
                .purchasePackage(offerings.current.availablePackages[1]);
              if (typeof purchaseMade.customerInfo.entitlements.active.my_entitlement_identifier !== 'undefined') {
                axios.post(`${backendapi
                }/api/me/${id}`, {
                  headers: { Authorization: `Bearer ${accesstoken}` },
                }).then((res) => {
                  Alert.alert('Upgrade plan successfully');
                }).catch((err) => {
                  Alert.alert('Invalid username or password');
                });
              }
            } catch (e) {
              if (!e.userCancelled) {
                console.log(e);
              }
            }

            // Display current offering with offerings.current
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        Purchases.configure({ apiKey: APIKeys.apple });
      }
    } catch (err) {
      Alert.alert(err);
    }
  };
  useEffect(() => {
    axios.get(backendapi, { headers: { Authorization: `Bearer ${accesstoken}` } })
      .then((response) => {
        setName(response.data.name);
        setID(response.data.id);
        setPremium(response.data.premium);
        setVisible(false);
      })
      .catch((err) => { console.warn(`Error:${err}`); setVisible(false); });
  }, [accesstoken]);
  return (
    <View style={styles.container}>
      <View>
        <MaterialCommunityIcon name="account-circle-outline" size={150} style={styles.icon} />
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.information}>
          Username:
          {' '}
          {name}
        </Text>
        <Text style={styles.information}>
          ID:
          {' '}
          {id}
        </Text>
        <TouchableOpacity onPress={() => { navigation.navigate('Login'); }} style={styles.button}>
          <Text style={styles.text}>Log out </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={!Premium ? () => { Payment(); } : null}
          disable={Premium}
          style={styles.button}
        >
          <Text style={styles.text}>Upgraded </Text>
        </TouchableOpacity>
      </View>
      {visible ? <LoadingEffect /> : <View />}
    </View>

  );
}
