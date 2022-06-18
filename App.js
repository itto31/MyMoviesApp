import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider, DarkTheme as dk } from 'react-native-paper';
import Login from './src/screens/Login';
import { AuthContext } from './src/utils/contexts';
import { TOKEN } from './src/utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import { StatusBar } from 'react-native';
import { navigationRef } from './src/navigation/RootNavigarion';
export default function App() {
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    getData();
    setRefreshCheckLogin(false);
    setIsLoading(true);
  }, [refreshCheckLogin]);

  const getData = () => {
    try {
      AsyncStorage.getItem(TOKEN).then((value) => {
        if (value) {
          setUserName(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoading) {
    return null;
  }
  DarkTheme.colors.background = '#192734';

  return (
    <PaperProvider theme={dk}>
      <AuthContext.Provider value={userName}>
        {!userName ? (
          <Login setRefreshCheckLogin={setRefreshCheckLogin} />
        ) : (
          <NavigationContainer theme={DarkTheme} ref={navigationRef}>
            <StatusBar barStyle={'light-content'} />
            <StackNavigation />
          </NavigationContainer>
        )}
      </AuthContext.Provider>
    </PaperProvider>
  );
}
