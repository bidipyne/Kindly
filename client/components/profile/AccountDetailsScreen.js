import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import { host } from '../constants';

const AccountDetailsScreen = ({ navigation, route }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [city, setCity] = useState('');
  const [userType, setUserType] = React.useState('');
  const [fullProfileImageUrl, setFullProfileImageUrl] = React.useState('');

  React.useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let userId = await AsyncStorage.getItem('userId');

    try {
      let response = await fetch(`${host}/users/${userId}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await response.json();

      setFullName(data.name || data.fullName);
      setEmail(data.email);
      setStateProvince(data.province);
      setCity(data.city);
      setUserType(data.userType);
      setFullProfileImageUrl(host+"/"+data.profileImage)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    let userId = await AsyncStorage.getItem('userId');

    let data = new FormData();

    if (userType === 'volunteer') {
      data.append('fullName', fullName);
    } else {
      data.append('name', fullName)
    }
    data.append('province', stateProvince);
    data.append('city', city);

    if (fullProfileImageUrl) {
      const fileUriParts = fullProfileImageUrl.split('.');
      const fileType = fileUriParts[fileUriParts.length - 1];

      data.append('profileImage', {
        uri: fullProfileImageUrl,
        name: `fullProfileImageUrl.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    console.log("data "+ JSON.stringify(data, null, 2));
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${host}/users/${userId}`,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("response "+ JSON.stringify(response, null, 2));
        navigation.goBack();
      })
      .catch((error) => {
        console.log("error "+error);
      });
  };

  const handleDeleteAccount = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete your account?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteUser();
        },
      },
    ]);
  };

  const deleteUser = async () => {
    let userId = await AsyncStorage.getItem('userId');

    axios
      .delete(`${host}/users/${userId}`)
      .then((response) => {
        console.log('Account deleted:', response.data);
       navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
      });
  };


  const handleEditProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFullProfileImageUrl(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      <Text style={styles.subtitle}>Edit profile information</Text>

      <TouchableOpacity style={styles.imageContainer} onPress={handleEditProfileImage}>
        {fullProfileImageUrl ? (
          <Image
            source={{ uri: fullProfileImageUrl }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.initials}>
            <Text style={styles.nameText}>
              {(fullName)?.substring(0, 2)?.toUpperCase()}
            </Text>
          </View>
        )}
         <Icon style={{
          left: 30,
          bottom: 40,
          zIndex: 111
         }} name="camera" size={30} color="#000" />
      </TouchableOpacity>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setFullName(text)}
        value={fullName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.disabledInput}
        // onChangeText={text => setEmail(text)}
        contextMenuHidden={true}
        editable={false}
        value={email}
      />

      <Text style={styles.label}>State/Province</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setStateProvince(text)}
        value={stateProvince}
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setCity(text)}
        value={city}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* Delete Account Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 29,
    marginVertical: 20,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    borderWidth: 2,
    height: 100,
    borderRadius: 50,
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
  disabledInput: {
    height: 48,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 10,
    color: 'grey'
  },
  saveButton: {
    backgroundColor: '#009CE0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF',
    textAlign: 'center',
  },
  initials: {
    marginVertical: 10,
    borderWidth: 2,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  nameText: {
    color: '#009CE0',
    fontWeight: 'bold',
    fontSize: 40,
  }
});

export default AccountDetailsScreen;
