import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Assuming you're using FontAwesome icons for rating

const OrganizationCard = ({ organization, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={organization.image} style={styles.orgImage} />
      <View style={styles.cardContent}>
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
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  orgImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  cardContent: {
    flex: 1,
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
