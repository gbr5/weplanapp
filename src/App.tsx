import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';
import Routes from './routes';

import { theme } from './global';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={theme.SecondaryColor} translucent />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: theme.SecondaryColor }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
