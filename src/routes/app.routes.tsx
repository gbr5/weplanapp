import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../modules/main/pages/Profile';
import Dashboard from '../modules/main/pages/Dashboard';

// import { theme } from '../global';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
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
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AppRoutes;
