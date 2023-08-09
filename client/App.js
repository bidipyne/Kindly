import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NonProfitSignupScreenOne from './components/auth/NonProfitSignupScreenOne';
import NonProfitSignupScreenTwo from './components/auth/NonProfitSignupScreenTwo';
import VolunteerSignupScreen from './components/auth/VolunteerSignupScreen';
import LoginScreen from './components/auth/LoginScreen';
import VolunteerWelcomeScreen from './components/volunteer/VolunteerWelcomeScreen';
import WelcomeScreen from './components/WelcomeScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="NonProfitSignupScreenOne" component={NonProfitSignupScreenOne} />
        <Stack.Screen name="NonProfitSignupScreenTwo" component={NonProfitSignupScreenTwo} />
        <Stack.Screen name="VolunteerSignup" component={VolunteerSignupScreen} />
        <Stack.Screen name="VolunteerWelcomeScreen" component={VolunteerWelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
