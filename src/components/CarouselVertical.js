/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Text, Title } from 'react-native-paper';
import { getSimilarMovies } from '../api/movies';
import LottieView from 'lottie-react-native';
import { IMAGEPATH } from '../utils/constant.js';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarouselVertical(props) {
  const { id, navigation } = props;
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    getSimilarMovies(id).then((response) => {
      setMovies(response.results);
    });
  }, []);
  
  return movies ? (
    <Carousel
      layout={'default'}
      data={movies}
      renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  ) : (
    <View>
      <LottieView
        source={require('../assets/98432-loading.json')}
        autoPlay
        loop
      />
    </View>
  );
}

function RenderItem(props) {
  const { data, navigation } = props;
  const { id, title, poster_path } = data.item;
  const imgUrl = `${IMAGEPATH}${poster_path}`;
  const goMovie = () => {
    navigation.push('Details', { id });
  };
  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.card}>
        <Image style={styles.Image} source={{ uri: imgUrl }} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  Image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
});
