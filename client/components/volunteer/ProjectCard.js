import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { host, fallbackImage } from '../constants';
import { getRandomMediumDarkColor } from '../api/helpers';

const ProjectCard = ({ project }) => {
  const [organizationName, setOrganizationName] = useState('');
  const [averageRating, setAverageRating] = useState('N/A');
  const navigation = useNavigation();

  const [imageUrl, setImageUrl] = React.useState(`${project?.profileImage}`);

  const handleImageError = () => {
    setImageUrl(null);
  };
  const handlePress = () => {
    console.log("Project selected " + JSON.stringify(project));
    navigation.navigate('ProjectDetailsScreen', { project });
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < averageRating; i++) {
      stars.push(
        <Icon key={i} name="star" size={16} color="#FFD700" />
      );
    }

    return stars;
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
      {imageUrl ? (
        <Image
          source={{ uri: host+'/'+imageUrl }}
          style={styles.projectImage}
          onError={handleImageError}
        />
      ) : (
        <View
          style={{ ...styles.projectImage, backgroundColor: getRandomMediumDarkColor() }}
        >
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.projectName}>{project.title}</Text>
        <Text style={styles.organisation}>By: {organizationName}</Text>
        {/* Add Rating Component Here */}
        <View style={styles.rating}>
          {renderStars()}
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
    width: 100,
    height: 100,
    marginRight: 10,
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
