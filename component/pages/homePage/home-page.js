import { React, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList,
} from 'react-native';
import { Featurebutton } from '../../page-component/feature-button/feature-button';
import { Header } from '../../page-component/header/header';
import { getCached, saveCached } from '../../utils/cacheHelper';
import BannerAds from '../../page-component/advertisement/BannerAds';
import InterstitialAds from '../../page-component/advertisement/InterstitialAds';

const style = StyleSheet.create({
  feature_container: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    borderRadius: 12,
    marginTop: 20,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export function Homepage({ navigation }) {
  const [data, setData] = useState(['Noise cancelling']);
  const allfeature = ['Noise cancelling', 'Speech to text', 'Normalization', 'Noise reduction record', 'Silence'];

  const getRecentFeature = async () => {
    const result = await getCached();
    setData(result);
  };

  useEffect(() => {
    getRecentFeature();
  }, []);

  return (
    <View>
      <BannerAds />
      {/* <InterstitialAds /> */}
      <View style={{ marginTop: 60 }}>
        <View style={style.feature_container}>
          <Text>Recently</Text>
          <View style={style.container}>
            <FlatList
              numColumns={4}
              data={data}
              renderItem={
                ({ item, key }) => (
                  <Featurebutton feature={item} navigation={navigation} setData={setData} />
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
                  <Featurebutton feature={item} navigation={navigation} setData={setData} />
                )
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}
