import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList,
} from 'react-native';
import { Featurebutton } from '../../page-component/feature-button/feature-button';
import { Header } from '../../page-component/header/header';
import { getCached, saveCached } from '../../utils/cacheHelper';

const style = StyleSheet.create({
  feature_container: {
    marginTop: 70,
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    borderRadius: 12,
    marginTop: 30,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export function Homepage({ navigation }) {
  const [data, setData] = useState(['Noise cancelling', 'Volume adjust']);
  const allfeature = ['Noise cancelling', 'Volume adjust', 'Speech to text', 'Normalization', 'Noise reduction record', 'Silence'];

  const getRecentFeature = async () => {
    const result = await getCached();
    setData(result);
  };

  const saveRecentFeature = async (features) => {
    saveCached(features);
  };
  useEffect(() => {
    saveRecentFeature(data);
    getRecentFeature();
  }, []);
  return (
    <View>
      <Header navigation={navigation} />
      <View style={{ marginTop: 60 }}>

        <Text style={{ textAlign: 'center', fontSize: 20 }}>Home</Text>
        <View style={style.feature_container}>
          <Text>Recently</Text>
          <View style={style.container}>
            <FlatList
              numColumns={4}
              data={data}
              renderItem={
                ({ item, key }) => (
                  <Featurebutton feature={item} navigation={navigation} />
                )
              }
            />
          </View>
        </View>

        <View style={style.feature_container}>
          <Text>Features</Text>
          <View style={style.container}>
            <FlatList
              numColumns={4}
              data={allfeature}
              renderItem={
                ({ item, key }) => (
                  <Featurebutton feature={item} navigation={navigation} />
                )
              }
            />
          </View>

        </View>
      </View>
    </View>
  );
}
