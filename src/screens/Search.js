/* eslint-disable prettier/prettier */
import { View,StyleSheet,SafeAreaView,ScrollView, Image, TouchableWithoutFeedback,Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import {Text} from 'react-native-paper';
import { getSearchMovie } from '../api/movies';
import { Searchbar } from 'react-native-paper';
import {size, map} from 'lodash';
import {IMAGEPATH} from '../utils/constant';

const {width} = Dimensions.get('window');

export default function Search(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState(null);
  useEffect(() => {
    if (size(search) > 2){
      getSearchMovie(search).then((response) => {
        setMovies(response.results);
      });
    }
    }, [search]);

  return (
    <SafeAreaView>
    <Searchbar
      placeholder="Search"
      iconColor="transparent"
      style = {styles.input}
      onChangeText={(e) => setSearch(e)}
    />
      <ScrollView >
        <View style={styles.container}>
          {map(movies,(movie, index)=> (
            <Movie key={index} movie={movie} navigation={navigation}/>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Movie(props){
  const {movie,navigation} = props;
  const {poster_path,title,id} = movie;
    
  const goMovie= () => {
    navigation.navigate('Details', {id});
    };
  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        {poster_path  ?
        ( <Image style={styles.image} source={{uri:`${IMAGEPATH}/${poster_path}`}} />
        ):(
        <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input:{
    marginTop: 3,
    backgroundColor: '#15212b',

  },
  container:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie:{
    width: width / 2,
    height:300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width: '100%',
    height:'100%',
  },
});
