import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import 'react-native-get-random-values';
import { ThemeProvider } from 'styled-components';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import AppProvider from './hooks';
import Routes from './routes';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';

import theme from './global/styles/theme';
import { useAuth } from './hooks/auth';

GoogleSignin.configure({
  webClientId: '830691338585-ke1h9fjn2r15lk7kqmhe4f7pbv7vq4l6.apps.googleusercontent.com',
});
// This line below was the last line added it comes from  https://developers.google.com/identity/sign-in/ios/sign-in#objective-c
// signInConfig = [[GIDConfiguration alloc] initWithClientID:@"YOUR_IOS_CLIENT_ID"];

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
