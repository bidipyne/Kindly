import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { host } from '../constants';

const ProjectCard = ({ project }) => {
  const [organizationName, setOrganizationName] = useState('');
  const [averageRating, setAverageRating] = useState('N/A');
  const navigation = useNavigation();

  const handlePress = () => {
    console.log("Project selected "+ JSON.stringify(project));
    navigation.navigate('ProjectDetailsScreen', { project });
  };

  useEffect(() => {
    // Fetch organization data based on project.organizationId
    const fetchOrganization = async () => {
      try {
        const response = await axios.get(host + `/organizations/${project.organizationId}`);
        setOrganizationName(response.data.data.name);
        calculateAverageRating(response.data.data.reviews); // Calculate average rating
      } catch (error) {
        console.log('Error fetching organization:', error);
      }
    };
    fetchOrganization();
  }, [project.organizationId]);

    const calculateAverageRating = (reviews) => {
      if (!reviews || reviews.length === 0) {
        setAverageRating('N/A');
        return;
      }

      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      // Ensure averageRating is a positive integer or return 0 if it's not valid
      const finalAverageRating = isNaN(averageRating) || averageRating <= 0 ? 0 : Math.floor(averageRating);
      setAverageRating(finalAverageRating);
    };

  return (
    <View style={styles.card}>
      <Image source={project.fullProfileImageUrl} style={styles.projectImage} />
      <View style={styles.cardContent}>
        <Text style={styles.projectName}>{project.title}</Text>
        <Text style={styles.organisation}>By: {organizationName}</Text>
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
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
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
