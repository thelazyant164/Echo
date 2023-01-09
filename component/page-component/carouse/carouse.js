import { React, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector, useDispatch } from 'react-redux';
import CarouselCardItem, {
  SLIDER_WIDTH, ITEM_WIDTH, ITEM_HEIGHT, SLIDER_HEIGHT,
} from '../carouse-card/carouse-card';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    flex: 1,
  },
  CarouselContainer: {
    alignItems: 'center',
  },
});
const data = [
  {
    title: 'Lite',
    price: 'Free',
    data: ['Access to all features', '3GB of storage', 'Limited files processing'],
  },
  {
    title: 'Pro',
    price: '10$',
    data: ['Unlimited storage', 'Advertisement-Free', 'Unlimited files processing'],
  },
];

export default function CarouselCards({ navigation }) {
  const [i, setIndex] = useState(0);
  const isCarousel = useRef(null);
  return (
    <View style={styles.container}>
      <View style={styles.CarouselContainer}>
        <Carousel
          layout="default"
          ref={isCarousel}
          data={data}
          // eslint-disable-next-line max-len
          onSnapToItem={(index) => setIndex(index)}
          renderItem={({ index, item }) => CarouselCardItem({ index, item, navigation })}
          sliderWidth={SLIDER_WIDTH}
          sliderHeight={SLIDER_HEIGHT}
          itemWidth={ITEM_WIDTH}
          itemHeight={ITEM_HEIGHT}
          useScrollView
        />
      </View>
      <Pagination
        dotsLength={data.length}
        activeDotIndex={i}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots
      />
    </View>
  );
}
