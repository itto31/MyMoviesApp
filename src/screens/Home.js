/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView,  Image, TouchableWithoutFeedback} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';
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
    const [isLoading, setIsLoading] = useState(false);
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
  );

}
function Movie(props){
  const {movie,navigation} = props;
  const {id,poster_path, title, release_date,overview, vote_count, vote_average} = movie;
  
  const goMovie= () => {
    navigation.navigate('Details', {id});
  };
  return (
    <TouchableWithoutFeedback onPress={goMovie}>
    <View style={styles.movies}>
      <View style={styles.left}>
        <Image style={styles.image}
        source={poster_path ? {
          uri: `${IMAGEPATH}${poster_path}`,
        } : NOIMAGE }/>
        </View>
        <View>
        <Title>{title}</Title>
        <Text>{release_date}</Text>
        <Text>{overview}</Text>
        <MovieRating vote_count={vote_count} vote_average={vote_average}/>
      </View>
    </View>
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
    </View>
  );
  }

const styles = StyleSheet.create({
  movies:{
    marginTop: 5,
    marginBottom:20,
    marginHorizontal: 10,
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:2,
  },
  left:{
    marginRight:10,
  },
   image:{
    width:100,
    height:150,
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
