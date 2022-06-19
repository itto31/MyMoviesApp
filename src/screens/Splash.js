/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../utils/constant';

export default function Splash(props) {
  const { navigation } = props;
  const [token, setToken] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem(TOKEN).then((value) => {
        if (value) {
          setToken(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LottieView
      source={require('../assets/original_icon.json')}
      autoPlay
      loop={false}
      onAnimationFinish={() => {
        if (!token) {
          navigation.navigate('Login', { initial: 'Login' });
        } else {
          navigation.navigate('Home', { initial: 'Home' });
        }
      }}
    />
  );
}
