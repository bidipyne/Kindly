import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView, Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { host } from '../constants';

const ProjectDetailsScreen = () => {
  const route = useRoute();
  const { project } = route.params;
  const [organizationName, setOrganizationName] = useState('');
  const [organizationProfileImage, setOrganizationProfileImage] = useState(null);
  const [organizationContact, setOrganizationContact] = useState('');
  const [organizationLocation, setOrganizationLocation] = useState('');

  useEffect(() => {
    // Fetch organization data based on project.organizationId
    const fetchOrganization = async () => {
      try {
        const response = await axios.get(host+`/organizations/${project.organizationId}`);
        setOrganizationName(response.data.data.name);
        setOrganizationProfileImage(`${host}/${response?.data?.data?.profileImage}`);
        setOrganizationContact(response.data.data.contactInfo);
        setOrganizationLocation(response.data.data.city+", "+response.data.data.province);
      } catch (error) {
        console.log('Error fetching organization:', error);
      }
    };
    fetchOrganization();
  }, [project.organizationId]);

   const handleVolunteer = () => {
    Alert.alert(
      'Redirecting',
      `Now we will redirect to ${organizationName} website so that you can proceed next.`
    );
  };

  const handleDonate = () => {
    Alert.alert(
      'Proceeding to Payment',
      'Now we will proceed to the payment system.'
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Project Details</Text>
      <Text style={styles.subTitle}>Project Name: {project.title}</Text>
      <Text style={styles.subTitle}>By: {organizationName}</Text>
      <Image
        source={{ uri: host+'/'+project.profileImage }} // Use the fetched profile image URL
        style={styles.projectImage}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details:</Text>
        <Text style={styles.text}>{project.title}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status:</Text>
        <Text style={styles.text}>{project.status}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location:</Text>
        <Text style={styles.text}>{organizationLocation}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Info:</Text>
        <Text style={styles.text}>{organizationContact}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Need:</Text>
        <Text style={styles.text}>{project.lookingFor}</Text>
      </View>
      {project.lookingFor === 'Donations' ? (
        <TouchableOpacity style={styles.buttonDonate} onPress={handleDonate}>
          <Text style={styles.buttonText}>Donate</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonVolunteer} onPress={handleVolunteer}>
          <Text style={styles.buttonText}>Volunteer</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    color: '#000000',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#000000',
    marginTop: 20,
  },
  projectImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 10,
  },
  buttonVolunteer: {
    backgroundColor: '#009CE0',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonDonate: {
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '500',
    color: '#009CE0',
  },
});

export default ProjectDetailsScreen;
