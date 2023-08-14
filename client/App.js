import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NonProfitSignupScreenOne from './components/auth/NonProfitSignupScreenOne';
import NonProfitSignupScreenTwo from './components/auth/NonProfitSignupScreenTwo';
import VolunteerSignupScreen from './components/auth/VolunteerSignupScreen';
import LoginScreen from './components/auth/LoginScreen';
import VolunteerWelcomeScreen from './components/volunteer/VolunteerWelcomeScreen';
import WelcomeScreen from './components/WelcomeScreen';
import ListOfProjectsScreen from './components/volunteer/ListOfProjectsScreen';
import ListOfOrganizationsScreen from './components/volunteer/ListOfOrganizationsScreen';
import OrganizationDetailsScreen from './components/volunteer/OrganizationDetailsScreen';
import ReviewScreen from './components/volunteer/ReviewScreen';
import AccountDetailsScreen from './components/volunteer/AccountDetailsScreen';
import ProjectDetailsScreen from './components/volunteer/ProjectDetailsScreen';
// 

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
        <Stack.Screen name="ListOfProjectsScreen" component={ListOfProjectsScreen} />
        <Stack.Screen name="ListOfOrganizationsScreen" component={ListOfOrganizationsScreen} />
        <Stack.Screen name="OrganizationDetailsScreen" component={OrganizationDetailsScreen} />
        <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
        <Stack.Screen name="AccountDetailsScreen" component={AccountDetailsScreen} />
        <Stack.Screen name="ProjectDetailsScreen" component={ProjectDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
