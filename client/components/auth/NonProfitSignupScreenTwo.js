import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const NonProfitSignupScreenTwo = ({ navigation, route }) => {
  const [aboutUs, setAboutUs] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState(null);

  const { organisationName, charityNumber, email, state, city, password } = route.params;

const handleSignUp = async () => {
  let userType = 'organization';

  let data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('userType', userType);
  data.append('fullName', ''); // If necessary, update with the actual full name
  data.append('province', state); // Assuming state variable represents province
  data.append('city', city);
  data.append('address', address);
  data.append('name', organisationName);
  data.append('charityNumber', charityNumber);
  data.append('contactInfo', contactInfo);

  if (logo) {
    const fileUriParts = logo.split('.');
    const fileType = fileUriParts[fileUriParts.length - 1];

    data.append('profileImage', {
      uri: logo,
      name: `logo.${fileType}`,
      type: `image/${fileType}`,
    });
  }
  let host = 'http://10.51.224.203:3001';
  let config = {
    method: 'post',
    url: host+'/sign-up',
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      // You can handle the response here, for example, by redirecting to another screen
      //navigation.navigate('OrganizationWelcomeScreen'); // Update the screen name as needed
    })
    .catch((error) => {
      console.log(error);
      // You can handle errors here, for example, by showing an error message
    });
};


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setLogo(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit your logo</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageUpload}>
        <Text style={styles.label}>Click here to upload</Text>
        <Icon name="images" size={30} color="#000" style={styles.imageIcon} />
      </TouchableOpacity>
      
      {logo && <Image source={{ uri: logo }} style={styles.logo} />}

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
  textArea: {
    height: 100,
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
    height: 55,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  imageUpload: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30, // Add some space before About Us
  },
  imageIcon: {
    marginLeft: 10, // Add some space between the text and the icon
  },
});

export default NonProfitSignupScreenTwo;
