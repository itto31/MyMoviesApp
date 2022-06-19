/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Search from '../screens/Search';
import {IconButton} from 'react-native-paper';
const Stack = createStackNavigator();
import * as RootNavigation  from './RootNavigarion';


export default function StackNavigation() {

  function onPress() {
    RootNavigation.navigate('Search');
  }
  
  const buttonRight = () => {
    return (
      <IconButton icon="magnify" onPress={onPress}/>
      );
  };

  return (
    <Stack.Navigator initialRouteName="home">

      <Stack.Screen name="Home" component={Home} options={{title:'MyMovieAPP',headerRight:()=>buttonRight()}} />

      <Stack.Screen name="Details" component={Details} options={{headerRight:()=>buttonRight(),headerTransparent:true}}  />

      <Stack.Screen name="Search" component={Search}  options={{title:"",headerTransparent:true}}/>
    </Stack.Navigator>
  );
}
