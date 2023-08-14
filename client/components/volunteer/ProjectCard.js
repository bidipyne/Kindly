import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProjectCard = ({ project, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={project.fullProfileImageUrl} style={styles.projectImage} />
      <View style={styles.cardContent}>
        <Text style={styles.projectName}>{project.title}</Text>
        <Text style={styles.organisation}>{project.organizationId}</Text>
        {/* Add Rating Component Here */}
        <View style={styles.rating}>
          <Icon name="star" size={16} color="#FFD700" />
          <Icon name="star" size={16} color="#FFD700" />
          <Icon name="star" size={16} color="#FFD700" />
          <Icon name="star" size={16} color="#FFD700" />
          <Icon name="star" size={16} color="#FFD700" />
        </View>
        <TouchableOpacity style={styles.seeDetails}>
          <Text style={styles.seeDetailsText}>See Details</Text>
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
