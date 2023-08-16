import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Assuming you're using FontAwesome icons for rating

import { host } from '../constants'
import { getRandomMediumDarkColor } from '../api/helpers'
import { useNavigation } from '@react-navigation/native';

const OrganizationCard = ({ organization, onPress }) => {
  const [imageUrl, setImageUrl] = React.useState(`${host}/${organization?.profileImage}`);

  const handleImageError = () => {
    setImageUrl(null);
  };

  const navigation = useNavigation(); 

  const onSeeProjects = () => {
  if (!organization.projects || organization.projects.length === 0) {
    Alert.alert('No Projects', 'No projects added for this organization.');
  } else {
    navigation.navigate('ListOfProjectsScreen', { organization });
  }
};

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.orgImage}
          onError={handleImageError}
        />
      ) : (
        <View
          style={{ ...styles.orgImage, backgroundColor: getRandomMediumDarkColor() }}
        >
        </View>
      )}
      <View style={styles.cardContent}>
        <View>
        <Text style={styles.orgName}>{organization.name}</Text>
        <View style={styles.rating}>
          <Icon name="star" size={16} color="#FFD700" />
          <Icon name="star" size={16} color="#FFD700" />
          <Icon name="star" size={16} color="#FFD700" />
          <Icon name="star" size={16} color="#FFD700" />
          <Icon name="star" size={16} color="#FFD700" />
        </View>
        <TouchableOpacity style={styles.seeProjects}>
          <Text style={styles.seeProjectsText}>See Projects</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  orgImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-around'
  },
  orgName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  seeProjects: {
    marginTop: 10,
  },
  seeProjectsText: {
    color: '#007BFF',
    fontSize: 14,
  },
});

export default OrganizationCard;
