import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [initialScreen, setInitialScreen] = React.useState('Welcome');

  React.useEffect(() => {
    async function checkUserAndSetInitialScreen() {
      let userId = await AsyncStorage.getItem('userId');
      let userType = await AsyncStorage.getItem('userType');

      if (userId && userType === 'volunteer') {
        setInitialScreen('VolunteerWelcomeScreen');
      }

      if (userId && userType === 'organization') {
        setInitialScreen('OrganizationWelcomeScreen');
      }
    }

    checkUserAndSetInitialScreen();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialScreen}
        screenOptions={({ route }) => ({
          headerTitleStyle: styles.headerTitle,
          headerRight: () => (routesToHideHeaderRight.includes(route.name) ? null : <GlobalHeaderRight />)
        })}
      >
        <Stack.Screen name="Welcome" options={{
          title: "Kindly"
        }} component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" options={{
          title: "Login"
        }} component={LoginScreen} />
        <Stack.Screen name="ProjectForm" options={{
          title: "Project"
        }} component={ProjectForm} />
        <Stack.Screen name="ReviewScreen" options={{
          title: "Leave Review"
        }} component={ReviewScreen} />
        <Stack.Screen name="VolunteerSignup" options={{
          title: "Volunteer Signup"
        }}component={VolunteerSignupScreen} />
        <Stack.Screen name="ListOfProjectsScreen" options={{
          title: "Project List"
        }}  component={ListOfProjectsScreen} />
        <Stack.Screen name="ProjectDetailsScreen" options={{
          title: "Project Details"
        }} component={ProjectDetailsScreen} />
        <Stack.Screen name="AccountDetailsScreen" options={{
          title: "Account Details"
        }} component={AccountDetailsScreen} />
        <Stack.Screen name="VolunteerWelcomeScreen" options={{
          title: "Volunteer Dashboard", headerLeft: null
        }} component={VolunteerWelcomeScreen} />
        <Stack.Screen name="NonProfitSignupScreenOne" options={{
          title: "NonProfit Signup"
        }} component={NonProfitSignupScreenOne} />
        <Stack.Screen name="NonProfitSignupScreenTwo" options={{
          title: "NonProfit Signup"
        }} component={NonProfitSignupScreenTwo} />
        <Stack.Screen name="OrganizationWelcomeScreen" options={{
          title: "Organization Dashboard", headerLeft: null
        }} component={OrganizationWelcomeScreen} />
        <Stack.Screen name="ListOfOrganizationsScreen" options={{
          title: "Organization List"
        }} component={ListOfOrganizationsScreen} />
        <Stack.Screen name="OrganizationDetailsScreen" options={{
          title: "Organization Details"
        }} component={OrganizationDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    color: '#007BFF', // Blue color
    // You can also add more styles here if needed
  },
});

export default App;
