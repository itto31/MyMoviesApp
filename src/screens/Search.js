/* eslint-disable prettier/prettier */
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Title } from 'react-native-paper';
import { getSearchMovie } from '../api/movies';
import { Searchbar } from 'react-native-paper';
import { size, map } from 'lodash';
import { IMAGEPATH } from '../utils/constant';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

export default function Search(props) {
  const { navigation,route } = props;
  const { Search } = route.params;
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState(null);
  const [title, setTitle] = useState(null);

    useEffect(() => {
      if (Search) {
        setSearch(Search);
        setTitle(Search);
      }
    }, [Search]);
  useEffect(() => {
    if (size(search) > 2) {
      setTitle(search);
      getSearchMovie(search).then((response) => {
        setMovies(response.results.sort((a, b) => b.popularity - a.popularity));
      });
    }
  }, [search]);

  return (
    movies ? (
      <SafeAreaView>
      <Searchbar
        placeholder="Search"
        style={styles.input}
        onChangeText={(e) => setSearch(e)}
        value={search}
        />
      <ScrollView>
        <Title style={styles.title}>{title}</Title>
        <View style={styles.container}>
          {map(movies, (movie, index) => (
            <Movie key={index} movie={movie} navigation={navigation} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <LottieView source={require('../assets/98432-loading.json')} autoPlay loop />
  )
  );
}

function Movie(props) {
  const { movie, navigation } = props;
  const { poster_path, title, id } = movie;

  const goMovie = () => {
    navigation.navigate('Details', { id });
  };
  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image
            style={styles.image}
            source={{ uri: `${IMAGEPATH}/${poster_path}` }}
          />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 3,
    backgroundColor: '#15212b',
  },
  container: {
    borderTopWidth: 5,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title:{
    marginTop:20,
    marginBottom:10,
    color:'#fff',
    fontSize: 30,
    textAlign: 'center',
  },
});
