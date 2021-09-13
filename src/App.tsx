import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import 'react-native-get-random-values';
import { ThemeProvider } from 'styled-components';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import AppProvider from './hooks';
import Routes from './routes';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import theme from './global/styles/theme';
import { useAuth } from './hooks/auth';

// Sentry.init({
//   dsn: "__DSN__"
// });

// Sentry.setTag("myTag", "tag-value");
// Sentry.setExtra("myExtra", "extra-value");
// Sentry.addBreadcrumb({ message: "test" });

// Sentry.captureMessage("Hello Sentry!");

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

// export default Sentry.wrap(App);
export default App;
