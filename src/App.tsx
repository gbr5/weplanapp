import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import AppProvider from './hooks';
import Routes from './routes';

import { theme } from './global';

Sentry.init({
  dsn: 'https://4472efcf6b6042f2bd925a1a2d48f434@o637257.ingest.sentry.io/5756133',
});
// throw new Error('My first Sentry error!');
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
