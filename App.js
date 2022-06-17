import React, { useState, useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import { AuthContext } from './src/utils/contexts';
import { TOKEN } from './src/utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          console.log(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoading) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <AuthContext.Provider value={userName}>
        {!userName ? (
          <Login setRefreshCheckLogin={setRefreshCheckLogin} />
        ) : (
          <Home setRefreshCheckLogin={setRefreshCheckLogin} />
        )}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
