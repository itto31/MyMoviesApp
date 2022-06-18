import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMovieById } from '../api/movies';

export default function Details(props) {
  const { route } = props;
  const { id } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieById(id).then((response) => {
      setMovie(response);
    });
  }, []);
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
}
