import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { host, fallbackImage } from '../constants';

const ProjectCard = ({ project }) => {
  const [organizationName, setOrganizationName] = useState('');
  const navigation = useNavigation();

  const [imageUrl, setImageUrl] = React.useState(`${project?.fullProfileImageUrl}`);

  const handleImageError = () => {
    setImageUrl(null);
  };
  const handlePress = () => {
    console.log("Project selected "+ JSON.stringify(project));
    navigation.navigate('ProjectDetailsScreen', { project });
  };

  useEffect(() => {
    // Fetch organization data based on project.organizationId
    const fetchOrganization = async () => {
      try {
        const response = await axios.get(host+`/organizations/${project.organizationId}`);

        setOrganizationName(response?.data?.data?.name);
      } catch (error) {
        console.log('Error fetching organization:', error);
      }
    };
    fetchOrganization();
  }, [project.organizationId]);

  return (
    <View style={styles.card}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.projectImage}
          onError={handleImageError}
        />
      ) : (
        <Image
          source={{
            uri: fallbackImage
          }}
          style={styles.projectImage}
        />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.projectName}>{project.title}</Text>
        <Text style={styles.organisation}>{organizationName}</Text>
        {/* Add Rating Component Here */}
        <View style={styles.rating}>
          <Icon name="star" size={16} color="#FFD700" />
          <Icon name="star" size={16} color="#FFD700" />
          <Icon name="star" size={16} color="#FFD700" />
          <Icon name="star" size={16} color="#FFD700" />
          <Icon name="star" size={16} color="#FFD700" />
        </View>
        <TouchableOpacity style={styles.seeDetails} onPress={handlePress}>
          <Text style={styles.seeDetailsText}>See Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
  },
  projectImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  cardContent: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  organisation: {
    fontSize: 14,
    color: '#888',
  },
  seeDetails: {
    marginTop: 10,
  },
  seeDetailsText: {
    color: '#007BFF',
    fontSize: 14,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});

export default ProjectCard;
