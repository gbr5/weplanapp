import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { ThemeProvider } from 'styled-components';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import AppProvider from './hooks';
import Routes from './routes';

import theme from './global/styles/theme';

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
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.color.secondary} translucent />
        <AppProvider>
          <View style={{ flex: 1, backgroundColor: theme.color.secondary }}>
            <Routes />
          </View>
        </AppProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
