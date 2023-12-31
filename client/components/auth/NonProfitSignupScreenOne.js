import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const NonProfitSignupScreenOne = ({ navigation }) => {
  const [organisationName, setOrganisationName] = useState('');
  const [charityNumber, setCharityNumber] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');

  const areFieldsFilled = () => {
    return organisationName !== '' && charityNumber !== '' && email !== '' && password !== '';
  };

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>

      <Text style={styles.label}>Organization Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setOrganisationName(text)}
        value={organisationName}
      />

      <Text style={styles.label}>Charity Number</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setCharityNumber(text)}
        value={charityNumber}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
      />

      <Text style={styles.label}>State/Province</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setState(text)}
        value={state}
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setCity(text)}
        value={city}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, !areFieldsFilled() && styles.disabledButton]}
        onPress={() => {
          if (areFieldsFilled()) {
            navigation.navigate('NonProfitSignupScreenTwo', {
              organisationName,
              charityNumber,
              email,
              state,
              city,
              password,
            });
          }
        }}
        disabled={!areFieldsFilled()}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    // textAlign: 'center',
    fontSize: 29,
    fontWeight: '600',
    marginVertical: 20,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
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
    marginVertical: 10,
    width: '100%',
    padding: 10,
    backgroundColor: '#009CE0',
    borderRadius: 5,
    height: 55,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
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
  disabledButton: {
    backgroundColor: '#B1B1B1',
  },
});

export default NonProfitSignupScreenOne;
