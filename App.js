import React from 'react';
import { Provider as PaperProvider, DarkTheme as dk } from 'react-native-paper';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { navigationRef } from './src/navigation/RootNavigarion';
import StackNavigation from './src/navigation/StackNavigation';


LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

export default function App() {
  DarkTheme.colors.background = '#192734';

  return (
    <PaperProvider theme={dk}>
      <NavigationContainer theme={DarkTheme} ref={navigationRef}>
        <StackNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}
