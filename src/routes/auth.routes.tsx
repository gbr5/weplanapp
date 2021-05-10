import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../modules/auth/pages/SignIn';
import ForgotPassword from '../modules/auth/pages/ForgotPassword';
import SignUp from '../modules/auth/pages/SignUp';

// import { theme } from '../global';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      // headerTintColor: theme.PrimaryColor,
      // headerStyle: {
      //   backgroundColor: theme.SecondaryColor,
      // },
      cardStyle: { backgroundColor: 'transparent' },
    }}
    // initialRouteName="SignUp"
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
  </Auth.Navigator>
);

export default AuthRoutes;
