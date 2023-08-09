import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.welcomeText}>Let's get started</Text>
      <Text style={styles.descriptionText}> Select your way to be Kind</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NonProfitSignupScreenOne')}>
        <Text style={styles.buttonText}>Non-Profit Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VolunteerSignup')}>
        <Text style={styles.buttonText}>Volunteer Signup</Text>
      </TouchableOpacity>
      <Text 
        style={styles.loginLink}
        onPress={() => navigation.navigate('LoginScreen')} 
      >
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    color: '#009CE0',
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#009CE0',
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#009CE0',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  loginLink: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
  },
});

export default WelcomeScreen;
