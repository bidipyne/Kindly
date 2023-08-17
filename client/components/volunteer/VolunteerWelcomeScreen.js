import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const VolunteerWelcomeScreen = () => {
  const navigation = useNavigation();

  const handleProjectsPress = () => {
    navigation.navigate('ListOfProjectsScreen', { showOrgProjects: false });
  };

  const handleOrganizationsPress = () => {
    navigation.navigate('ListOfOrganizationsScreen'); // Replace with the actual screen name for ListOfOrganizations
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Kindly!</Text>
      <Text style={styles.subtitle}>Search ways to help by:</Text>

      <View style={{
        marginTop: 40
      }}>
      <View style={styles.cardRow}>
        <TouchableOpacity style={styles.card} onPress={handleProjectsPress}>
          <View style={styles.cardContent}>
            <Icon name="clipboard-list" size={35} color="#000" />
            <Text style={styles.cardText}>Projects</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.cardRow}>
        <TouchableOpacity style={styles.card} onPress={handleOrganizationsPress}>
          <View style={styles.cardContent}>
            <Icon name="building" size={35} color="#000" />
            <Text style={styles.cardText}>Organisations</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>

      <Text style={styles.featuredTitle}>Featured Project</Text>

      {/* Featured Project Cards */}
      <View style={styles.cardRow}>
        <TouchableOpacity style={styles.featuredCard}>
          <Image
            source={require('../../assets/icon.png')} // Replace with actual image source
            style={styles.featuredImage}
          />
          <View style={styles.featuredCardContent}>
            <Text style={styles.featuredProjectName}>Project Name</Text>
            <Text style={styles.featuredOrgName}>Organisation Name</Text>
            {/* Add Rating Component Here */}
            <Text style={styles.featuredSeeDetails}>See Details</Text>
          </View>
        </TouchableOpacity>
        {/* Add more featured cards here */}
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    marginLeft: 20,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 20,
    marginTop: 30,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  card: {
    borderColor: '#707070',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: '90%',
  },
  cardContent: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 10,
    fontSize: 25,
    color: '#000',
    marginLeft: 30,
  },
  featuredTitle: {
    fontSize: 16,
    color: '#000000',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  featuredCard: {
    borderColor: '#707070',
    borderWidth: 1,
    borderRadius: 10,
    width: '48%',
    marginRight: '2%',
    marginBottom: 20,
    overflow: 'hidden',
    width: '90%'
  },
  featuredImage: {
    width: '100%',
    height: 150,
  },
  featuredCardContent: {
    padding: 10,
  },
  featuredProjectName: {
    fontSize: 18,
    color: '#000',
  },
  featuredOrgName: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  featuredSeeDetails: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
  },
});

export default VolunteerWelcomeScreen;
