/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Search from '../screens/Search';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import { size } from 'lodash';
import { HelperText, IconButton, Searchbar, Text } from 'react-native-paper';
import * as RootNavigation from './RootNavigarion';

const Stack = createStackNavigator();

export default function StackNavigation() {
  const [search, setsearch] = useState(false);
  const [data, setData] = useState('');

  function onPressbutton() {
    setsearch(true);
  }

  function onpress(){
    if (data !== ''){
      if (size(data) > 2){
      RootNavigation.navigate('Search',{Search:data});
      setData('');
      setsearch(false);
      }
    }
  }
  const hasErrors = () => {
    return !data || data.length < 2;
  };

  const buttonRight = () => {
    return !search ? (
      <IconButton icon="magnify" onPress={onPressbutton} />
    ) : (
      <>
      <Searchbar onIconPress={onpress}  value={data}  onChangeText={(e) => setData(e)}  onSubmitEditing={onpress}/>
      <HelperText type="error" visible={hasErrors()}><Text>Write more Information</Text></HelperText>
      </>
    );
  };

  return (
    <Stack.Navigator initialRouteName="App">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          title: '',
          headerTransparent: true,
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={ (!search) ? { headerTitle: 'MyMovieApp',headerLeft: null, headerRight:()=> buttonRight()}  : { header: ()=> buttonRight() }
        }
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: '',
          headerTransparent: false,
          animationTypeForReplace: 'push',
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: '',
          headerShown: false,
          animationTypeForReplace: 'push',
        }}
      />
    </Stack.Navigator>
  );
}
