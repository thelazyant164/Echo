import React from 'react';
import {
  View, Text, StyleSheet, Pressable,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export const SLIDER_WIDTH = 500;
export const SLIDER_HEIGHT = 1000;
export const ITEM_WIDTH = 350;
export const ITEM_HEIGHT = 900;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingBottom: 40,
    marginBottom: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  innercontainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  price: {
    fontSize: 32,
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonOpen: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    width: '60%',
  },
});
function CarouselCardItem({
  item, index, navigation,
}) {
  if (index % 2 === 0) {
    return (
      <View style={styles.container} key={index}>
        <View style={styles.innercontainer}>
          <Text style={styles.header}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <View style={{ marginTop: '10%', marginBottom: '10%' }}>
          <FlatList
            data={item.data}
            renderItem={(i) => (
              <View style={{ marginTop: '10%', marginBottom: '10%' }}>
                <Text style={styles.body}>{`✓ ${i.item}`}</Text>
              </View>
            )}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              navigation.navigate('Signup', { premium: false });
            }}
          >
            <Text style={styles.body}>Get started</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.container, { backgroundColor: '#040720' }]} key={index}>
      <View style={styles.innercontainer}>
        <Text style={[styles.header, { color: 'white' }]}>{item.title}</Text>
        <Text style={[styles.price, { color: 'white' }]}>{item.price}</Text>
      </View>
      <View style={{ marginTop: '10%', marginBottom: '10%' }}>
        <FlatList
          data={item.data}
          renderItem={(i) => (
            <View style={{ marginTop: '10%', marginBottom: '10%' }}>
              <Text style={[styles.body, { color: 'white' }]}>{`✓ ${i.item}`}</Text>
            </View>
          )}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            navigation.navigate('Signup', { premium: false });
          }}
        >
          <Text style={[styles.body, { color: 'white' }]}>Get started</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default CarouselCardItem;
