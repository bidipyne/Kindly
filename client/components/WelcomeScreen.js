import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeTextWrapper}>
        <Image source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.welcomeText}>Let's get started</Text>
      </View>
      <Text style={styles.descriptionText}> Select your way to be Kind</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NonProfitSignupScreenOne')}>
        <Text style={styles.buttonText}>For Non-profits</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VolunteerSignup')}>
        <Text style={styles.buttonText}>Volunteer / Donate</Text>
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
    // justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
  welcomeTextWrapper: {
    marginVertical: 40
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: '#009CE0',
  },
  descriptionText: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
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
    marginTop: 20
  },
  logo: {
    marginHorizontal: 20,
    marginBottom: 20,
  }
});

export default WelcomeScreen;
