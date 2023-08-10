import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const VolunteerSignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSignUp = async () => {
  const userType = 'volunteer';

  let data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('userType', userType);
  data.append('fullName', fullName);
  data.append('province', state); // Assuming state variable represents province
  data.append('city', city);
  data.append('address', ''); // Add address if necessary
  data.append('name', '');
  data.append('charityNumber', '');
  data.append('contactInfo', '');

  if (avatar) {
    const fileUriParts = avatar.split('.');
    const fileType = fileUriParts[fileUriParts.length - 1];

    data.append('profileImage', {
      uri: avatar,
      name: `avatar.${fileType}`,
      type: `image/${fileType}`,
    });
  }
  let host = 'http://10.51.224.203:3001';
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: host+'/sign-up',
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      // You can handle the response here, for example, by redirecting to another screen
      navigation.navigate('VolunteerWelcomeScreen');
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

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>
      
      <TouchableOpacity onPress={pickImage} style={styles.imageUpload}>
        <Text style={styles.label}>Upload your avatar</Text>
        <Icon name="image" size={30} color="#000" />
      </TouchableOpacity>
      {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setFullName(text)}
        value={fullName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
      />

      <Text style={styles.label}>State / Province</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create</Text>
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
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
  },
});

export default VolunteerSignupScreen;
