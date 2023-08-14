import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import qs from 'qs';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    let data = qs.stringify({
      email: username, // Using the username from state, assuming it's the email
      password: password,
    });

    //let host = process.env.EXPO_PUBLIC_HOST;
    let host = 'http://10.10.110.139:3001';

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: host+'/login',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        let userType = response.data.data.userType;
        console.log(userType);
        if(userType == 'volunteer') {
          navigation.navigate('VolunteerWelcomeScreen');
        }

        // You can handle the response here, for example, by redirecting to another screen
      })
      .catch((error) => {
        console.log(error);
        // You can handle errors here, for example, by showing an error message
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text 
        style={styles.createAccountLink}
        onPress={() => navigation.navigate('Welcome')} 
      >
        Or create an account
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 29,
    margin: 10,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  label: {
    fontSize: 16,
    marginLeft: 5,
    marginTop: 10,
    color: '#000000',
  },
  input: {
    height: 48,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#009CE0',
    borderRadius: 5,
    height: 55
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  createAccountLink: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    position: 'absolute',
    bottom: 450,
    left: 0,
    right: 0,
  },
});

export default LoginScreen;