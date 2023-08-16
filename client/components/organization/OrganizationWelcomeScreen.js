import React from 'react';
import axios, * as others from 'axios';
import { View, Text, StyleSheet, Pressable, FlatList, Image, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { fallbackImage, FILE_URL, host} from '../constants';
import { getOrganizationProjects } from '../api/organization';

const OrganizationWelcomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [projects, setProjects] = React.useState([]);
  const [organization, setOrganization] = React.useState('');

  const fetchOrganizationProjects = async () => {
    try {
    const userId = await AsyncStorage.getItem('userId');

    const response = await getOrganizationProjects(userId);

    setOrganization({
      ...organization,
      name: response?.data?.name
    });

    setProjects(response?.data?.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  React.useEffect(() => {
    fetchOrganizationProjects();
  }, [isFocused]);

  const handleDeleteProject = (projectId) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this project?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          // Perform the delete operation
          deleteProject(projectId);
        },
      },
    ]);
  };

  const deleteProject = (projectId) => {
    axios
      .delete(`${host}/projects/${projectId}`)
      .then((response) => {
        console.log('Project deleted:', response.data);
        fetchOrganizationProjects();
        // You might want to update your UI or state after successful deletion
      })
      .catch((error) => {
        console.error('Error deleting project:', error);
      });
  };

  const renderItem = ({ item }) => {
    let imageUrl = fallbackImage;

    if (item?.profileImage) {
      imageUrl = `${host}/${item.profileImage}`
    }

    return (
      <View style={styles.project}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <View style={styles.projectDesc}>
        <View style={{
          marginVertical: 10
        }}>
          <Text>{item.title}</Text>
          <Text style={{
            marginTop: 20
          }}>By: {organization.name}</Text>
        </View>
        <View style={styles.action}>
          <Pressable onPress={() => navigation.navigate('ProjectForm', { projectId: item._id })}>
            <Text style={{
              color: '#009CE0',
              width: 50
            }}>Edit</Text>
          </Pressable>

          <Pressable onPress={() => {
            handleDeleteProject(item._id)
          }}>
            <Text style={{
              color: '#009CE0',
              width: 50
            }}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Your Projects</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('ProjectForm')}>
          <Text style={styles.buttonText}>Create Project</Text>
        </Pressable>
      </View>
      <View>
        <FlatList
          data={projects}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  title: {
    fontSize: 29,
    fontWeight: '600',
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    color: '#000000',
  },
  input: {
    height: 48,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#009CE0',
    borderRadius: 5,
    justifyContent: 'center',

  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  createAccountLink: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    position: 'absolute',
    bottom: 450,
    left: 0,
    right: 0,
  },
  project: {
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#707070',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 30,
    marginBottom: 20
  },
  image: {
    height: 100,
    width: 100
  },
  projectDesc: {
    marginLeft: 10
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
  }
});

export default OrganizationWelcomeScreen;
