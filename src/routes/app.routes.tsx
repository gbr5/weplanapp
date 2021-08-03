import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../modules/main/pages/Profile';
import Dashboard from '../modules/main/pages/Dashboard';
import Menu from '../modules/main/pages/Menu';
import MyEvent from '../modules/myEvents/pages/MyEvent';
import EventGuest from '../modules/myEvents/pages/EventGuest';
import { FriendsSection } from '../modules/main/pages/FriendsSection';

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
    <App.Screen name="FriendsSection" component={FriendsSection} />
    <App.Screen name="Menu" component={Menu} />

    <App.Screen name="MyEvent" component={MyEvent} />
    <App.Screen name="EventGuest" component={EventGuest} />
  </App.Navigator>
);

export default AppRoutes;
