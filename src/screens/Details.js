/* eslint-disable prettier/prettier */
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMovieById } from '../api/movies';
import { IMAGEPATH } from '../utils/constant.js';
import { Title,Text } from 'react-native-paper';
import {map} from 'lodash';
import {Rating} from "react-native-ratings";
import starDark from '../assets/starDark.png';
import LottieView from 'lottie-react-native';
import CarouselVertical from '../components/CarouselVertical';

export default function Details(props) {
  const { route,navigation } = props;
  const { id } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieById(id).then((response) => {
      setMovie(response);
    });
  }, []);
  return movie ? (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieImage posterPath={movie.poster_path} />
        <MovieTitle movie={movie} />
        <MovieRating votecount={movie.vote_count} voteaverage={movie.vote_average}/>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={[styles.overview,{marginTop:20}]}>Release date: {movie.release_date}</Text>

        <Title style={styles.relatedMovie} >suggested/related movies</Title>
        <CarouselVertical id={id} navigation={navigation} />
      </ScrollView>
    </>
  ) : (
    <LottieView source={require('../assets/98432-loading.json')} autoPlay loop />
  );
}

function MovieImage(props) {
  const { posterPath } = props;
  return (
    <View style={styles.viewPoster}>
      <Image
        style={styles.poster}
        source={{ uri: `${IMAGEPATH}/${posterPath}` }}
      />
    </View>
  );
}
function MovieTitle(props) {
  const { movie } = props;
  const { title } = movie;
  return (
    <View style={styles.viewInfo}>
      <Title>{title}</Title>
      <View style={styles.viewGenres}>
        {map(movie.genres, (genre) => (
          <Text  key={genre.id} style={styles.genre}>
            {genre.name}
          </Text>
        ))}
      </View>
    </View>
  );
}
function MovieRating(props){
  const {votecount,voteaverage} = props;
  const media = voteaverage/2;
  return(
    <View style={styles.viewRating}>
      <Rating
      type='custom'
      ratingImage={starDark}
      ratingColor='#ffc205'
      ratingBackgroundColor='#192734'
      startingValue={media}
      imageSize={20}
      style={{marginRight:15}}
      />
      <Text style={{fontSize:16, marginRight:5}}>{media}</Text>
      <Text style={{fontSize:12, color:"#8697a5"}}>{votecount} Votes</Text>
    </View>
  )
 
}

const styles = StyleSheet.create({
  viewPoster: {
    marginHorizontal: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    textShadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  viewInfo: {
    marginHorizontal: 20,
  },
  viewGenres:{
    flexDirection:'row',
  },
  genre:{
    marginRight:20,
    color: '#8697a5'
  },
  viewRating:{
    marginHorizontal:30,
    marginTop:10,
    flexDirection:'row',
    alignItems:'center',
  },
  overview:{
    marginHorizontal:20,
    marginTop:10,
    textAlign:'justify',
    color:'#8697a5',
  },
  relatedMovie:{
    marginTop:15,
    marginHorizontal:20,
    marginBottom:15,
    fontWeight:'bold',
    fontSize:20,
  }
});
