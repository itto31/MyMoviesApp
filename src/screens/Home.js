/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';

export default function Home(props) {
  return (
    <NativeBaseProvider>
      <View>
        <Text>Home</Text>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({});
