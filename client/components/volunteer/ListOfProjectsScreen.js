import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import ProjectCard from './ProjectCard'; // Import the ProjectCard component
import { useNavigation } from '@react-navigation/native';
import { host } from '../constants';

const ListOfProjectsScreen = () => {
  const [projectsData, setProjectsData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: host+'/projects',
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setProjectsData(response.data.data); // Assuming response.data is an array of projects
      })
      .catch((error) => {
        console.log(error);
        // Optionally, handle the error here, perhaps by setting some error state
      });
  }, []); // The empty array means this effect will run once after the initial render

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Projects</Text>
      <FlatList
        data={projectsData}
        keyExtractor={(item) => item.id.toString()} // Assuming the id is a number
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onPress={() => {
              console.log('Item pressed', item); // Logging the item
              navigation.navigate('ProjectDetailsScreen', { project: item });
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    marginLeft: 20,
    marginTop: 2,
  },
});

export default ListOfProjectsScreen;
