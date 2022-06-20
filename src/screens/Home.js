/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, Alert, BackHandler} from 'react-native';
import {Button, Card, Paragraph, Text} from 'react-native-paper';
import {getPopularMovies} from '../api/movies';
import { map } from 'lodash';
import {IMAGEPATH} from '../utils/constant';
import NOIMAGE from '../assets/default-imgage.png';
import {Rating} from 'react-native-ratings';
import starDark from '../assets/starDark.png';
import LottieView from 'lottie-react-native';

export default function Home(props) {
  const {navigation} = props;
    const [movies, setMovies] = useState(null);
    const [showBtnMore, setShowBtnMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
      navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      Alert.alert(
        'Are you sure?',
        'Do you want to exit?',
        [
          { text: "Cancel", style: 'cancel', onPress: () => {} },
          {
            text: 'Close',
            style: 'destructive',
            onPress: () => (BackHandler.exitApp()),
          },
        ]
      );
      });
    }, [navigation]);



    useEffect(() => {
      getPopularMovies(page).then(response =>{
        const totalPages = response.total_pages;
        if (page < totalPages){
          if (!movies){
            setMovies(response.results);
          } else {
            setMovies([...movies, ...response.results]);
          }
        } else {
          setShowBtnMore(false);
        }
       });
       
    }, [page]);

    return (
     movies ? (
      <View>
      <ScrollView >

            {map(movies, (movie, index) =>(
              <Movie key={index} movie={movie} navigation={navigation}/>
              ))}
            {showBtnMore && (
              <Button mode="contained"
              contentStyle={styles.loadMoreContainer}
              style={styles.loadMore}
              labelStyle={{color: '#fff'}}
              onPress={() => {
                setPage(page + 1);
              }}
              >
                Load More
            </Button>)}
      </ScrollView>
  </View>
      ) : (
        <LottieView source={require('../assets/98432-loading.json')} autoPlay loop />
      )
  );

}
function Movie(props){
  const {movie,navigation} = props;
  const {id,poster_path, title, release_date,overview, vote_count, vote_average} = movie;

  const goMovie = () => {
    navigation.navigate('Details', {id});
  };
  return (
    <TouchableWithoutFeedback onPress={goMovie}>
    <Card style={styles.movies} mode="Contained">
    <Card.Title title={title}/>
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
   loadMoreContainer:{
    paddingTop: 10,
    paddingBottom: 30,
   },
   loadMore:{
    backgroundColor: 'transparent',
   },
});
