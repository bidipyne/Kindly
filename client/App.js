import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/auth/LoginScreen';
import ProjectForm from './components/project/ProjectForm';
import ReviewScreen from './components/volunteer/ReviewScreen';
import GlobalHeaderRight from './components/profile/RightHeaderComponent';
import VolunteerSignupScreen from './components/auth/VolunteerSignupScreen';
import AccountDetailsScreen from './components/profile/AccountDetailsScreen';
import ListOfProjectsScreen from './components/volunteer/ListOfProjectsScreen';
import ProjectDetailsScreen from './components/volunteer/ProjectDetailsScreen';
import NonProfitSignupScreenOne from './components/auth/NonProfitSignupScreenOne';
import NonProfitSignupScreenTwo from './components/auth/NonProfitSignupScreenTwo';
import VolunteerWelcomeScreen from './components/volunteer/VolunteerWelcomeScreen';
import OrganizationDetailsScreen from './components/volunteer/OrganizationDetailsScreen';
import ListOfOrganizationsScreen from './components/volunteer/ListOfOrganizationsScreen';
import OrganizationWelcomeScreen from './components/organization/OrganizationWelcomeScreen';

const Stack = createStackNavigator();

const routesToHideHeaderRight = ['Welcome', 'LoginScreen', 'NonProfitSignupScreenOne', 'NonProfitSignupScreenTwo', 'VolunteerSignup'];

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome"
        screenOptions={({ route }) => ({
          headerRight: () => (routesToHideHeaderRight.includes(route.name) ? null : <GlobalHeaderRight />)
        })}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ProjectForm" component={ProjectForm} />
        <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
        <Stack.Screen name="VolunteerSignup" component={VolunteerSignupScreen} />
        <Stack.Screen name="ListOfProjectsScreen" component={ListOfProjectsScreen} />
        <Stack.Screen name="ProjectDetailsScreen" component={ProjectDetailsScreen} />
        <Stack.Screen name="AccountDetailsScreen" component={AccountDetailsScreen} />
        <Stack.Screen name="VolunteerWelcomeScreen" component={VolunteerWelcomeScreen} />
        <Stack.Screen name="NonProfitSignupScreenOne" component={NonProfitSignupScreenOne} />
        <Stack.Screen name="NonProfitSignupScreenTwo" component={NonProfitSignupScreenTwo} />
        <Stack.Screen name="OrganizationWelcomeScreen" component={OrganizationWelcomeScreen} />
        <Stack.Screen name="ListOfOrganizationsScreen" component={ListOfOrganizationsScreen} />
        <Stack.Screen name="OrganizationDetailsScreen" component={OrganizationDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
