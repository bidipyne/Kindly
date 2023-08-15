import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Pressable } from 'react-native';

import { fallbackImage } from '../constants';

const ReviewProjectDetails = ({ formData, onConfirm, onEdit }) => {

  return (
    <ScrollView showsVerticalScrollIndicator={true}>

    <View style={styles.container}>
      <Text style={styles.title}>Review your event</Text>
      <Text style={styles.projectTitle}>{formData.projectTitle}</Text>
      <Text>By: Organization name</Text>
      {/* Get from persistant storage */}

      <Image
        source={{ uri: formData?.logo || fallbackImage }}
        style={styles.image}
      />

      <View style={styles.contentWrapper}>
        <Text style={styles.label}>Details</Text>
        <Text style={styles.contentData}>{formData.details}</Text>
      </View>

      <View style={styles.contentWrapper}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.contentData}>{formData.status}</Text>
      </View>

      <View style={styles.contentWrapper}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.contentData}>{formData.location}</Text>
      </View>

      <View style={styles.contentWrapper}>
        <Text style={styles.label}>Contact Info</Text>
        <Text style={styles.contentData}> {formData.contactInfo}</Text>
      </View>

      <View style={styles.contentWrapper}>
        <Text style={styles.label}>Need</Text>
        <Text style={styles.contentData}>{formData.weNeed}</Text>
      </View>

      <Pressable style={styles.button} onPress={onConfirm}>
        <Text style={styles.buttonText}>Publish</Text>
      </Pressable>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 20,
    paddingBottom: 60,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 29,
    fontWeight: '600',
    marginVertical: 20,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
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
  dateInput: {
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
    marginVertical: 30,
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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  imageUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    // marginVertical: 10
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    height: 350,
    width: '100%',
    resizeMode: 'contain',
    marginVertical: 20
  },
  label: {
    color: '#009CE0',
    fontSize: 26,
    fontWeight: '400'
  },
  contentWrapper: {
    marginBottom: 20
  },
  contentData: {
    marginTop: 5
  }
});


export default ReviewProjectDetails;
