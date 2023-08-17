import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { host } from '../constants';

const NonProfitSignupScreenTwo = ({ navigation, route }) => {
  const [aboutUs, setAboutUs] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState(null);

  const { organisationName, charityNumber, email, state, city, password } = route.params;

  const handleSignUp = async () => {
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('userType', 'organization');
    data.append('fullName', '');
    data.append('province', state); 
    data.append('city', city);
    data.append('address', address);
    data.append('name', organisationName);
    data.append('charityNumber', charityNumber);
    data.append('contactInfo', contactInfo);

    if (logo) {
      const fileUriParts = logo.split('/');
      const fileType = fileUriParts[fileUriParts.length - 1].split('.')[1]; // Assuming file extension is after the last dot

      data.append('profileImage', {
        uri: logo,
        name: `logo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    axios
      .post(host+'/sign-up', data)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // You can handle the response here, for example, by redirecting to another screen
        navigation.navigate('LoginScreen'); // Update the screen name as needed
      })
      .catch((error) => {
        console.log("Axios error from organization sign up: ", error.response.data);
        Alert.alert('Signup Failure', `${error.response.data.message}`);
      });
  };



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLogo(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit your logo</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageUpload}>
            {logo && (
              <Image source={{ uri: logo }} style={styles.image} />
            )}
            <Text style={styles.label}>Add image &nbsp;</Text>
            <Icon name="images" size={30} color="#000" style={styles.imageIcon} />
          </TouchableOpacity>

      <Text style={styles.label}>About Us</Text>
      <TextInput
        style={styles.textArea}
        onChangeText={text => setAboutUs(text)}
        value={aboutUs}
        multiline
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setAddress(text)}
        value={address}
      />

      <Text style={styles.label}>Contact Info</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setContactInfo(text)}
        value={contactInfo}
      />

      <Text style={styles.label}>Website</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setWebsite(text)}
        value={website}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Save and Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 29,
    marginVertical: 20,
    fontWeight: '600',
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  label: {
    fontSize: 16,
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
  textArea: {
    height: 100,
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
    justifyContent:'center',
    height: 55,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF',
    textAlign: 'center',
  },
  imageUpload: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30, // Add some space before About Us
  },
  imageIcon: {
    marginLeft: 10, // Add some space between the text and the icon
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 5
  },
});

export default NonProfitSignupScreenTwo;
