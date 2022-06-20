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
import { Card, Paragraph, Text, Title } from 'react-native-paper';
import { getSearchMovie } from '../api/movies';
import { Searchbar } from 'react-native-paper';
import { size, map } from 'lodash';
import { IMAGEPATH } from '../utils/constant';
import LottieView from 'lottie-react-native';
import NOIMAGE from '../assets/default-imgage.png';
import { Rating } from 'react-native-ratings';
import starDark from '../assets/starDark.png';

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
        <View>
          <Text style={styles.title}>{title}</Text>
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
  const { poster_path, title, id,release_date,overview,vote_count,vote_average } = movie;

  const goMovie = () => {
    navigation.navigate('Details', { id });
  };
  return (
    <TouchableWithoutFeedback onPress={goMovie}>
       <Card style={styles.movies} mode="Contained">
       <Card.Title title={title} />
       <Card.Content>
       <Card.Cover style={styles.image} source={poster_path ? {
          uri: `${IMAGEPATH}${poster_path}`,
        } : NOIMAGE } />
      <View >
      <Text style={styles.release}>{release_date}</Text>
      <Paragraph style={styles.overview}>{overview}</Paragraph>
        <MovieRating vote_count={vote_count} vote_average={vote_average}/>
      </View>
      </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );
}

function MovieRating(props){
  const {vote_average} = props;
  const media = vote_average / 2;
  return (
    <View style={styles.viewRating}>
      <Rating type="custom"
      ratingImage={starDark}
      ratingColor="#ffc205"
      ratingBackgroundColor="#192734"
      startingValue={media}
      imageSize={20}
      style={{marginRight: 15}}
      />
       <Text style={{fontSize:16, marginRight:5}}>{media}</Text>
    </View>
  );
  }

const styles = StyleSheet.create({
  input: {
    marginTop: 3,
    backgroundColor: '#15212b',
  },
  movies:{
    backgroundColor: '#192734',
    borderBottomWidth:2,
  },
   image:{
   borderRadius: 10,
   },release:{
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
   },
   overview:{
    marginTop:5,
    color:'#8697a5',
    fontSize: 15,
   },
   viewRating:{
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
   },
  title:{
    marginTop:20,
    marginBottom:10,
    color:'#fff',
    fontSize: 30,
    textAlign: 'center',
    borderBottomWidth:2,
    borderBottomColor: '#8697a5',
  },
});
