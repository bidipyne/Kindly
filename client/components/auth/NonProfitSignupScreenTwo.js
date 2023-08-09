import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

const NonProfitSignupScreenTwo = ({ navigation, route }) => {
  const [aboutUs, setAboutUs] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState(null);

  const { organisationName, charityNumber, email, state, city, password } = route.params;

  const handleSignUp = () => {
    // Combine all fields and submit
    const formData = {
      organisationName,
      charityNumber,
      email,
      state,
      city,
      password,
      aboutUs,
      address,
      contactInfo,
      website,
      logo,
    };
    // Submit form data
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
