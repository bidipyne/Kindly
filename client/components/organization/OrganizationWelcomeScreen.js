import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Image } from 'react-native';

import { fallbackImage } from '../constants';
import { getOrganizationProjects } from '../api/organization';

const NonProfitSignupScreenOne = ({ navigation }) => {

  const [projects, setProjects] = React.useState([]);
  const [organization, setOrganization] = React.useState('');

  React.useEffect(() => {
    getOrganizationProjects('64d03d68b6d32edbc1c126d8')
      .then((data) => {
        setOrganization({
          ...organization,
          name: data?.data?.name
        });

        setProjects(data?.data?.projects);
      })
      .catch(console.log);
  }, []);

  const handleCreateProject = () => {
    navigation.navigate('CreateProjectForm');
  };

  const renderItem = ({ item }) => (
    <View style={styles.project}>
      <Image
        source={{ uri: item?.fullProfileImageUrl || fallbackImage }}
        style={styles.image}
      />
      <View style={styles.projectDesc}>
        <View style={{
          marginVertical: 10
        }}>
          <Text>{item.title}</Text>
          <Text style={{
            marginTop: 10
          }}>By: {organization.name}</Text>
        </View>
        <View style={styles.action}>
          <Pressable onPress={() => navigation.navigate('CreateProjectForm')}>
            <Text style={{
              color: '#009CE0',
              width: 50
            }}>Edit</Text>
          </Pressable>

          <Pressable>
            <Text style={{
              color: '#009CE0',
              width: 50
            }}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Your Projects</Text>
        <Pressable style={styles.button} onPress={handleCreateProject}>
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
    marginBottom: 10
  },
  image: {
    height: 100,
    width: 100,
  },
  projectDesc: {
    marginLeft: 10
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
  }
});

export default NonProfitSignupScreenOne;
