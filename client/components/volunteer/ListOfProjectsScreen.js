import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import ProjectCard from './ProjectCard'; // Import the ProjectCard component
import { host } from '../constants';

const ListOfProjectsScreen = ({route}) => {
  const { organization } = route.params || {}; // Use empty object if organization is not provided
  const [projectsData, setProjectsData] = useState([]);
  console.log("params "+ route.params);

  useEffect(() => {
    console.log("See org projects"+ JSON.stringify(organization, null, 2));
    //console.log(Object.keys(organization));
    if (organization && organization?.projects && organization?.projects.length > 0) {
      // Fetch projects associated with the organization
      setProjectsData(organization.projects);
    } else {
      // Fetch all projects
      fetchAllProjects();
    }
  }, [organization]);

  const fetchAllProjects = async () => {
    try {
      const response = await axios.get(host + '/projects');
      setProjectsData(response.data.data);
    } catch (error) {
      console.log('Error fetching projects:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Projects</Text>
      {projectsData.length > 0 ? (
        <FlatList
          data={projectsData}
          keyExtractor={(item) => item.id} // Assuming the id is a number
          renderItem={({ item }) => (
            <ProjectCard
              key={item._id}
              project={item} />
          )}
        />
      ) : (
        <Text style={styles.noProjectsText}>No projects added for this organization.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    marginVertical: 30,
  },
  noProjectsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ListOfProjectsScreen;
