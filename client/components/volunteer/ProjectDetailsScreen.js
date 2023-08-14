import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView, Alert,
} from 'react-native';

const ProjectDetailsScreen = ({ route }) => {
  const {
    projectName,
    organizationName,
    projectImage,
    details,
    status,
    location,
    contactInfo,
    need,
  } = route.params;

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
      <Text style={styles.subTitle}>Project Name: {projectName}</Text>
      <Text style={styles.subTitle}>By: {organizationName}</Text>
      <Image source={projectImage} style={styles.projectImage} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details:</Text>
        <Text style={styles.text}>{details}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status:</Text>
        <Text style={styles.text}>{status}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location:</Text>
        <Text style={styles.text}>{location}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Info:</Text>
        <Text style={styles.text}>{contactInfo}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Need:</Text>
        <Text style={styles.text}>{need}</Text>
      </View>
      <TouchableOpacity style={styles.buttonVolunteer} onPress={handleVolunteer}>
        <Text style={styles.buttonText}>Volunteer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDonate} onPress={handleDonate}>
        <Text style={styles.buttonText}>Donate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    color: '#000000',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 5,
  },
  projectImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 5,
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
    fontSize: 29,
    fontWeight: 'regular',
    color: '#009CE0',
  },
});

export default ProjectDetailsScreen;
